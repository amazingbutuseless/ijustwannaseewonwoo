import DynamoDBStack from './DynamoDBStack';
import CognitoStack from './CognitoStack';

export default function main(app) {
  const table = new DynamoDBStack(app, 'dynamodb');
  new CognitoStack(app, 'cognito', {
    tableArn:
      table.tableArn ||
      'arn:aws:dynamodb:ap-northeast-2:524717148731:table/ijustwannaseewonwoo-dev-db',
  });
}
