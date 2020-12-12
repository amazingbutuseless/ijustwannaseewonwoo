import { configureStore } from '@reduxjs/toolkit';

import ChannelsSlice from './actions/channels';
import VideosSlice from './actions/videos';

const store = configureStore({
  reducer: {
    channels: ChannelsSlice,
    videos: VideosSlice,
  },
});

export default store;
