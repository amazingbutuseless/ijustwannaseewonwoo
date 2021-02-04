import DB from './dynamodb_helper';
import YoutubeHelper from './youtube_helper';
import Channel from './channel';
import Video from './video';

import { IPlaylistListParams } from '../types';

export default {
  get(playlistId: string) {
    const Key = {
      id: {
        S: 'playlist',
      },
      relId: {
        S: playlistId,
      },
    };

    return DB.getItem(Key)
      .then((response) => {
        if (!response.hasOwnProperty('Item')) return null;

        return DB.parse(response.Item);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },

  getList({ channelId, lastId, limit }: IPlaylistListParams) {
    const ExpressionAttributeValues = {
      ':playlist': {
        S: 'playlist',
      },
    };

    let KeyConditionExpression = 'id = :playlist';

    if (channelId) {
      ExpressionAttributeValues[':channelId'] = {
        S: channelId,
      };

      KeyConditionExpression += ' AND relId = :channelId';
    }

    const params = {
      ExpressionAttributeValues,
      KeyConditionExpression,
      Limit: limit,
    };

    if (lastId) {
      params.ExclusiveStartKey = {
        id: {
          S: 'playlist',
        },
        relId: {
          S: lastId,
        },
      };
    }

    return DB.query(params).then((response) => {
      return response.Items.map((item) => DB.parse(item));
    });
  },

  async register({ channelId, playlistId, title }) {
    const videos = await YoutubeHelper.getPlaylistItems(playlistId);

    const Item = {
      id: {
        S: 'playlist',
      },
      relId: {
        S: playlistId,
      },
      channelId: {
        S: channelId,
      },
      title: {
        S: title,
      },
    };

    return DB.putItem(Item)
      .then(async (response) => {
        await Channel.register({ channelId });
        const updatedVideos = await Video.registerBulk(videos, playlistId);
        const playlist = DB.parse(Item);
        return {
          ...playlist,
          videos: updatedVideos,
        };
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  },
};
