type SceneTime = number;
type ChannelId = string;
type PlaylistId = string;
type VideoId = string;
type VideoPublishedAt = string;
export type ThumbnailImageUrl = string;
export type YtVideos = Array<IVideoItem>;
export type RegisteredVideos = Array<RegisteredVideo>;

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

export interface ChannelItemThumbnails {
  default?: ThumbnailImageUrl;
  medium?: ThumbnailImageUrl;
  high?: ThumbnailImageUrl;
}

export interface ChannelDataInterface {
  id?: string;
  title: string;
  thumbnails: {
    default: ThumbnailImageUrl;
    high?: ThumbnailImageUrl;
  };
}

interface WithChannelId {
  channelId: ChannelId;
}

interface WithScenes {
  scenes: Array<SceneItemInterface>;
}

export interface WithPublishedAt {
  publishedAt: VideoPublishedAt;
}

export interface Video {
  videoId: VideoId;
}

export interface RegisteredVideo extends Video, WithPublishedAt {
  noAppears: number;
}

export interface IVideoItem extends Video, WithPublishedAt, WithChannelId, WithScenes {
  id: string;
  title: string;
  thumbnail: { url: ThumbnailImageUrl };
  playlistId?: PlaylistId;
}

export interface IVideoItemWithChannel extends IVideoItem {
  channel: ChannelDataInterface;
}

export interface SceneTimecodeInterface {
  start: SceneTime;
  end: SceneTime;
}

export interface SceneItemInterface extends SceneTimecodeInterface {
  video: Video;
  id?: string;
  thumbnail?: ThumbnailImageUrl;
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
  pageToken?: string;
  numOfVideos?: number;
  videos?: Array<RegisteredVideo>;
  ytVideos?: Array<IVideoItemWithChannel>;
}
