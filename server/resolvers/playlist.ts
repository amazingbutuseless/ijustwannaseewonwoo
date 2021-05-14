import DB from './dynamodb_helper';
import Channel from './channel';

import { IPlaylistListParams } from '../types';

export default {
  get(playlistId: string) {
    const ExpressionAttributeValues = {
      ':playlist': {
        S: 'playlist',
      },
      ':playlistId': {
        S: playlistId,
      },
    };
    const KeyConditionExpression = 'id = :playlist AND playlistId = :playlistId';

    const params = {
      IndexName: 'playlistIdIndex',
      ExpressionAttributeValues,
      KeyConditionExpression,
      Limit: 1,
    };

    return DB.query(params)
      .then((response) => {
        if (response.Items.length < 1) return {};

        return DB.parse(response.Items[0]);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },

  getList({ channelId, lastId, limit }: IPlaylistListParams) {
    const params = {
      ExpressionAttributeValues: {
        ':playlist': {
          S: 'playlist',
        },
      },
      KeyConditionExpression: 'id = :playlist',
      Limit: limit,
    };

    if (channelId) {
      params['IndexName'] = 'channelIdIndex';

      params.ExpressionAttributeValues[':channelId'] = {
        S: channelId,
      };

      params.KeyConditionExpression += ' AND channelId = :channelId';
    }

    if (lastId) {
      params['IndexName'] = 'playlistIdIndex';

      params['ExclusiveStartKey'] = {
        id: {
          S: 'playlist',
        },
        playlistId: {
          S: lastId,
        },
      };
    }

    return DB.query(params).then((response) => {
      return response.Items.map((item) => DB.parse(item));
    });
  },

  async register({ channelId, playlistId, title, sequence }) {
    const Item = {
      id: {
        S: 'playlist',
      },
      relId: {
        S: sequence,
      },
      channelId: {
        S: channelId,
      },
      playlistId: {
        S: playlistId,
      },
      title: {
        S: title,
      },
    };

    return DB.putItem(Item)
      .then(async (response) => {
        await Channel.register({ channelId, sequence: '999' });

        const playlist = DB.parse(Item);

        return {
          ...playlist,
          videos: [],
        };
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
