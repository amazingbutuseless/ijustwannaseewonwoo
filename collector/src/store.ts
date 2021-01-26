import { configureStore } from '@reduxjs/toolkit';

import ChannelsSlice from './actions/channels';
import VideosSlice from './actions/videos';
import VideoSlice from './actions/video';

const store = configureStore({
  reducer: {
    channels: ChannelsSlice,
    videos: VideosSlice,
    video: VideoSlice,
  },
});

export default store;
