import { CfnOutput } from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as sst from '@serverless-stack/resources';
import * as iam from '@aws-cdk/aws-iam';

import CognitoAuthRole from './CognitoAuthRole';

export default class CognitoStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;
    const { tableArn, bucketArn } = props;

    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: `${process.env.APP_NAME}-${process.env.ENV}-userpool`,
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { email: true },
      standardAttributes: {
        email: {
          mutable: false,
          required: true,
        },
        nickname: {
          mutable: true,
          required: true,
        },
      },
    });

    const domainPrefix = `${process.env.APP_NAME}-${process.env.ENV}`;

    userPool.addDomain('CognitoDomain', {
      cognitoDomain: {
        domainPrefix,
      },
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
      userPoolClientName: `${process.env.APP_NAME}-${process.env.ENV}-authclient`,
      generateSecret: false,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL, cognito.OAuthScope.PROFILE],
        callbackUrls: [
          `https://${domainPrefix}.auth.${process.env.AWS_REGION}.amazoncognito.com/oauth2/idpresponse`,
        ],
        logoutUrls: [],
      },
    });

    const identityPool = new cognito.CfnIdentityPool(this, 'IdentityPool', {
      identityPoolName: `${process.env.APP_NAME}-${process.env.ENV}-idp`,
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
      OpenIdConnectProviderARNs: process.env.OPEN_ID_CONNECT_ARN,
    });

    const authenticatedRole = new CognitoAuthRole(this, 'CognitoAuthRole', {
      identityPool,
    });

    authenticatedRole.role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:Query',
          'dynamodb:Scan',
        ],
        effect: iam.Effect.ALLOW,
        resources: [tableArn, `${tableArn}/*`],
      })
    );

    authenticatedRole.role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:ListBucket'],
        effect: iam.Effect.ALLOW,
        resources: [bucketArn],
      })
    );

    authenticatedRole.role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
        effect: iam.Effect.ALLOW,
        resources: [`${bucketArn}/*`],
      })
    );

    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });

    new CfnOutput(this, 'IdentityPoolId', {
      value: identityPool.ref,
    });

    new CfnOutput(this, 'AuthenticatedRoleName', {
      value: authenticatedRole.role.roleName,
      exportName: app.logicalPrefixedName('CognitoAuthRole'),
    });
  }
}
