import API from 'config/amplify';

export async function fetchScenesByVideoId(videoId: string) {
  const { data } = await API.graphql({
    query: `
    query listScenes($listSceneParams: SceneListWhereInput) {
      listScenes(where: $listSceneParams, sort: [startTime_ASC]) {
        data {
          id
          startTime
          endTime
          thumbnailUrl
        }
      }
    }`,
    variables: {
      listSceneParams: {
        videoId,
      },
    },
  });

  return data?.listScenes?.data || [];
}
