import DB from './dynamodb_helper';
import YoutubeHelper from './youtube_helper';

import { IChannelRegisterParams } from '../types';

export default {
  get(id) {
    const ExpressionAttributeValues = {
      ':channel': {
        S: 'channel',
      },
      ':channelId': {
        S: id,
      },
    };
    const KeyConditionExpression = 'id = :channel AND channelId = :channelId';

    const params = {
      IndexName: 'channelIdIndex',
      ExpressionAttributeValues,
      KeyConditionExpression,
      Limit: 1,
    };

    return DB.query(params).then((response) => {
      if (response.Items.length < 1) return {};

      return DB.parse(response.Items[0]);
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

  async register({ channelUrl, channelId, sequence }: IChannelRegisterParams) {
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
        S: sequence,
      },
      channelId: {
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
