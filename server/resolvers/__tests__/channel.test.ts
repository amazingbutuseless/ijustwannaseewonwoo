import Channel from '../channel';
import { describe } from '@jest/globals';

describe('Channel', () => {
  describe('Channel.register', () => {
    it('Can register a new channel', () => {
      Channel.register('https://www.youtube.com/user/pledis17').then(success => {
        expect(success).toEqual(true);
      }).catch(err => {
        console.log(err);
      });
    });
  });

  describe('Channel.get', () => {
    it('Can fetch a channel data', () => {
      Channel.get('testid').then(channel => {
        expect(channel).toHaveProperty('name');
        expect(channel.name).toEqual('test');
      }).catch(err => {
        console.log(err);
      });
    });
  });
});
