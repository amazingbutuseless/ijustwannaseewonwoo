import { gql } from 'apollo-server-lambda';

export const ChannelTypesDef = gql`
    type Channel {
        id: ID!
        name: String
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
        channel(root, {id}, ctx) {
        },

        channels(root, {page, limit}, ctx) {
        },
    },

    Mutation: {
        registerChannel(root, {data}, ctx) {
        },
    },

    Channel: {
        videos(channel, {page, limit}, ctx) {
        }
    }
};
