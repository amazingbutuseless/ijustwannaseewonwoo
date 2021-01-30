import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { VideoItemInterface } from '../../types';

import { APIClient } from '../../actions/APIClient';
import { addScene } from '../../actions/scene';

const videoAdapter = createEntityAdapter<VideoItemInterface>({
  selectId: (video) => video.videoId,
});

const initialState = videoAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const fetchVideoQuery = `
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
      thumbnail
      start
      end
    }
  }
}
`;

interface VideoFetcherProps {
  videoId: string;
}

export { addScene };

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
  reducers: {
    sceneAdded(state) {
      return state.video;
    },
  },
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
    [addScene.fulfilled]: (state, action) => {
      videoAdapter.updateOne(state, action.payload);
      const video = selectVideoById(state, action.payload.videoId);
    },
  },
});

export default VideoSlice.reducer;

export const { selectById: selectVideoById } = videoAdapter.getSelectors((state) => state.video);
