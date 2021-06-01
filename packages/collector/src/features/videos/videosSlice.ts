import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { IVideoItemWithChannel, RegisteredVideo, Video } from '../../types';

import APIClient from '../../app/api_client';
import YoutubeAPI from '../../app/youtube_api';
import { RootState } from '../../app/store';

const videosAdapter = createEntityAdapter<IVideoItemWithChannel>({
  selectId: (video) => video.videoId,
  sortComparer: (prev, next) => {
    if (prev.publishedAt < next.publishedAt) return 1;
    if (prev.publishedAt > next.publishedAt) return -1;
    return 0;
  },
});

const initialState = videosAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const videoEntities = `
  id
  videoId
  channelId
  playlistId
  title
  publishedAt
  thumbnail(size: high) {
    url
  }
  channel {
    title
    thumbnails {
      default
    }
  }
`;

const queryForFetchChannelVideos = `
query channel($channelId: ID!, $lastId: String) { 
  channel(id: $channelId) {
    videos(limit: 15, lastId: $lastId) {
      ${videoEntities}
    }
  }
}`;

const queryForAllVideos = `
query videos($lastId: String) { 
  videos(limit: 30, lastId: $lastId) {
    ${videoEntities}
  }
}`;

const fetchVideoQuery = `
query video($videoId: ID!) {
  video(id: $videoId) {
    ${videoEntities}
  }
}
`;

interface registerVideoParams extends Video {
  playlistId?: string;
}

interface VideoFetcherProps {
  channelId?: string;
  lastId?: string;
}

interface VideoSnippetForRegister {
  publishedAt: string;
  title: string;
  channelId: string;
  thumbnails: {
    [thumbnailType: string]: {
      url: string;
      width: number;
      height: number;
    };
  };
  playlistId?: string;
}

export const registerVideo = createAsyncThunk(
  'videos/register',
  async ({ videoId, playlistId = '' }: registerVideoParams) => {
    // @ts-ignore;
    const {
      snippet: { publishedAt, channelId, title, thumbnails },
    } = await YoutubeAPI.getVideo(videoId);

    const snippet: VideoSnippetForRegister = {
      publishedAt,
      channelId,
      title,
      thumbnails,
    };

    if (playlistId.length > 0) {
      snippet.playlistId = playlistId;
    }

    const response = await APIClient.graphql({
      query: `
mutation registerVideo($data: registerVideoData) {
  registerVideo(data: $data) {
    ${videoEntities}
  }
}`,
      variables: {
        data: {
          id: videoId,
          snippet,
        },
      },
    });

    return response.data.registerVideo;
  }
);

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async ({ channelId = '', lastId = '' }: VideoFetcherProps) => {
    const fetchForChannel = channelId.length > 0;

    const response = await APIClient.graphql({
      query: fetchForChannel ? queryForFetchChannelVideos : queryForAllVideos,
      variables: {
        channelId,
        lastId,
      },
    });

    return fetchForChannel ? response.data.channel.videos : response.data.videos;
  }
);

export const fetchVideo = createAsyncThunk('videos/fetchVideo', async (videoId: string) => {
  const response = await APIClient.graphql({
    query: fetchVideoQuery,
    variables: {
      videoId,
    },
  });

  return response.data.video;
});

const VideosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    addPlaylistVideos(state, action) {
      videosAdapter.upsertMany(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchVideos.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.status = 'succeeded';
      videosAdapter.upsertMany(state, action.payload);
    });

    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      videosAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(registerVideo.fulfilled, (state, action) => {
      videosAdapter.upsertOne(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllVideos,
  selectById: selectVideoById,
} = videosAdapter.getSelectors((state: RootState) => state.videos);

export const selectVideosByChannel = createSelector(
  [selectAllVideos, (state: RootState, channelId: string) => channelId],
  (videos, channelId) => videos.filter((video) => video.channelId === channelId)
);

export const selectVideosByPlaylist = createSelector(
  [selectAllVideos, (state: RootState, playlistId: string) => playlistId],
  (videos, playlistId) => videos.filter((video) => video.playlistId === playlistId)
);

export const { addPlaylistVideos } = VideosSlice.actions;

export default VideosSlice.reducer;
