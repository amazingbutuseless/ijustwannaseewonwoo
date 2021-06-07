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
  })

  describe('YoutubeHelper.getPlaylistItems', () => {
    it('Can fetch entire videos in a playlist', () => {
      YoutubeHelper.getPlaylistItems('UUfkXDY7vwkcJ8ddFGz8KusA').then(videos => {
        expect(videos).toHaveLength(742);
        console.log(videos);
      });
    });
  });
});
