import DB from './dynamodb_helper';

import Video from './video';

interface SceneRegisterDataInterface {
  videoId: string;
  publishedAt: string;
  start: number;
  end: number;
  thumbnails: string[];
}

export default {
  register({ videoId, publishedAt, start, end, thumbnail }: SceneRegisterDataInterface) {
    const scene = {
      M: {
        start: {
          N: start.toString(),
        },
        end: {
          N: end.toString(),
        },
      },
    };

    if (thumbnail) {
      scene.M.thumbnail = {
        S: thumbnail,
      };
    }

    const Key = {
      id: {
        S: 'video',
      },
      relId: {
        S: publishedAt,
      },
    };

    const ExpressionAttributeValues = {
      ':videoId': {
        S: videoId,
      },
      ':scene': {
        L: [scene],
      },
    };

    const params = {
      Key,
      UpdateExpression: 'SET scenes = list_append(scenes, :scene)',
      ConditionExpression: 'videoId = :videoId',
      ExpressionAttributeValues,
    };

    return DB.updateItem(params)
      .then((response) => {
        return Video.get(videoId);
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
  },
};
