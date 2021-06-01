import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { IPlaylist, IVideoItemWithChannel, RegisteredVideo } from '../../types';

import APIClient from '../../app/api_client';
import YoutubeAPI from '../../app/youtube_api';

const playlistAdapter = createEntityAdapter<IPlaylist>({
  sortComparer: (prev, next) => {
    if (prev.sequence < next.sequence) return -1;
    if (prev.sequence > next.sequence) return 1;
    return 0;
  },
});

const initialState = playlistAdapter.getInitialState({
  status: { playlists: 'idle', playlist: 'idle' },
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
sequence
`;

const playlistVideoEntities = `
videoId
      publishedAt
      noAppears
`;

interface FetchPlaylistsParams {
  limit?: number;
  lastId?: string;
}

interface FetchPlaylistParamsWithPlaylistId extends FetchPlaylistsParams {
  playlistId: string;
}

export interface FetchPlaylistVideosParams {
  playlistId: string;
  pageToken?: string;
  lastVideoPublishedAt?: string;
}

export interface PlaylistVideos {
  id: string;
  numOfVideos: number;
  pageToken?: string;
  ytVideos: Array<IVideoItemWithChannel>;
  videos?: Array<RegisteredVideo>;
}

export async function fetchPlaylistVideos({
  playlistId,
  pageToken = '',
  lastVideoPublishedAt = '',
}: FetchPlaylistVideosParams): Promise<PlaylistVideos> {
  const response = await YoutubeAPI.listPlaylistItem({ playlistId, pageToken });

  // @ts-ignore
  const videos = response.items.map((item) => {
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

  const data: PlaylistVideos = {
    id: playlistId,
    ytVideos: videos,
    // @ts-ignore
    pageToken: response.nextPageToken,
    // @ts-ignore
    numOfVideos: response.pageInfo.totalResults,
  };

  if (lastVideoPublishedAt.length > 0) {
    data.videos = await getVideosIds(playlistId, lastVideoPublishedAt);
  }

  return data;
}

export async function getVideosIds(playlistId: string, lastVideoPublishedAt: string) {
  const response = await APIClient.graphql({
    query: `
query playlist($playlistId: ID!, $lastVideoPublishedAt: String) {
  playlist(playlistId: $playlistId){
    videos(limit: 28, lastId: $lastVideoPublishedAt) {
      ${playlistVideoEntities}
    }
  }
}`,
    variables: {
      playlistId,
      lastVideoPublishedAt,
    },
  });

  return response.data.playlist.videos;
}

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async ({ playlistId }: FetchPlaylistParamsWithPlaylistId) => {
    const response = await APIClient.graphql({
      query: `
query playlist($playlistId: ID!) {
  playlist(playlistId: $playlistId) {
    ${playlistEntities}
    videos(limit: 28) {
      ${playlistVideoEntities}
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

export const fetchPlaylists = createAsyncThunk(
  'playlist/fetchPlaylists',
  async ({ limit = 10, lastId = '' }: FetchPlaylistsParams) => {
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
  extraReducers(builder) {
    builder.addCase(fetchPlaylists.pending, (state) => {
      state.status.playlists = 'loading';
    });

    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.status.playlists = 'succeeded';
      playlistAdapter.upsertMany(state, action.payload);
    });

    builder.addCase(fetchPlaylist.pending, (state) => {
      state.status.playlist = 'loading';
    });

    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.status.playlist = 'succeeded';
      playlistAdapter.upsertOne(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllPlaylists,
  selectById: selectPlaylistById,
} = playlistAdapter.getSelectors((state: RootState) => state.playlists);

export const { updateMetadata } = PlaylistsSlice.actions;

export default PlaylistsSlice.reducer;
