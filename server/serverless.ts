import { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'ijustwannaseewonwoo',
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
      'serverless-webpack',
      'serverless-offline',
      'serverless-dotenv-plugin'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: process.env.AWS_REGION,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    graphql: {
      handler: 'handler.graphql',
      events: [
        {
          http: {
            method: 'post',
            path: 'graphql',
          }
        }
      ]
    }
  }
};

module.exports = serverlessConfiguration;
