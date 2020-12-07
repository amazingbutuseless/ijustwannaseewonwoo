import DB from './dynamodb_helper';

export default {
  getForChannel({ limit = 20, lastId = '', channelId }) {
    const ExpressionAttributeValues = {
      ':video': {
        S: 'video',
      },
    };
    let KeyConditionExpression = 'id = :video';

    if (channelId.length > 0) {
      ExpressionAttributeValues[':videoId'] = {
        S: channelId,
      };
      KeyConditionExpression += ' AND  begins_with(relId, :videoId)';
    }

    const params = {
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
