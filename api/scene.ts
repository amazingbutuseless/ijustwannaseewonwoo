import { gql } from 'graphql-request';

import graphqlFetcher from 'helpers/graphqlFetcher';

export function fetchScenesByVideoId(videoId: string) {
  const query = gql`
    query listScenes($listSceneParams: SceneListWhereInput) {
      listScenes(where: $listSceneParams, sort: [startTime_ASC]) {
        data {
          id
          startTime
          endTime
          thumbnailUrl
        }
      }
    }
  `;

  const variables = {
    listSceneParams: {
      videoId,
    },
  };

  return graphqlFetcher('read', query, variables);
}
