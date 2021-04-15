import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { IPlaylist } from '../../types';

import APIClient from '../../utils/api_client';
import YoutubeAPI from '../../utils/youtube_api';

const playlistAdapter = createEntityAdapter<IPlaylist>({});

const initialState = playlistAdapter.getInitialState({
  status: 'idle',
  error: '',
});

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

interface fetchPlaylistVideosParams {
  playlistId: string;
  pageToken?: string;
}

export async function fetchPlaylistVideos({
  playlistId,
  pageToken = '',
  lastVideoPublishedAt = '',
}: fetchPlaylistVideosParams) {
  const response = await YoutubeAPI.listPlaylistItem({ playlistId, pageToken });

  const videos = response.result.items.map((item) => {
    const { channelId, playlistId, title, publishedAt } = item.snippet;

    return {
      id: 'video',
      channelId,
      playlistId,
      videoId: item.contentDetails.videoId,
      title,
      publishedAt,
      thumbnail: item.snippet.thumbnails.high,
    };
  });

  const data = {
    id: playlistId,
    ytVideos: videos,
    pageToken: response.result.nextPageToken,
    numOfVideos: response.result.pageInfo.totalResults,
  };

  if (lastVideoPublishedAt.length > 0) {
    data.videos = await getVideosIds(playlistId, lastVideoPublishedAt);
  }

  return data;
}

interface fetchPlaylistParams {
  playlistId: string;
  limit?: number;
  lastId?: string;
}

async function getVideosIds(playlistId: string, lastVideoPublishedAt: string) {
  const response = await APIClient.graphql({
    query: `
query playlist($playlistId: ID!, $lastVideoPublishedAt: String) {
  playlist(playlistId: $playlistId){
    videos(limit: 21, lastId: $lastVideoPublishedAt) {
      videoId
      publishedAt
      noAppears
    }
  }
}`,
    variables: {
      playlistId,
      lastVideoPublishedAt,
    },
  });

  return response.data.videos;
}

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async ({ playlistId }: fetchPlaylistParams) => {
    const response = await APIClient.graphql({
      query: `
query playlist($playlistId: ID!) {
  playlist(playlistId: $playlistId) {
    ${playlistEntities}
    videos(limit: 21) {
      videoId
      publishedAt
      noAppears
    }
  }
}`,
      variables: {
        playlistId,
      },
    });

    const playlistVideos = await fetchPlaylistVideos({ playlistId });

    return {
      ...response.data.playlist,
      ...playlistVideos,
    };
  }
);

interface IFetchPlaylistsParams {
  limit?: number;
  lastId?: string;
}

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
  reducers: {
    updateMetadata(state, action) {
      playlistAdapter.upsertOne(state, action.payload);
    },
  },
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

export const { updateMetadata } = PlaylistsSlice.actions;

export default PlaylistsSlice.reducer;
