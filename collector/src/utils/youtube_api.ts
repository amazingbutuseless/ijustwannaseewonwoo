interface ListPlaylistItemParams {
  playlistId: string;
  pageToken?: string;
}

export default (() => {
  return {
    listPlaylistItem({ playlistId, pageToken }: ListPlaylistItemParams) {
      return new Promise((resolve, reject) => {
        const YoutubeClient = window.gapi.client.youtube;

        YoutubeClient.playlistItems
          .list({
            part: ['snippet,contentDetails'],
            maxResults: 21,
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
