import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { IPlaylist } from '../../types';

import APIClient from '../../utils/api_client';

const playlistAdapter = createEntityAdapter<IPlaylist>({});

const initialState = playlistAdapter.getInitialState({
  status: 'idle',
  error: '',
});

interface IFetchPlaylistsParams {
  limit?: number;
  lastId?: string;
}

const playlistEntities = `
id
title
channel {
  id
  title
  thumbnails {
    medium
  }
}
`;

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async ({ playlistId, limit = 21, lastId = '' }) => {
    const response = await APIClient.graphql({
      query: `
query playlist($playlistId: ID!, $limit: Int, $lastId: String) {
  playlist(playlistId: $playlistId) {
    ${playlistEntities}
    videos(lastId: $lastId, limit: $limit) {
      videoId
    }
  }
}`,
      variables: {
        playlistId,
        limit,
        lastId,
      },
    });

    return response.data.playlist;
  }
);

export const fetchPlaylists = createAsyncThunk(
  'playlist/fetchPlaylists',
  async ({ limit = 10, lastId = '' }: IFetchPlaylistsParams) => {
    const response = await APIClient.graphql({
      query: `
query playlists($limit: Int, $lastId: String) {
  playlists(limit: $limit, lastId: $lastId) {
    ${playlistEntities}
  }
}`,
      variables: {
        limit,
        lastId,
      },
    });

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

    [fetchPlaylist.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchPlaylist.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      playlistAdapter.upsertOne(state, action.payload);
    },
  },
});

export const {
  selectAll: selectAllPlaylists,
  selectById: selectPlaylistById,
} = playlistAdapter.getSelectors((state) => state.playlists);

export default PlaylistsSlice.reducer;
