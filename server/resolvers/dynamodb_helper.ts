const AWS = require('aws-sdk');

const options = {
  region: process.env.AWS_REGION,
};
if (process.env.hasOwnProperty('IS_OFFLINE')) options['endpoint'] = 'http://localhost:8000';
const dynamodb = new AWS.DynamoDB(options);

const promisify = (func) => {
  return new Promise((resolve, reject) => {
    func((err, result) => {
      if (err) return reject(err);

      resolve(result);
    });
  });
};

export default {
  isMapTypeItem(value) {
    return Object.keys(value)[0] === 'M';
  },

  parse(item) {
    const data = {};

    Object.entries(item).forEach(([key, value]) => {
      const content = Object.values(value)[0];
      if (this.isMapTypeItem(value)) {
        data[key] = this.parse(content);
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
};
