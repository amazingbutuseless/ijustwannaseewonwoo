import { ytVideos, registeredVideos } from './PlaylistVideoList';

export class VideoHelper {
  static getVideosForWonwoo(ytVideos: ytVideos, registeredVideos: registeredVideos): Array<string> {
    const registeredVideoIds = registeredVideos.map((video) => video.videoId);
    const foundVideos = ytVideos.filter((video) => registeredVideoIds.includes(video.videoId));

    return foundVideos.map((video) => video.videoId);
  }
}
