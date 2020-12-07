import DB from './dynamodb_helper';

export default {
  prepareDataForCreating(videoItem) {
    const thumbnails = {};

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

    return {
      id: {
        S: 'video',
      },
      relId: {
        S: `${videoItem.snippet.channelId}::${videoItem.contentDetails.videoPublishedAt}::${videoItem.contentDetails.videoId}`,
      },
      channelId: {
        S: videoItem.snippet.channelId,
      },
      videoId: {
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
      publishedAt: {
        S: videoItem.contentDetails.videoPublishedAt,
      },
      updatedAt: {
        S: new Date().toISOString(),
      },
      noAppears: {
        N: '0',
      },
    };
  },

  async register(videoItem) {
    const Item = this.prepareDataForCreating(videoItem);

    return DB.putItem(Item)
      .then((success) => {
        return DB.parse(Item);
      })
      .catch((err) => {
        console.log(err);
        return {};
      });
  },

  registerBulk(videos) {
    let updatedVideos = [];

    const tasks = [];

    while (videos.length > 0) {
      const videoChunk = videos.splice(0, Math.min(25, videos.length));
      const items = videoChunk.map((video) => this.prepareDataForCreating(video));

      tasks.push(DB.putItems(items));
      updatedVideos = updatedVideos.concat(items.map((video) => DB.parse(video)));
    }

    return Promise.all(tasks).then((results) => {
      return updatedVideos;
    });
  },
};
