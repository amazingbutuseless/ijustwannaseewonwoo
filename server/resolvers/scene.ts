import DB from './dynamodb_helper';

interface IScene {
  videoId: string;
  start: number;
}

interface withThumbnail {
  thumbnail: string;
}

interface SceneRegisterDataInterface extends IScene, withThumbnail {
  end: number;
}

interface SceneUpdateDataInterface extends IScene, withThumbnail {}

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

  get({ videoId, start }: IScene) {
    const Key = {
      id: {
        S: 'scene',
      },
      relId: {
        S: `${videoId}/${start}`,
      },
    };

    return DB.getItem(Key).then((response) => {
      if (!response.hasOwnProperty('Item')) return null;

      return DB.parse(response.Item);
    });
  },

  async update({ videoId, start, thumbnail }: SceneUpdateDataInterface) {
    const params = {
      ExpressionAttributeNames: {
        '#thumbnail': 'thumbnail',
      },
      ExpressionAttributeValues: {
        ':t': {
          S: thumbnail,
        },
      },
      Key: {
        id: {
          S: 'scene',
        },
        relId: {
          S: `${videoId}/${start}`,
        },
      },
      UpdateExpression: 'SET #thumbnail = :t',
    };

    await DB.updateItem(params);

    return this.get({ videoId, start });
  },

  delete({ videoId, start }: IScene) {
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
