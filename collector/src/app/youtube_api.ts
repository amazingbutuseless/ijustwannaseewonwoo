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
  return {
    listPlaylistItem({ playlistId, pageToken }: ListPlaylistItemParams) {
      return new Promise((resolve, reject) => {
        const YoutubeClient = window.gapi.client.youtube;

        YoutubeClient.playlistItems
          .list({
            part: ['snippet,contentDetails'],
            maxResults: 28,
            playlistId,
            pageToken,
          })
          .then(
            (response) => resolve(response),
            (err) => reject(err)
          );
      });
    },

    getVideo(videoId: string) {
      return new Promise((resolve, reject) => {
        const YoutubeClient = window.gapi.client.youtube;

        YoutubeClient.videos
          .list({
            part: ['snippet,contentDetails'],
            id: [videoId],
          })
          .then(
            (response) => {
              const { snippet, contentDetails } = response.result.items[0];
              resolve({
                snippet,
                contentDetails,
              });
            },
            (err) => reject(err)
          );
      });
    },
  };
})();
