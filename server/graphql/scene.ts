import { gql } from 'apollo-server-lambda';

export const SceneTypesDef = gql`
    type Scene {
        id: ID!
        start: String
        end: String
        duration: Int
        thumbnails: [String]
        video: Video
    }
    
    extend type Query {
        scene(id: ID!): Scene
        scenes(videoId: String): [Scene]
    }
    
    extend type Mutation {
        registerScene(data: registerSceneData): Scene
    }
    
    input registerSceneData {
        videoId: String!
        start: String!
        end: String!
        thunbmails: [String]
    }
`;

export const SceneResolvers = {
    Query: {
        scene(root, {id}, ctx) {
        },

        scenes(root, _, ctx) {
        },
    },

    Mutation: {
        registerScene(root, {data}, ctx) {
        },
    },

    Scene: {
        video(scene, _, ctx) {
        },
    },
};
