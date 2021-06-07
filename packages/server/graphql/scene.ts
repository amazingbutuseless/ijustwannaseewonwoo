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
    updateScene(data: updateSceneData): Scene
    deleteScene(data: deleteSceneData): Scene
  }

  input registerSceneData {
    videoId: String!
    start: Int!
    end: Int!
    thumbnail: String
  }

  input updateSceneData {
    videoId: String!
    start: Int!
    thumbnail: String
  }

  input deleteSceneData {
    videoId: String!
    start: Int!
  }
`;

export const SceneResolvers = {
  Query: {
    scenes(_, { videoId }) {
      return Scene.getForVideo(videoId);
    },
  },

  Mutation: {
    registerScene(_, { data }) {
      return Scene.register(data);
    },

    updateScene(_, { data }) {
      return Scene.update(data);
    },

    deleteScene(_, { data }) {
      return Scene.delete(data);
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
