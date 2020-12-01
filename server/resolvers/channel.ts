const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_API_AUTH,
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

export default {
  service: google.youtube('v3'),

  async getByUser(userName: string) {
    return await this.service.channels
      .list({
        auth: auth,
        part: 'snippet,contentDetails,statistics',
        forUsername: userName,
      })
      .then((response) => {
        const channels = response.data.items;

        if (channels.length < 1) throw new Error('Channel Not Found');

        return channels[0];
      });
  },
};
