import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { SceneItemInterface, IVideoItemWithChannel } from '../../types';

import APIClient from '../../utils/api_client';

const videosAdapter = createEntityAdapter<IVideoItemWithChannel>({
  selectId: (video) => video.videoId,
});

const initialState = videosAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const videoEntities = `
  id
  videoId
  channelId
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
  videos(limit: 15, lastId: $lastId) {
    ${videoEntities}
  }
}`;

interface VideoFetcherProps {
  channelId?: string;
  lastId?: string;
}

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

const fetchVideoQuery = `
query video($videoId: ID!) {
  video(id: $videoId) {
    ${videoEntities}
  }
}
`;

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
  reducers: {},
  extraReducers: {
    [fetchVideos.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchVideos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      videosAdapter.upsertMany(state, action.payload);
    },

    [fetchVideos.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [fetchVideo.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      videosAdapter.upsertOne(state, action.payload);
    },
  },
});

export const {
  selectAll: selectAllVideos,
  selectById: selectVideoById,
} = videosAdapter.getSelectors((state) => state.videos);

export const selectVideosByChannel = createSelector(
  [selectAllVideos, (state, channelId: string) => channelId],
  (videos, channelId) => videos.filter((video) => video.channelId === channelId)
);

export const selectVideosByPlaylist = createSelector(
  [selectAllVideos, (state, playlistId: string) => playlistId],
  (videos, playlistId) => videos.filter((video) => video.playlistId === playlistId)
);

export default VideosSlice.reducer;
