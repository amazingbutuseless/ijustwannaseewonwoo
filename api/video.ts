import { request } from 'helpers/request';
import { Queries as SceneQueries } from 'api/scene';
export interface FetchRecentlyAddedResponse {
  listVideos: { data: Video.Entities[] };
}

export interface GetByIdResponse {
  getVideo: { data: Video.Entities };
  listScenes: { data: Video.Scene[] };
}

export interface FetchListByPlaylistIdResponse {
  items: Video.ItemOfYtApi[];
  nextPageToken?: string;
}

export const Queries = {
  fetchRecentlyAddedVideos: `
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
}`,
  getById: `
query videoDetails($videoId: String) {
  getVideo(where: { videoId: $videoId }) {
    data {
      id
      title
      forWonwoo
    }
  }
  ${SceneQueries.fetchListByVideoId}
}`,
};

export function getById(videoId: string) {
  const body = {
    query: Queries.getById,
    variables: {
      videoId,
    },
  };

  return request<GetByIdResponse>('/api/cms/read', {
    method: 'POST',
    body,
  });
}

export function fetchListByPlaylistId({ playlistId, pageToken }: { playlistId: string; pageToken?: string }) {
  let reqUrl = `/api/youtube?playlistId=${playlistId}`;
  if (pageToken) {
    reqUrl += `&pageToken=${pageToken}`;
  }
  return request<FetchListByPlaylistIdResponse>(reqUrl);
}
