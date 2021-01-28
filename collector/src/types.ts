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

export interface VideoItemInListInterface extends VideoItemInterface {
  channel: {
    title: string;
    thumbnails: {
      default: string;
    };
  };
}

export interface VideoItemInterface {
  id: string;
  channelId: string;
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: {
    url: string;
  };
  scenes: SceneItemInterface[];
}

export interface SceneTimecodeInterface {
  start: number;
  end: number;
}

export interface SceneItemInterface extends SceneTimecodeInterface {
  thumbnail?: string;
}

export interface AddSceneReducerParameters extends SceneItemInterface {
  videoId: string;
  publishedAt: string;
}

export interface ChannelItemThumbnails {
  default?: string;
  medium?: string;
  high?: string;
}

export interface SceneAddFormProps {
  videoId: string;
  publishedAt: string;
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
}
