import API, { ENDPOINT } from 'config/amplify';
import { gql } from 'graphql-request';

import graphqlFetcher from 'helpers/graphqlFetcher';

export function fetchVideos(reqPath: string) {
  return API.get(ENDPOINT.YOUTUBE, reqPath, {});
}

export function fetchList() {
  const query = gql`
    {
      listPlaylists {
        data {
          playlistId
          alias
          title
          description
          coverImg
          portraitCoverImg
          titleColor
          descriptionColor
        }
      }
    }
  `;

  return graphqlFetcher('read', query);
}

export function getByAlias(alias: string) {
  const query = gql`
    query getPlaylists($getPlaylistsParams: PlaylistsGetWhereInput!) {
      getPlaylists(where: $getPlaylistsParams) {
        data {
          playlistId
          title
          description
          coverImg
          portraitCoverImg
          titleColor
          descriptionColor
        }
      }
    }
  `;

  const variables = {
    getPlaylistsParams: {
      alias,
    },
  };

  return graphqlFetcher('read', query, variables);
}
