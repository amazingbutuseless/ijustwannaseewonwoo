const dotenv = require('dotenv');
dotenv.config();

import { CfnOutput } from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as sst from '@serverless-stack/resources';

export default class S3Stack extends sst.Stack {
  bucket;

  constructor(scope, id, props) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'FileStorage', {
      bucketName: `${process.env.APP_NAME}-training-set`,
      cors: [
        {
          maxAge: 3000,
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
        },
      ],
    });

    new CfnOutput(this, 'BucketName', {
      value: this.bucket.bucketName,
    });

    new CfnOutput(this, 'BucketArn', {
      value: this.bucket.bucketArn,
    });
  }
}
