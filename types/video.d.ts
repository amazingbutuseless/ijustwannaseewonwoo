declare namespace Video {
  interface Video {
    videoId: string;
  }

  interface Entities {
    videoId: string;
    title: string;
    publishedAt: string;
    thumbnails: {
      [ThumbnailResolutions]: string;
    };
    channel: string;
    forWonwoo?: boolean;
    scenes: Scene[];
  }

  interface WithPublishedAt {
    publishedAt: string;
  }

  type ThumbnailResolutions = 'default' | 'high' | 'medium' | 'maxres' | 'standard';

  interface WithThumbnails {
    thumbnails: {
      [res in ThumbnailResolutions]: {
        url: string;
      };
    };
  }

  interface RegisteredVideo extends Video, WithPublishedAt {
    noAppears: number;
  }

  interface Scene {
    id: string;
    startTime: number;
    endTime: number;
    thumbnailUrl?: string;
  }

  interface ItemOfYtApi {
    snippet: {
      resourceId: {
        videoId: string;
      };
      title: string;
      publishedAt: string;
      thumbnails: {
        [resolution in ThumbnailResolutions]: {
          url: string;
        };
      };
      videoOwnerChannelTitle: string;
    };
  }
}

export = Video;
export as namespace Video;
