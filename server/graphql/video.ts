import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';

export const VideoTypesDef = gql`
    type Video {
        id: ID!
        title: String
        thumbnails: String
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
        id(video, _, ctx) {
            return video.rel_id;
        },

        async channel(video, _, ctx) {
            const channelId = video.rel_id.substr(0, video.rel_id.indexOf(':'));
            return Channel.get(channelId);
        },
    }
};
