import Video from '../video';

import VideoData from './__fixtures__/video.data';
import VideosData from './__fixtures__/videos.data';

describe('Video', () => {
  describe('Video.register', () => {
    it('Can register a video', async () => {
      const updatedVideo = await Video.register(VideoData);
      expect(updatedVideo).toHaveProperty('relId');
      expect(updatedVideo.relId).toEqual('2020-11-30T13:09:57Z/7-RbcrWTth4');
    });
  });

  describe('Video.registerBulk', () => {
    it('Can register multiple videos at once', async () => {
      const response = await Video.registerBulk(VideosData);
      expect(response.length).toEqual(5);
    });
  });

  describe('Video.get', () => {
    it('Can fetch a video by id', async () => {
      const video = await Video.get('EIEOT435fj0');
      expect(video).toHaveProperty('videoId');
      expect(video.videoId).toEqual('EIEOT435fj0');
    });
  });
});
