const dotenv = require('dotenv');
dotenv.config();

import { CfnOutput } from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sst from '@serverless-stack/resources';

export default class DynamoDBStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const table = new dynamodb.Table(this, 'Table', {
      tableName: `${process.env.APP_NAME}-${process.env.ENV}-db`,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      sortKey: {
        name: 'relId',
        type: dynamodb.AttributeType.STRING,
      },
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addLocalSecondaryIndex({
      indexName: 'channelIdIndex',
      sortKey: {
        name: 'channelId',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addLocalSecondaryIndex({
      indexName: 'videoIdIndex',
      sortKey: {
        name: 'videoId',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addLocalSecondaryIndex({
      indexName: 'playlistIdIndex',
      sortKey: {
        name: 'playlistId',
        type: dynamodb.AttributeType.STRING,
      },
    });

    new CfnOutput(this, 'TableName', {
      value: table.tableName,
      exportName: app.logicalPrefixedName('TableName'),
    });

    new CfnOutput(this, 'TableArn', {
      value: table.tableArn,
      exportName: app.logicalPrefixedName('TableArn'),
    });
  }
}
