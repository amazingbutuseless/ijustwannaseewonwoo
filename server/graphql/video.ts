import { gql } from 'apollo-server-lambda';

export const VideoTypesDef = gql`
    type Video {
        id: ID!
        title: String
        thumbnail: String
        duration: Int
        channel: Channel
        scenes: [Scene]
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
        video(root, {id}, ctx) {
        },

        videos(root, {channelId, page, limit}, ctx) {
        },
    },

    Mutation: {
        registerVideo(root, {data}, ctx) {
        },
    },

    Video: {
        channel(video, _, ctx) {
        },

        scenes(video, _, ctx) {
        },
    }
};
