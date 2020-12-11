import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';
import Video from '../resolvers/video';

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
    id: ID!
    videoId: String
    title: String
    thumbnail(size: ThumbnailSize = standard): Thumbnails
    channel: Channel
    scenes: [Scene]
    publishedAt: String
    updatedAt: String
  }

  extend type Query {
    video(id: ID!): Video
    videos(channelId: String, page: Int, limit: Int): [Video]
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

    videos(root, { channelId, page, limit }, ctx) {},
  },

  Mutation: {
    registerVideo(root, { data }, ctx) {},
  },

  Video: {
    id(video) {
      return video.relId;
    },

    channel(video) {
      const channelId = video.relId.substr(0, video.relId.indexOf(':'));
      return Channel.get(channelId);
    },

    thumbnail(video, { size }) {
      return video.thumbnails[size];
    },
  },
};
