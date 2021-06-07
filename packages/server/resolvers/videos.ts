import DB, { DynamoDBQueryParameters } from './dynamodb_helper';
import VideoQueryParametersGenerator from './video_query_parameters_generator';

interface VideosQueryParameters {
  params: DynamoDBQueryParameters;
  limit?: number;
}

export function queryVideos({
  params: { IndexName, ExpressionAttributeValues, KeyConditionExpression, ExclusiveStartKey },
  limit = 21,
}: VideosQueryParameters) {
  const params = {
    ExpressionAttributeValues,
    KeyConditionExpression,
    Limit: limit,
    ScanIndexForward: false,
  };

  if (IndexName) {
    params.IndexName = IndexName;
  }

  if (ExclusiveStartKey) {
    params.ExclusiveStartKey = ExclusiveStartKey;
  }

  return DB.query(params)
    .then((response) => {
      return response.Items.map((item) => DB.parse(item));
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export default class VideosResolver {
  private queryParametersGenerator = new VideoQueryParametersGenerator();

  get(lastId, limit) {
    const params = this.queryParametersGenerator.generate(lastId);
    return queryVideos({ params, limit });
  }
}

export class ChannelVideosResolver {
  private queryParametersGenerator = new VideoQueryParametersGenerator();

  constructor(channelId: string) {
    this.queryParametersGenerator.index = {
      key: 'channelId',
      value: channelId,
    };
  }

  get(lastId, limit) {
    const params = this.queryParametersGenerator.generate(lastId);
    return queryVideos({ params, limit });
  }
}

export class PlaylistVideosResolver {
  private queryParametersGenerator = new VideoQueryParametersGenerator();

  constructor(playlistId: string) {
    this.queryParametersGenerator.index = {
      key: 'playlistId',
      value: playlistId,
    };
  }

  get(lastId, limit) {
    const params = this.queryParametersGenerator.generate(lastId);
    return queryVideos({ params, limit });
  }
}
