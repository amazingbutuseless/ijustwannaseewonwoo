import { gql } from 'apollo-server-lambda';

import Playlist from '../resolvers/playlist';
import Channel from '../resolvers/channel';
import { PlaylistVideosResolver } from '../resolvers/videos';

export const PlaylistTypeDefs = gql`
  extend type Query {
    playlist(playlistId: ID!): Playlist
    playlists(channelId: String, lastId: String, limit: Int): [Playlist]
  }

  extend type Mutation {
    registerPlaylist(data: registerPlaylistData): Playlist
  }

  type Playlist {
    id: ID!
    title: String
    channel: Channel
    videos(lastId: String = "", limit: Int = 21): [Video]
    sequence: String
  }

  input registerPlaylistData {
    playlistId: String!
    channelId: String!
    title: String
    sequence: String
  }
`;

export const PlaylistRevolvers = {
  Query: {
    playlist(_root, { playlistId }, _ctx) {
      return Playlist.get(playlistId);
    },

    playlists(_root, { channelId, lastId, limit = 8 }) {
      return Playlist.getList({ channelId, lastId, limit });
    },
  },

  Mutation: {
    registerPlaylist(_root, { data }, _ctx) {
      return Playlist.register(data);
    },
  },

  Playlist: {
    id(playlist) {
      return playlist.playlistId;
    },

    channel(playlist) {
      return Channel.get(playlist.channelId);
    },

    videos(playlist, { lastId, limit }) {
      const resolver = new PlaylistVideosResolver(playlist.playlistId);
      return resolver.get(lastId, limit);
    },

    sequence(playlist) {
      return playlist.relId;
    },
  },
};
