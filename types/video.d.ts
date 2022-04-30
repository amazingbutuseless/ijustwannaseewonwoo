declare namespace Video {
  type ThumbnailResolutions = 'default' | 'high' | 'medium' | 'maxres' | 'standard';

  interface Scene {
    id: string;
    startTime: number;
    endTime: number;
    thumbnailUrl?: string;
  }
  interface Entities {
    id?: string;
    videoId: string;
    title: string;
    publishedAt: string;
    thumbnails: {
      [resolution in ThumbnailResolutions]: string;
    };
    channel: string;
    forWonwoo?: boolean;
    scenes: Scene[];
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
