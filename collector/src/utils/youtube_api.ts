export default (() => {
  return {
    listPlaylistItem({ playlistId, pageToken }) {
      return new Promise((resolve, reject) => {
        window.gapi.client.youtube.playlistItems
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
  };
})();
