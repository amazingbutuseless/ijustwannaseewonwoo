import { gql } from 'apollo-server-lambda';

import Channel from '../resolvers/channel';


export const ChannelTypesDef = gql` 
    enum ImageResourceSize {
        default,
        medium,
        large,
    }
    
    type ImageResource {
        default: String
        medium: String
        large: String
    }
    
    type Channel {
        id: ID!
        name: String
        thumbnail: ImageResource
        videos(page: Int = 1, limit: Int = 10): [Video]
    }
    
    extend type Query {
        channel(id: ID!): Channel
        channels(page: Int, limit: Int): [Channel]
    }
    
    extend type Mutation {
        registerChannel(data: registerChannelData): Channel
    }
    
    input registerChannelData {
        id: String!
        name: String!
        image: String
    }
`;

export const ChannelResolvers = {
    Query: {
        async channel(root, {id}, ctx) {
            return await Channel.getByUser(id);
        },

        channels(root, {page, limit}, ctx) {
        },
    },

    Mutation: {
        registerChannel(root, {data}, ctx) {
        },
    },

    Channel: {
        name(channel, {}, ctx) {
            return channel.snippet.title;
        },

        thumbnails(channel, {}, ctx) {
            let thumbnails = {};

            Object.entries(channel.snippet.thumbnails).forEach(([size, details]) =>  {
                return thumbnails[size] = details.url;
            });

            return thumbnails;
        },

        videos(channel, {page, limit}, ctx) {
        }
    }
};
