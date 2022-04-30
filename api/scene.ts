import { request } from 'helpers/request';

export const Queries = {
  fetchListByVideoId: `
listScenes(where: {videoId: $videoId}, sort: [startTime_ASC]) {
  data {
    id
    startTime
    endTime
    thumbnailUrl
  }
}`,
  createScene: `
mutation createScene($data: SceneInput!) {
  createScene(data: $data) {
    data {
      id
    }
  }
}`,
  publishScene: `
mutation publishScene($sceneId: ID!) {
  publishScene(revision: $sceneId) {
    data {
      startTime
      endTime
      thumbnailUrl
    }
  }
}
`,
};

export function fetchListByVideoId(videoId: string) {
  const body = {
    query: `query listScenes($videoId: String) {${Queries.fetchListByVideoId}}`,
    variables: {
      videoId,
    },
  };

  return request<{ listScenes: { data: Video.Scene[] } }>('/api/cms/read', { body });
}

interface RegisterNewSceneParams extends Omit<Video.Scene, 'id'> {
  videoId: string;
}

export async function registerNewScene(data: RegisterNewSceneParams) {
  const { createScene } = await request<{ createScene: { data: { id: string } } }>('/api/cms/manage', {
    method: 'POST',
    body: { query: Queries.createScene, variables: { data } },
  });

  const sceneId = createScene.data.id;

  if (!sceneId) return;

  const { publishScene } = await request<{ publishScene: { data: Omit<Video.Scene, 'id'> } }>('/api/cms/manage', {
    method: 'POST',
    body: {
      query: Queries.publishScene,
      variables: { sceneId },
    },
  });

  return publishScene.data;
}
