import { gql } from 'apollo-server-lambda';

import Scene from '../resolvers/scene';
import Video from '../resolvers/video';

export const SceneTypesDef = gql`
  type Scene {
    id: ID!
    start: Int
    end: Int
    thumbnail: String
    video: Video
  }

  extend type Query {
    scenes(videoId: String): [Scene]
  }

  extend type Mutation {
    registerScene(data: registerSceneData): Scene
    deleteScene(data: deleteSceneData): Scene
  }

  input registerSceneData {
    videoId: String!
    start: Int!
    end: Int!
    thumbnail: String
  }

  input deleteSceneData {
    videoId: String!
    start: Int!
  }
`;

export const SceneResolvers = {
  Query: {
    scenes(root, { videoId }, ctx) {
      return Scene.getForVideo(videoId);
    },
  },

  Mutation: {
    registerScene(root, { data }, ctx) {
      return Scene.register(data);
    },

    deleteScene(root, { data }, ctx) {
      return Scene.delete(...data);
    },
  },

  Scene: {
    id(scene) {
      return scene.relId;
    },

    video(scene) {
      return Video.get(scene.videoId);
    },
  },
};
