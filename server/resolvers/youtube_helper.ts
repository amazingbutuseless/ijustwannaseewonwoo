const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_API_AUTH,
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

export default {
  service: google.youtube('v3'),

  async getChannelData(channelUrl) {
    const options = {
      auth: auth,
      part: 'snippet,contentDetails',
    };

    const regMatch = /youtube\.com\/(user|channel)\/([\w]+)/.exec(channelUrl);
    options[regMatch[1] === 'user' ? 'forUsername' : 'id'] = regMatch[2];

    return await this.service.channels
      .list(options)
      .then((response) => {
        const channels = response.data.items;

        if (channels.length < 1) throw new Error('Channel Not Found');

        return channels[0];
      });
  },

  async getPlaylistItems(playlistId, pageToken = '') {
    const options = {
      auth: auth,
      part: 'snippet,contentDetails',
      maxResults: 50,
      playlistId,
      pageToken,
    };

    let videos = [];

    const data = await this.service.playlistItems
      .list(options)
      .then(({ data }) => {
        const videos = data.items;

        if (videos.length < 1) return;

        return {
          pageToken: data?.nextPageToken,
          videos,
        };
      });

    videos = [...data.videos];

    if (data.pageToken) {
      videos = await this.getPlaylistItems(playlistId, data.pageToken);
    }

    return videos;
  }
};
