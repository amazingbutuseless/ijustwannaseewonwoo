import { DynamoDBQueryParameters } from './dynamodb_helper';

export default class VideoQueryParametersGenerator {
  private indexKey = '';

  private indexValue = '';

  private params: DynamoDBQueryParameters;

  constructor() {
    this.params = {
      KeyConditionExpression: 'id = :video',
      ExpressionAttributeValues: {
        ':video': {
          S: 'video',
        },
      },
    };
  }

  set index({ key, value }) {
    this.indexKey = key;
    this.indexValue = value;

    this.params.KeyConditionExpression = `${this.params.KeyConditionExpression} AND ${key} = :${key}`;
    this.params.ExpressionAttributeValues[`:${key}`] = {
      S: value,
    };
    this.params.IndexName = `${key}Index`;
  }

  private appendExclusiveStartKey(lastId): void {
    const ExclusiveStartKey = {
      id: {
        S: 'video',
      },
      relId: {
        S: lastId,
      },
    };

    if (this.indexKey.length > 0) {
      ExclusiveStartKey[this.indexKey] = {
        S: this.indexValue,
      };
    }

    this.params.ExclusiveStartKey = ExclusiveStartKey;
  }

  public generate(lastId = ''): DynamoDBQueryParameters {
    if (lastId.length > 0) this.appendExclusiveStartKey(lastId);

    return this.params;
  }
}
