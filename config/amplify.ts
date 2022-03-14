import Amplify from 'aws-amplify';

export enum ENDPOINT {
  YOUTUBE = 'YoutubeApi',
  GRAPHQL = 'GraphQL',
  CMS = 'CMS',
}

Amplify.configure({
  Auth: {
    region: 'ap-northeast-2',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    cookieStorage: {
      domain: (process.env.NEXT_PUBLIC_APP_HOSTNAME || '').split(':')[0],
      path: '/',
      expires: 30,
      secure: false,
    },
  },
  API: {
    endpoints: [
      {
        name: ENDPOINT.YOUTUBE,
        endpoint: 'https://pd6nn2y548.execute-api.ap-northeast-2.amazonaws.com/dev',
        region: 'ap-northeast-2',
      },
    ],
  },
  ssr: true,
  oauth: {
    domain: 'wonwoo-video.auth.ap-northeast-2.amazoncognito.com',
    scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: `http://${process.env.NEXT_PUBLIC_APP_HOSTNAME}/auth-complete`,
    redirectSignOut: `http://${process.env.NEXT_PUBLIC_APP_HOSTNAME}/auth-complete`,
    responseType: 'code',
  },
});

export { API as default, withSSRContext, Auth, Hub } from 'aws-amplify';
