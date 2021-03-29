import DB from './dynamodb_helper';

import { VideoDataInterface } from '../types';

export default {
  prepareDataForCreating(videoItem) {
    const thumbnails = {};

    Object.entries(videoItem.snippet.thumbnails).forEach(([size, details]) => {
      thumbnails[size] = {
        M: {
          url: {
            S: details.url,
          },
          width: {
            N: details.width.toString(),
          },
          height: {
            N: details.height.toString(),
          },
        },
      };
    });

    const videoId = videoItem.contentDetails?.videoId || videoItem.id;
    const publishedAt = videoItem.contentDetails?.videoPublishedAt || videoItem.snippet.publishedAt;

    const video = {
      id: {
        S: 'video',
      },
      relId: {
        S: `${publishedAt}/${videoId}`,
      },
      channelId: {
        S: videoItem.snippet.channelId,
      },
      videoId: {
        S: videoId,
      },
      title: {
        S: videoItem.snippet.title,
      },
      thumbnails: {
        M: { ...thumbnails },
      },
      publishedAt: {
        S: publishedAt,
      },
      updatedAt: {
        S: new Date().toISOString(),
      },
      noAppears: {
        N: '0',
      },
    };

    if (typeof videoItem.snippet.playlistId !== 'undefined') {
      video.playlistId = {
        S: videoItem.snippet.playlistId,
      };
    }

    return video;
  },

  get(videoId: string): Promise<VideoDataInterface | Record<string, never>> {
    const ExpressionAttributeValues = {
      ':video': {
        S: 'video',
      },
      ':videoId': {
        S: videoId,
      },
    };
    const KeyConditionExpression = 'id = :video AND videoId = :videoId';

    const params = {
      IndexName: 'videoIdIndex',
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
        return {};
      });
  },

  async register(videoItem) {
    const Item = this.prepareDataForCreating(videoItem);

    return DB.putItem(Item)
      .then((success) => {
        return DB.parse(Item);
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
  },
};
