import Amplify from 'aws-amplify';

export enum ENDPOINT {
  YOUTUBE = 'YoutubeApi',
  GRAPHQL = 'GraphQL',
  CMS = 'CMS',
}

Amplify.configure({
  Auth: {
    identityPoolId: 'ap-northeast-2:e8e9316e-e50d-4dbb-b9c7-ae68e1926b63',
    region: 'ap-northeast-2',
    userPoolId: 'ap-northeast-2_okJm9SO9F',
    userPoolWebClientId: 'q4kvqaec8ltuqt20fu7ca7qb4',
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
});

export { API as default, withSSRContext, Auth } from 'aws-amplify';
