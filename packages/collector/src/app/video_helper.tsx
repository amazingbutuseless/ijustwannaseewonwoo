import { YtVideos, RegisteredVideos } from '../types';

export class VideoHelper {
  static getVideosForWonwoo(ytVideos: YtVideos, registeredVideos: RegisteredVideos): Array<string> {
    const registeredVideoIds = registeredVideos.map((video) => video.videoId);
    const foundVideos = ytVideos.filter((video) => registeredVideoIds.includes(video.videoId));

    return foundVideos.map((video) => video.videoId);
  }
}
