import useSWR from 'swr';

import API from 'config/amplify';

async function fetchVideo(videoId: string) {
  const video = await API.graphql({
    query: `
    query getVideo($videoId: String) {
      getVideo(where: { videoId: $videoId }) {
        data {
          id
          title
          forWonwoo
        }
      }
    }`,
    variables: {
      videoId,
    },
  });

  const internalVideoId = video?.data?.getVideo?.data?.id || null;
  let scenes = {};

  if (internalVideoId) {
    scenes = await API.graphql({
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
          video: {
            id: internalVideoId,
          },
        },
      },
    });
  }

  return {
    ...video?.data?.getVideo?.data,
    scenes: scenes.data?.listScenes?.data || [],
  };
}

export default function useVideoDetails(videoId: string) {
  const { data, error } = useSWR(`/video/${videoId}`, () => {
    return fetchVideo(videoId as string);
  });

  return {
    video: data,
    isLoading: !data && !error,
  };
}
