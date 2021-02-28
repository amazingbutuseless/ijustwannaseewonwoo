import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { IPlaylist } from '../../types';

import APIClient from '../../utils/api_client';

const playlistAdapter = createEntityAdapter<IPlaylist>();

const initialState = playlistAdapter.getInitialState({
  status: 'idle',
  error: '',
});

interface IFetchPlaylistsParams {
  limit?: number;
  lastId?: string;
}

export const fetchPlaylists = createAsyncThunk(
  'playlist/fetch',
  async ({ limit = 10, lastId = '' }: IFetchPlaylistsParams) => {
    const request = {
      query: `
query playlists($limit: Int, $lastId: String) {
  playlists(limit: $limit, lastId: $lastId) {
    id
    title
    channel {
      id
      title
      thumbnails {
        medium
      }
    }
  }
}`,
      variables: {
        limit,
        lastId,
      },
    };
    console.log({ request });
    const response = await APIClient.graphql(request);

    return response.data.playlists;
  }
);

const PlaylistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlaylists.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchPlaylists.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      playlistAdapter.upsertMany(state, action.payload);
    },
  },
});

export const { selectAll: selectAllPlaylists } = playlistAdapter.getSelectors(
  (state) => state.playlists
);

export default PlaylistsSlice.reducer;
