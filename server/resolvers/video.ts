import DB from './dynamodb_helper';

export default {
  async register(videoItem) {
    let thumbnails = {};

    Object.entries(videoItem.snippet.thumbnails).forEach(([size, details]) => {
      thumbnails[size] = {
        M: {
          url: {
            S: details.url,
          },
          width: {
            N: details.width.toString(),
          },
          height: {
            N: details.height.toString(),
          },
        },
      };
    });

    const Item = {
      id: {
        S: 'video',
      },
      rel_id: {
        S: `${videoItem.snippet.channelId}::${videoItem.contentDetails.videoPublishedAt}::${videoItem.contentDetails.videoId}`,
      },
      channel_id: {
        S: videoItem.snippet.channelId,
      },
      video_id: {
        S: videoItem.contentDetails.videoId,
      },
      title: {
        S: videoItem.snippet.title,
      },
      thumbnails: {
        M: { ...thumbnails },
      },
      scenes: {
        L: [],
      },
      published_at: {
        S: videoItem.contentDetails.videoPublishedAt,
      },
      updated_at: {
        S: new Date().toISOString(),
      },
      no_appears: {
        N: '0',
      },
    };

    return DB.putItem(Item)
      .then((success) => {
        return DB.parse(Item);
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
  },

  async registerBulk(videos, results = []) {
    const video = videos.shift();

    const updatedVideo = await this.register(video);

    if (Object.keys(updatedVideo).length > 0) {
      results.push(updatedVideo);
    }

    if (videos.length > 0) {
      results = await this.registerBulk(videos, results);
    }

    return results;
  },
};
