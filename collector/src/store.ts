import { configureStore } from '@reduxjs/toolkit';

import ChannelsSlice from './actions/channels';

const store = configureStore({
  reducer: {
    channels: ChannelsSlice,
  },
});

export default store;
