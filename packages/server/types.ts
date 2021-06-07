export interface VideoThumbnailInterface {
  [size: string]: {
    url: string;
    width: number;
    height: number;
  };
}

export interface VideoDataInterface {
  id: string;
  relId: string;
  videoId: string;
  channelId: string;
  title: string;
  thumbnail: VideoThumbnailInterface;
  publishedAt: string;
  updatedAt: string;
  noAppears: number;
}

export interface IPlaylistListParams {
  channelId?: string;
  lastId?: string;
  limit?: number;
}

export interface IChannelRegisterParams {
  channelUrl?: string;
  channelId?: string;
}
