import DB from './dynamodb_helper';

export default {
  getForChannel({ limit = 20, lastId = '', channelId }) {
    const ExpressionAttributeValues = {
      ':video': {
        S: 'video',
      },
      ':channelId': {
        S: channelId,
      },
    };
    const KeyConditionExpression = 'id = :video AND channelId = :channelId';

    const params = {
      IndexName: 'channelIdIndex',
      ExpressionAttributeValues,
      KeyConditionExpression,
      Limit: limit,
      ScanIndexForward: false,
    };

    if (lastId.length > 0) {
      params.ExclusiveStartKey = {
        id: {
          S: 'video',
        },
        relId: {
          S: lastId,
        },
        channelId: {
          S: channelId,
        },
      };
    }

    return DB.query(params)
      .then((response) => {
        return response.Items.map((item) => DB.parse(item));
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  },

  getForPlaylist({ playlistId, lastId, limit }) {
    const ExpressionAttributeValues = {
      ':video': {
        S: 'video',
      },
      ':playlistId': {
        S: playlistId,
      },
    };
    const KeyConditionExpression = 'id = :video AND playlistId = :playlistId';

    const params = {
      IndexName: 'playlistIdIndex',
      ExpressionAttributeValues,
      KeyConditionExpression,
      Limit: limit,
      ScanIndexForward: false,
    };

    if (lastId.length > 0) {
      params.ExclusiveStartKey = {
        id: {
          S: 'video',
        },
        relId: {
          S: lastId,
        },
        playlistId: {
          S: playlistId,
        },
      };
    }

    return DB.query(params)
      .then((response) => {
        return response.Items.map((item) => DB.parse(item));
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  },

  get({ limit = 20, lastId = '' }) {
    const KeyConditionExpression = 'id = :video';

    const params = {
      ExpressionAttributeValues: {
        ':video': {
          S: 'video',
        },
      },
      KeyConditionExpression,
      ScanIndexForward: false,
      Limit: limit,
    };

    if (lastId.length > 0) {
      params.ExclusiveStartKey = {
        id: {
          S: 'video',
        },
        relId: {
          S: lastId,
        },
      };
    }

    return DB.query(params)
      .then((response) => {
        return response.Items.map((item) => DB.parse(item));
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  },
};
