import DB from './dynamodb_helper';
import YoutubeHelper from './youtube_helper';

export default {
  get(id) {
    const Key = {
      id: {
        S: 'channel',
      },
      rel_id: {
        S: id,
      },
    };

    return DB.getItem(Key).then(response => {
      if (!response.hasOwnProperty('Item')) return null;

      return DB.parse(response.Item);
    });
  },

  async register(channelUrl) {
    const channelData = await YoutubeHelper.getChannelData(channelUrl);

    const thumbnails = {
      default: channelData.snippet.thumbnails.default.url,
      medium: channelData.snippet.thumbnails.medium.url,
      high: channelData.snippet.thumbnails.high.url,
    };

    const Item = {
      id: {
        S: 'channel',
      },
      rel_id: {
        S: channelData.id,
      },
      title: {
        S: channelData.snippet.title,
      },
      thumbnails: {
        M: {
          default: {
            S: thumbnails.default,
          },
          medium: {
            S: thumbnails.medium,
          },
          high: {
            S: thumbnails.high,
          },
        }
      },
      uploadPlaylistId: {
        S: channelData.contentDetails.relatedPlaylists.uploads,
      },
    };

    return DB.putItem(Item).then(() => {
      return DB.parse(Item);
    }).catch(err => {
      console.log(err);
      return false;
    });
  },
};
