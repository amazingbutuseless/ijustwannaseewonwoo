import Videos from '../videos';

describe('Videos', () => {
  describe('Videos.get', () => {
    it('Can get videos of a channel', () => {
      Videos.getForChannel({ channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA' }).then((videos) => {
        expect(videos).toHaveLength(20);
      });
    });

    it('Can get videos of a channel with paging', () => {
      const lastId = 'UCfkXDY7vwkcJ8ddFGz8KusA::2013-02-18T09:55:54Z::W51xHn9wJfE';

      Videos.getForChannel({ channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA', lastId }).then((videos) => {
        const found = videos.find((video) => video.id === lastId);
        expect(found).toBeFalsy();
      });
    });
  });
});
