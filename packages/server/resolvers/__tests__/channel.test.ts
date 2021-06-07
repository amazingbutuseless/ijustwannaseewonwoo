import { describe } from '@jest/globals';
import Channel from '../channel';

describe('Channel', () => {
  describe('Channel.register', () => {
    it('Can register a new channel', () => {
      Channel.register('https://www.youtube.com/user/pledis17')
        .then((success) => {
          expect(success).toEqual(true);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe('Channel.get', () => {
    it('Can fetch a channel data', () => {
      Channel.get('UCfkXDY7vwkcJ8ddFGz8KusA')
        .then((channel) => {
          expect(channel).toHaveProperty('title');
          expect(channel.title).toEqual('SEVENTEEN');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe('Channel.getList', () => {
    it('Can fetch entire channels', () => {
      Channel.getList().then((channels) => {
        expect(channels.length).toBeGreaterThan(0);
      });
    });
  });
});
