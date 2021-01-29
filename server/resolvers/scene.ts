import DB from './dynamodb_helper';

interface SceneRegisterDataInterface {
  videoId: string;
  start: number;
  end: number;
  thumbnails: string;
}

interface SceneDeleteDataInterface {
  videoId: string;
  start: number;
}

export default {
  register({ videoId, start, end, thumbnail }: SceneRegisterDataInterface) {
    const Item = {
      id: {
        S: 'scene',
      },
      relId: {
        S: `${videoId}/${start}`,
      },
      videoId: {
        S: videoId,
      },
      start: {
        N: start.toString(),
      },
      end: {
        N: end.toString(),
      },
    };

    if (thumbnail) {
      Item.thumbnail = {
        S: thumbnail,
      };
    }

    return DB.putItem(Item)
      .then((response) => {
        return DB.parse(Item);
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
  },

  getForVideo(videoId: string) {
    const ExpressionAttributeValues = {
      ':scene': {
        S: 'scene',
      },
      ':videoId': {
        S: videoId,
      },
    };
    const KeyConditionExpression = 'id = :scene AND videoId = :videoId';

    const params = {
      IndexName: 'videoIdIndex',
      ExpressionAttributeValues,
      KeyConditionExpression,
    };

    return DB.query(params)
      .then((response) => {
        if (response.Items.length < 1) return [];

        return response.Items.map((item) => DB.parse(item));
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
  },

  delete({ videoId, start }: SceneDeleteDataInterface) {
    const Key = {
      id: {
        S: 'scene',
      },
      relId: {
        S: `${videoId}/${start}`,
      },
    };

    return DB.deleteItem(Key)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
        return {};
      });
  },
};
