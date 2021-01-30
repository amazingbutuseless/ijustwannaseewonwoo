import { configureStore } from '@reduxjs/toolkit';

import ChannelsSlice from './features/channels/channelsSlice';
import VideosSlice from './features/videos/videosSlice';
import ScenesSlice from './features/scenes/scenesSlice';

const store = configureStore({
  reducer: {
    channels: ChannelsSlice,
    videos: VideosSlice,
    scenes: ScenesSlice,
  },
});

export default store;
