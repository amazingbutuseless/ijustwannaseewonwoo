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
  videos(limit: 20, lastId: $lastId) {
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

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async ({ channelId = '', lastId = '' }) => {
    const fetchForChannel = channelId.length > 0;

    const response = await client.post(
      'http://localhost:3000/dev/graphql',
      {
        query: fetchForChannel ? queryForFetchChannelVideos : queryForAllVideos,
        variables: {
          channelId,
          lastId,
        },
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

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
