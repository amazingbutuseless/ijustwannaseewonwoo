import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';
import { ChannelVideosResolver } from '../resolvers/videos';

export const ChannelTypesDef = gql`
  type ImageResource {
    default: String
    medium: String
    high: String
  }

  type Channel {
    id: ID!
    title: String
    thumbnails: ImageResource
    videos(lastId: String = "", limit: Int = 20): [Video]
    sequence: String
  }

  input registerChannelData {
    channelUrl: String
    sequence: String
  }

  extend type Query {
    channel(id: ID!): Channel
    channels(page: Int, limit: Int): [Channel]
  }

  extend type Mutation {
    registerChannel(data: registerChannelData): Channel
  }
`;

export const ChannelResolvers = {
  Query: {
    channel(_, { id }) {
      return Channel.get(id);
    },

    channels() {
      return Channel.getList();
    },
  },

  Mutation: {
    registerChannel(_, { data: { channelUrl, sequence } }) {
      return Channel.register({ channelUrl, sequence });
    },
  },

  Channel: {
    id(channel) {
      return channel.channelId;
    },

    videos(channel, { lastId = '', limit }) {
      const resolver = new ChannelVideosResolver(channel.channelId);
      return resolver.get(lastId, limit);
    },

    sequence(channel) {
      return channel.relId;
    },
  },
};
