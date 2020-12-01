import Channel from '../channel';

describe('Channel', () => {
  describe('Channel.get', () => {
    it('Can fetch data using userName', () => {
      Channel.getByUser('pledis17').then((channel) => {
        expect(channel).toHaveProperty('snippet');
        console.log(channel);
      });
    });
  });
});
