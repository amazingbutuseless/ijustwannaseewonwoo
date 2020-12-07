import DB from './dynamodb_helper';
import YoutubeHelper from './youtube_helper';
import Video from './video';

export default {
  get(id) {
    const Key = {
      id: {
        S: 'channel',
      },
      relId: {
        S: id,
      },
    };

    return DB.getItem(Key).then((response) => {
      if (!response.hasOwnProperty('Item')) return null;

      return DB.parse(response.Item);
    });
  },

  getList() {
    const params = {
      ExpressionAttributeValues: {
        ':channel': {
          S: 'channel',
        },
      },
      KeyConditionExpression: 'id = :channel',
    };

    return DB.query(params).then((response) => {
      return response.Items.map((item) => DB.parse(item));
    });
  },

  async register(channelUrl) {
    const channelData = await YoutubeHelper.getChannelData(channelUrl);
    // todo: channelData에서 확인한 id로 채널이 중복 등록되지 않도록 주의 (Google API 호출 횟수 증가)

    const thumbnails = {
      default: channelData.snippet.thumbnails.default.url,
      medium: channelData.snippet.thumbnails.medium.url,
      high: channelData.snippet.thumbnails.high.url,
    };

    const Item = {
      id: {
        S: 'channel',
      },
      relId: {
        S: channelData.id,
      },
      title: {
        S: channelData.snippet.title,
      },
      thumbnails: {
        M: {
          default: {
            S: thumbnails.default,
          },
          medium: {
            S: thumbnails.medium,
          },
          high: {
            S: thumbnails.high,
          },
        },
      },
    };

    return DB.putItem(Item)
      .then(async () => {
        const videos = await YoutubeHelper.getPlaylistItems(
          channelData.contentDetails.relatedPlaylists.uploads
        );

        const channel = DB.parse(Item);
        channel.videos = await Video.registerBulk(videos);

        return channel;
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
  },
};
