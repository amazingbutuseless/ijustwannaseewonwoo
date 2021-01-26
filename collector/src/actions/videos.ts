import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { client } from './apiClient';

const videosAdapter = createEntityAdapter();

const initialState = videosAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const queryForFetchChannelVideos = `
query channel($channelId: ID!) { 
  channel(id: $channelId) {
    videos {
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
    }
  }
}`;

const queryForAllVideos = `
query videos($lastId: String) { 
  videos(limit: 21, lastId: $lastId) {
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

    const response = await client.graphql({
      query: fetchForChannel ? queryForFetchChannelVideos : queryForAllVideos,
      variables: {
        channelId,
        lastId,
      },
    });

    return fetchForChannel ? response.data.channel.videos : response.data.videos;
  }
);

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
  },
});

export default VideosSlice.reducer;

export const { selectAll: selectAllVideos } = videosAdapter.getSelectors((state) => state.videos);

export const selectVideosByChannel = createSelector(
  [selectAllVideos, (state, channelId) => channelId],
  (videos, channelId) => videos.filter((video) => video.channelId === channelId)
);

export const selectVideoById = createSelector(
  [selectAllVideos, (state, videoId) => videoId],
  (videos, videoId) => {
    const filteredVideos = videos.filter((video) => video.videoId === videoId);
    return filteredVideos.length > 0 ? filteredVideos[0] : null;
  }
);
