import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';
import Videos from '../resolvers/videos';

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
  }

  extend type Query {
    channel(id: ID!): Channel
    channels(page: Int, limit: Int): [Channel]
  }

  extend type Mutation {
    registerChannel(channelUrl: String): Channel
  }
`;

export const ChannelResolvers = {
  Query: {
    channel(root, { id }) {
      return Channel.get(id);
    },

    channels(root, { page, limit }, ctx) {},
  },

  Mutation: {
    registerChannel(root, { channelUrl }, ctx) {
      return Channel.register(channelUrl);
    },
  },

  Channel: {
    id(channel) {
      return channel.relId;
    },

    videos(channel, { lastId = '', limit = 20 }, ctx) {
      return Videos.getForChannel({
        channelId: channel.relId,
        limit,
        lastId,
      });
    },
  },
};
