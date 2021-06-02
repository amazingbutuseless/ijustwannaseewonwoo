import { ipcRenderer } from 'electron';
import configure from '../configure';

interface ListPlaylistItemParams {
  playlistId: string;
  pageToken?: string;
}

interface YoutubeVideoThumbnail {
  url: string;
  width: number;
  height: number;
}

interface PlaylistItemResourceSnippet {
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  playlistId: string;
  title: string;
  description: string;
  thumbnails: {
    [thumbnailType: string]: YoutubeVideoThumbnail;
  };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
}

interface PlaylistItemResourceContentDetails {
  videoId: string;
  startAt: string;
  endAt: string;
  note: string;
  videoPublishedAt: string;
}

interface PlaylistItemResource {
  kind: 'youtube#playlistItem';
  etag: string;
  id: string;
  snippet: PlaylistItemResourceSnippet;
  contentDetails: PlaylistItemResourceContentDetails;
}

interface YoutubePlaylistItemsListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<PlaylistItemResource>;
}

export default (() => {
  const request = async (path, params) => {
    const queryStrings = new URLSearchParams(params);
    queryStrings.append('key', configure.YOUTUBE_API_KEY);

    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3${path}?${queryStrings.toString()}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ipcRenderer.sendSync('auth/fetchToken').access_token}`,
        },
      }
    );

    return response.json();
  };

  return {
    listPlaylistItem({ playlistId, pageToken }: ListPlaylistItemParams) {
      return request('/playlistItems', {
        part: 'snippet,contentDetails',
        maxResults: 28,
        playlistId,
        pageToken,
      });
    },

    getVideo(videoId: string) {
      return request('/videos', {
        part: 'snippet,contentDetails',
        id: videoId,
      }).then((data) => data.items[0]);
    },
  };
})();
