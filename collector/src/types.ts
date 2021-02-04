type SceneTime = number;
type ChannelId = string;
type VideoId = string;
type VideoPublishedAt = string;
type ThumbnailImageUrl = string;

export interface APIClientRequestParameters {
  body?: {
    [key: string]: any;
  };
  [key: string]: any;
}

export interface APIClientRequestConfig {
  method: 'GET' | 'POST';
  headers: {
    [key: string]: string;
  };
  body?: string;
}

export interface ChannelDataInterface {
  id?: string;
  title: string;
  thumbnails: {
    default: ThumbnailImageUrl;
    high?: ThumbnailImageUrl;
  };
}

export interface VideoItemInListInterface extends VideoItemInterface {
  channel: ChannelDataInterface;
}

export interface VideoItemInterface {
  id: string;
  channelId: ChannelId;
  videoId: VideoId;
  title: string;
  publishedAt: VideoPublishedAt;
  thumbnail: {
    url: ThumbnailImageUrl;
  };
  scenes: SceneItemInterface[];
}

export interface SceneTimecodeInterface {
  start: SceneTime;
  end: SceneTime;
}

export interface SceneItemInterface extends SceneTimecodeInterface {
  id?: string;
  thumbnail?: ThumbnailImageUrl;
  video: {
    videoId: VideoId;
  };
}

export interface AddSceneReducerParameters extends SceneTimecodeInterface {
  videoId: VideoId;
}

export interface ChannelItemThumbnails {
  default?: ThumbnailImageUrl;
  medium?: ThumbnailImageUrl;
  high?: ThumbnailImageUrl;
}

export interface SceneAddFormProps {
  videoId: VideoId;
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
}

export interface IDrawerStyleProps {
  expanded: boolean;
}
