import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { selectAllVideos } from './videos';

interface SceneItem {
  thumbnails: string;
  start: string;
  end: string;
}
import { APIClient } from './APIClient';

export interface VideoItem {
  id: string;
  channelId: string;
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: {
    url: string;
  };
  scenes: SceneItem[];
}

const videoAdapter = createEntityAdapter<VideoItem>({
  selectId: (video) => video.videoId,
});

const initialState = videoAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const query = `
query video($videoId: ID!) {
  video(id: $videoId) {
    id
    channelId
    videoId
    title
    publishedAt
    thumbnail(size: high) {
      url
    }
    scenes {
      thumbnails
      start
      end
    }
  }
}
`;

interface VideoFetcherProps {
  videoId: string;
}

export const fetchVideo = createAsyncThunk(
  'video/fetchVideo',
  async ({ videoId }: VideoFetcherProps) => {
    const response = await APIClient.graphql({
      query: fetchVideoQuery,
      variables: {
        videoId,
      },
    });

    return response.data.video;
  }
);

const VideoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVideo.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchVideo.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      videoAdapter.upsertOne(state, action.payload);
    },
    [fetchVideo.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default VideoSlice.reducer;

export const { selectById: selectVideoById } = videoAdapter.getSelectors((state) => state.video);
