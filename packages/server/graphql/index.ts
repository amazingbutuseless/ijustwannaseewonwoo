import { gql } from 'apollo-server-lambda';
import { merge } from 'lodash';

import { VideoTypesDef, VideoResolvers } from './video';
import { ChannelTypesDef, ChannelResolvers } from './channel';
import { SceneTypesDef, SceneResolvers } from './scene';
import { PlaylistTypeDefs, PlaylistRevolvers } from './playlist';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [
  Query,
  Mutation,
  VideoTypesDef,
  ChannelTypesDef,
  SceneTypesDef,
  PlaylistTypeDefs,
];

export const resolvers = merge(
  {},
  VideoResolvers,
  ChannelResolvers,
  SceneResolvers,
  PlaylistRevolvers
);
