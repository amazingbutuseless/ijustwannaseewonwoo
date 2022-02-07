declare namespace Video {
  interface Video {
    videoId: string;
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
    thumbnailUrl: string;
  }
}

export = Video;
export as namespace Video;
