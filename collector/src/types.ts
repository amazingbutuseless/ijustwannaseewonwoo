type SceneTime = number;
type ChannelId = string;
type PlaylistId = string;
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

export interface IVideoItemWithChannel extends IVideoItem {
  channel: ChannelDataInterface;
}

export interface IVideoItem {
  id: string;
  channelId: ChannelId;
  playlistId: PlaylistId;
  videoId: VideoId;
  title: string;
  publishedAt: VideoPublishedAt;
  thumbnail: {
    url: ThumbnailImageUrl;
  };
  scenes: Array<SceneItemInterface>;
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

export interface ISceneAddFormProps {
  visible: boolean;
  videoId: VideoId;
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
  onSceneAdded: () => void;
  onCloseButtonClick: () => void;
}

export interface IPlaylist {
  id: string;
  title: string;
  channel: {
    id: string;
    title: string;
    thumbnails: {
      medium: string;
    };
  };
}
