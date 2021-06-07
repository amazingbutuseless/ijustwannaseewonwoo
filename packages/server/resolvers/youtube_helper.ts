import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

export default {
  service: google.youtube('v3'),

  fetchData(options) {
    return this.service.channels.list(options).then((response) => {
      const channels = response.data.items;

      if (channels.length < 1) throw new Error('Channel Not Found');

      return channels[0];
    });
  },

  getChannelDataByUrl(channelUrl) {
    const options = {
      auth,
      part: 'snippet,contentDetails',
    };

    const regMatch = /youtube\.com\/(user|channel)\/([\w]+)/.exec(channelUrl);
    options[regMatch[1] === 'user' ? 'forUsername' : 'id'] = regMatch[2];

    return this.fetchData(options);
  },

  getChannelDataById(channelId) {
    const options = {
      auth,
      part: 'snippet,contentDetails',
      id: channelId,
    };

    return this.fetchData(options);
  },

  async getPlaylistItems(playlistId: string, pageToken = '') {
    const options = {
      auth,
      part: 'snippet,contentDetails',
      maxResults: 50,
      playlistId,
      pageToken,
    };

    let videos = [];

    const data = await this.service.playlistItems.list(options).then(({ data }) => {
      const videos = data.items;

      if (videos.length < 1) return;

      return {
        pageToken: data?.nextPageToken,
        videos,
      };
    });

    videos = [...data.videos];

    if (data.pageToken) {
      videos = [...videos, ...(await this.getPlaylistItems(playlistId, data.pageToken))];
    }

    return [...new Set(videos)];
  },
};
