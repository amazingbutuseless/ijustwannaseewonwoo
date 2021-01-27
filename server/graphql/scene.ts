import { gql } from 'apollo-server-lambda';

import Scene from '../resolvers/scene';

export const SceneTypesDef = gql`
  type Scene {
    id: ID!
    start: Int
    end: Int
    thumbnail: String
    video: Video
  }

  extend type Mutation {
    registerScene(data: registerSceneData): Video
  }

  input registerSceneData {
    videoId: String!
    publishedAt: String!
    start: Int!
    end: Int!
    thumbnail: String
  }
`;

export const SceneResolvers = {
  Mutation: {
    registerScene(root, { data }, ctx) {
      return Scene.register(data);
    },
  },
};
