import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';
import Video from '../resolvers/video';
import Videos from '../resolvers/videos';

export const VideoTypesDef = gql`
  type Thumbnails {
    url: String
    width: Int
    height: Int
  }

  enum ThumbnailSize {
    default
    standard
    medium
    high
  }

  type Video {
    id: String
    channelId: String
    videoId: ID!
    title: String
    thumbnail(size: ThumbnailSize = standard): Thumbnails
    channel: Channel
    scenes: [Scene]
    publishedAt: String
    updatedAt: String
  }

  extend type Query {
    video(id: ID!): Video
    videos(lastId: String = "", limit: Int = 20): [Video]
  }

  extend type Mutation {
    registerVideo(data: registerVideoData): Video
  }

  input registerVideoData {
    id: String!
    title: String!
    thumbnail: String!
    channelId: String!
  }
`;

export const VideoResolvers = {
  Query: {
    video(root, { id }, ctx) {
      return Video.get(id);
    },

    videos(root, { limit, lastId }, ctx) {
      return Videos.get({ limit, lastId });
    },
  },

  Mutation: {
    registerVideo(root, { data }, ctx) {},
  },

  Video: {
    id(video) {
      return video.relId;
    },

    channel(video) {
      return Channel.get(video.channelId);
    },

    thumbnail(video, { size }) {
      return video.thumbnails[size];
    },
  },
};
