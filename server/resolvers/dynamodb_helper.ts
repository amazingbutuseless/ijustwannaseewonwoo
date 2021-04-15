const AWS = require('aws-sdk');

const options = {
  region: process.env.AWS_REGION,
};
if (process.env.hasOwnProperty('IS_OFFLINE')) options.endpoint = 'http://localhost:8000';
const dynamodb = new AWS.DynamoDB(options);

const promisify = (func) => {
  return new Promise((resolve, reject) => {
    func((err, result) => {
      if (err) return reject(err);

      resolve(result);
    });
  });
};

interface IExpressionAttributeValues {
  [AttributeName: string]: {
    S: string;
  };
}

interface IExclusiveStartKey {
  id: {
    S: string;
  };
  relId: {
    S: string;
  };
  [KeyName: string]: {
    S: string;
  };
}

export interface DynamoDBQueryParameters {
  ExpressionAttributeValues: IExpressionAttributeValues;
  KeyConditionExpression: string;
  IndexName?: string;
  ExclusiveStartKey?: IExclusiveStartKey;
}

export default {
  isMapTypeItem(value) {
    return Object.keys(value)[0] === 'M';
  },

  isListTypeItem(value) {
    return Object.keys(value)[0] === 'L';
  },

  parse(item) {
    const data = {};

    Object.entries(item).forEach(([key, value]) => {
      const content = Object.values(value)[0];

      if (this.isMapTypeItem(value)) {
        data[key] = this.parse(content);
      } else if (this.isListTypeItem(value)) {
        data[key] = [];

        content.forEach((item) => {
          const itemContent = Object.values(item)[0];
          data[key].push(this.parse(itemContent));
        });
      } else {
        data[key] = content;
      }
    });

    return data;
  },

  query(params) {
    return promisify((callback) => {
      dynamodb.query(
        {
          ...params,
          TableName: process.env.DB_NAME,
        },
        callback
      );
    });
  },

  scan(params) {
    return promisify((callback) => {
      dynamodb.scan(
        {
          ...params,
          TableName: process.env.DB_NAME,
        },
        callback
      );
    });
  },

  getItem(Key) {
    return promisify((callback) =>
      dynamodb.getItem(
        {
          Key,
          TableName: process.env.DB_NAME,
        },
        callback
      )
    );
  },

  putItem(Item) {
    return promisify((callback) =>
      dynamodb.putItem(
        {
          Item,
          TableName: process.env.DB_NAME,
        },
        callback
      )
    );
  },

  putItems(Items) {
    const params = {
      RequestItems: {},
    };

    params.RequestItems[process.env.DB_NAME] = Items.map((Item) => {
      return {
        PutRequest: {
          Item,
        },
      };
    });

    return promisify((callback) => {
      dynamodb.batchWriteItem(params, callback);
    });
  },

  updateItem(params) {
    return promisify((callback) => {
      dynamodb.updateItem({ ...params, TableName: process.env.DB_NAME }, callback);
    });
  },

  deleteItem(Key) {
    return promisify((callback) => {
      dynamodb.deleteItem({ Key, TableName: process.env.DB_NAME }, callback);
    });
  },
};
