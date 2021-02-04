import DB from './dynamodb_helper';
import YoutubeHelper from './youtube_helper';

import { IChannelRegisterParams } from '../types';

export default {
  get(id) {
    const Key = {
      id: {
        S: 'channel',
      },
      relId: {
        S: id,
      },
    };

    return DB.getItem(Key).then((response) => {
      if (!response.hasOwnProperty('Item')) return null;

      return DB.parse(response.Item);
    });
  },

  getList() {
    const params = {
      ExpressionAttributeValues: {
        ':channel': {
          S: 'channel',
        },
      },
      KeyConditionExpression: 'id = :channel',
    };

    return DB.query(params).then((response) => {
      return response.Items.map((item) => DB.parse(item));
    });
  },

  async register({ channelUrl, channelId }: IChannelRegisterParams) {
    let channelData = {};

    if (typeof channelUrl !== 'undefined') {
      channelData = await YoutubeHelper.getChannelDataByUrl(channelUrl);
    } else if (typeof channelId !== 'undefined') {
      channelData = await YoutubeHelper.getChannelDataById(channelId);
    }

    const thumbnails = {
      default: channelData.snippet.thumbnails.default.url,
      medium: channelData.snippet.thumbnails.medium.url,
      high: channelData.snippet.thumbnails.high.url,
    };

    const Item = {
      id: {
        S: 'channel',
      },
      relId: {
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
        },
      },
    };

    return DB.putItem(Item)
      .then(() => {
        return DB.parse(Item);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
