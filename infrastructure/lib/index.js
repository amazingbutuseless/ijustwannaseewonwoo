import DynamoDBStack from './DynamoDBStack';
import S3Stack from './S3Stack';
import CognitoStack from './CognitoStack';

export default function main(app) {
  const table = new DynamoDBStack(app, 'dynamodb');
  const s3 = new S3Stack(app, 's3');
  new CognitoStack(app, 'cognito', {
    tableArn:
      table.tableArn ||
      'arn:aws:dynamodb:ap-northeast-2:524717148731:table/ijustwannaseewonwoo-dev-db',
    bucketArn: s3.bucketArn || 'arn:aws:s3:::ijustwannaseewonwoo-training-set',
  });
}
