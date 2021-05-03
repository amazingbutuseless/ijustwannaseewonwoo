export default {
  GRAPHQL_SERVER: 'http://localhost:3000/dev',
  TRAINING_SET_STORAGE: {
    bucket: 'ijustwannaseewonwoo-training-set',
    region: 'ap-northeast-2',
  },
  FACE_API_WEIGHTS:
    'https://ijustwannaseewonwoo-training-set.s3.ap-northeast-2.amazonaws.com/weight',
  FACE_MATCHER_FILE_URL:
    'https://ijustwannaseewonwoo-training-set.s3.ap-northeast-2.amazonaws.com/faceMatcher.json',
};
