import { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'ijustwannaseewonwoo',
  },

  frameworkVersion: '>=1.72.0',

  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    stage: '${env:ENV, self:provider.stage}',
    sstApp: '${env:ENV, "dev"}-ijustwannaseewonwoo-infra',
  },

  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dotenv-plugin'],

  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'ap-northeast-2',
    stage: '${env:ENV, opt:stage}',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    deploymentBucket: {
      name: 'amazingbutuseless-serverless-deploy',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:Query',
          'dynamodb:Scan',
        ],
        Resource: ['${env:DB_ARN}', '${env:DB_ARN}/*'],
      },
    ],
  },

  functions: {
    graphql: {
      handler: 'handler.graphql',
      events: [
        {
          http: {
            method: 'post',
            path: 'graphql',
            cors: true,
            authorizer: {
              type: 'aws_iam',
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
