import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';


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
        videos(page: Int = 1, limit: Int = 20): [Video]
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
        async channel(root, {id}, ctx) {
            return await Channel.get(id);
        },

        channels(root, {page, limit}, ctx) {
        },
    },

    Mutation: {
        async registerChannel(root, {channelUrl}, ctx) {
            return await Channel.register(channelUrl);
        },
    },

    Channel: {
        id(channel, {}, ctx) {
            return channel.rel_id;
        },

        videos(channel, {page, limit}, ctx) {
        }
    }
};
