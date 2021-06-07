import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';
import Video from '../resolvers/video';
import VideosResolver from '../resolvers/videos';
import Scene from '../resolvers/scene';

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
    playlistId: String
    videoId: ID!
    title: String
    thumbnail(size: ThumbnailSize = standard): Thumbnails
    channel: Channel
    scenes: [Scene]
    publishedAt: String
    updatedAt: String
    noAppears: Int
  }

  extend type Query {
    video(id: ID!): Video
    videos(lastId: String = "", limit: Int = 21): [Video]
  }

  extend type Mutation {
    registerVideo(data: registerVideoData): Video
  }

  input VideoThumbnailDetails {
    url: String
    width: Int
    height: Int
  }

  input VideoThumbnails {
    default: VideoThumbnailDetails
    medium: VideoThumbnailDetails
    high: VideoThumbnailDetails
    standard: VideoThumbnailDetails
    maxres: VideoThumbnailDetails
  }

  input VideoSnippet {
    channelId: String
    playlistId: String
    title: String
    thumbnails: VideoThumbnails
    publishedAt: String
  }

  input VideoContentDetails {
    videoId: String
    videoPublishedAt: String
  }

  input registerVideoData {
    id: String
    snippet: VideoSnippet
    contentDetails: VideoContentDetails
  }
`;

export const VideoResolvers = {
  Query: {
    video(root, { id }, ctx) {
      return Video.get(id);
    },

    videos(root, { limit, lastId }, ctx) {
      const resolver = new VideosResolver();
      return resolver.get(lastId, limit);
    },
  },

  Mutation: {
    registerVideo(root, { data }, ctx) {
      return Video.register(data);
    },
  },

  Video: {
    id(video) {
      return video.videoId;
    },

    channel(video) {
      return Channel.get(video.channelId);
    },

    thumbnail(video, { size }) {
      return video.thumbnails[size];
    },

    scenes(video) {
      return Scene.getForVideo(video.videoId);
    },
  },
};
