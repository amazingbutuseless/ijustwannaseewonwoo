import { describe, it, expect } from '@jest/globals';

import VideosResolver, { ChannelVideosResolver } from '../videos';

describe('Videos', () => {
  describe('Videos.get', () => {
    it('Can get videos', () => {
      const resolver = new VideosResolver();
      resolver.get().then((videos) => {
        expect(videos).toHaveLength(20);
      });
    });

    it('Can get videos of a channel', () => {
      const handler = new ChannelVideosResolver('UCfkXDY7vwkcJ8ddFGz8KusA');
      handler.get().then((videos) => {
        expect(videos).toHaveLength(21);
      });
    });

    it('Can get videos of a channel with paging', () => {
      const lastId = '2013-02-18T09:55:54Z/W51xHn9wJfE';

      const handler = new ChannelVideosResolver('UCfkXDY7vwkcJ8ddFGz8KusA');
      handler.get(lastId).then((videos) => {
        const found = videos.find((video) => video.id === lastId);
        expect(found).toBeFalsy();
      });
    });
  });
});
