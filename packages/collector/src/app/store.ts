import { configureStore } from '@reduxjs/toolkit';

import ChannelsSlice from '../features/channels/channelsSlice';
import PlaylistsSlice from '../features/playlists/playlistsSlice';
import VideosSlice from '../features/videos/videosSlice';
import ScenesSlice from '../features/scenes/scenesSlice';
import UserSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    channels: ChannelsSlice,
    playlists: PlaylistsSlice,
    videos: VideosSlice,
    scenes: ScenesSlice,
    user: UserSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
