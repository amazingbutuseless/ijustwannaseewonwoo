import YoutubeHelper from '../youtube_helper';

describe('YoutubeHelper', () => {
  describe('YoutubeHelper.getChannelData', () => {
    it('Can fetch data using userName', () => {
      YoutubeHelper.getChannelData('https://www.youtube.com/user/pledis17').then((channel) => {
        expect(channel).toHaveProperty('snippet');
      });
    });

    it('Can fetch data using channel ID', () => {
      YoutubeHelper.getChannelData('https://www.youtube.com/channel/UCf1KsPc85_k6ujgItAiB63Q').then((channel) => {
        expect(channel).toHaveProperty('snippet');
      });
    });
  });
});
