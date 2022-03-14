import { gql } from 'graphql-request';

import graphqlFetcher from 'helpers/graphqlFetcher';

export function fetchRecentlyAddedVideos() {
  const query = gql`
    query listVideos {
      listVideos(where: {}, sort: [publishedAt_DESC], limit: 12) {
        data {
          videoId
          title
          publishedAt
          thumbnails {
            standard
            high
            maxres
          }
          channel
        }
      }
    }
  `;

  return graphqlFetcher('read', query);
}

export function getById(videoId: string) {
  const query = `
  query getVideo($videoId: String) {
    getVideo(where: { videoId: $videoId }) {
      data {
        id
        title
        forWonwoo
      }
    }
  }`;
  const variables = {
    videoId,
  };

  return graphqlFetcher('read', query, variables);
}
