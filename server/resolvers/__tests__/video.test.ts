import YoutubeHelper from '../youtube_helper';
import Video from '../video';

describe('Video', () => {
  describe('Video.register', () => {
    it('Can register a video', () => {
      const video = {
        kind: 'youtube#playlistItem',
        etag: 'QjKloNhYxUbduLdI3VUxtrmg3Eo',
        id: 'VVVma1hEWTd2d2tjSjhkZEZHejhLdXNBLjU2QjQ0RjZEMTA1NTdDQzY=',
        snippet: {
          publishedAt: '2020-11-30T09:05:13Z',
          channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA',
          title: "[GOING SEVENTEEN 2020] EP.40 돈't Lie Ⅱ #1 (Don't Lie Ⅱ #1)",
          description:
            "[GOING SEVENTEEN 2020] EP.40 돈't Lie Ⅱ #1 (Don't Lie Ⅱ #1)\n\n현금을 숨긴 마피아를 찾아 상금을 획득하라!💸\n돌아온 마피아 게임계의 레전드 '돈't Lie Ⅱ'\n\n더욱 업그레이드 된 게임 룰🕴\n캐럿들도 함께 마피아를 찾아보세요!🧐\n\nUncover the mafia who hid the cash and get the prize!\nThe legend of the mafia game returns with 'Don't Lie Ⅱ'\n\nGet ready for new and improved game rules\nThe game’s afoot, CARAT! Join us hunt down the mafia!🧐\n\n#세븐틴 #SEVENTEEN\n#GOING_SVT",
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/7-RbcrWTth4/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/7-RbcrWTth4/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/7-RbcrWTth4/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            standard: {
              url: 'https://i.ytimg.com/vi/7-RbcrWTth4/sddefault.jpg',
              width: 640,
              height: 480,
            },
            maxres: {
              url: 'https://i.ytimg.com/vi/7-RbcrWTth4/maxresdefault.jpg',
              width: 1280,
              height: 720,
            },
          },
          channelTitle: 'SEVENTEEN',
          playlistId: 'UUfkXDY7vwkcJ8ddFGz8KusA',
          position: 0,
          resourceId: {
            kind: 'youtube#video',
            videoId: '7-RbcrWTth4',
          },
        },
        contentDetails: {
          videoId: '7-RbcrWTth4',
          videoPublishedAt: '2020-11-30T13:09:57Z',
        },
      };

      Video.register(video).then((updatedVideo) => {
        expect(updatedVideo).toHaveProperty('rel_id');
        expect(updatedVideo.rel_id).toEqual(
          'UCfkXDY7vwkcJ8ddFGz8KusA::2020-11-30T13:09:57Z::7-RbcrWTth4'
        );
      });
    });
  });

  describe('Video.registerBulk', () => {
    it('Can register multiple videos at once', () => {
      const videos = [
        {
          kind: 'youtube#playlistItem',
          etag: 'QjKloNhYxUbduLdI3VUxtrmg3Eo',
          id: 'VVVma1hEWTd2d2tjSjhkZEZHejhLdXNBLjU2QjQ0RjZEMTA1NTdDQzY=',
          snippet: {
            publishedAt: '2020-11-30T09:05:13Z',
            channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA',
            title: "[GOING SEVENTEEN 2020] EP.40 돈't Lie Ⅱ #1 (Don't Lie Ⅱ #1)",
            description:
              "[GOING SEVENTEEN 2020] EP.40 돈't Lie Ⅱ #1 (Don't Lie Ⅱ #1)\n\n현금을 숨긴 마피아를 찾아 상금을 획득하라!💸\n돌아온 마피아 게임계의 레전드 '돈't Lie Ⅱ'\n\n더욱 업그레이드 된 게임 룰🕴\n캐럿들도 함께 마피아를 찾아보세요!🧐\n\nUncover the mafia who hid the cash and get the prize!\nThe legend of the mafia game returns with 'Don't Lie Ⅱ'\n\nGet ready for new and improved game rules\nThe game’s afoot, CARAT! Join us hunt down the mafia!🧐\n\n#세븐틴 #SEVENTEEN\n#GOING_SVT",
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/7-RbcrWTth4/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/7-RbcrWTth4/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/7-RbcrWTth4/hqdefault.jpg',
                width: 480,
                height: 360,
              },
              standard: {
                url: 'https://i.ytimg.com/vi/7-RbcrWTth4/sddefault.jpg',
                width: 640,
                height: 480,
              },
              maxres: {
                url: 'https://i.ytimg.com/vi/7-RbcrWTth4/maxresdefault.jpg',
                width: 1280,
                height: 720,
              },
            },
            channelTitle: 'SEVENTEEN',
            playlistId: 'UUfkXDY7vwkcJ8ddFGz8KusA',
            position: 0,
            resourceId: {
              kind: 'youtube#video',
              videoId: '7-RbcrWTth4',
            },
          },
          contentDetails: {
            videoId: '7-RbcrWTth4',
            videoPublishedAt: '2020-11-30T13:09:57Z',
          },
        },
        {
          kind: 'youtube#playlistItem',
          etag: 'm_2raq9nregbAF4-Q9tXBg1U-sw',
          id: 'VVVma1hEWTd2d2tjSjhkZEZHejhLdXNBLjI4OUY0QTQ2REYwQTMwRDI=',
          snippet: {
            publishedAt: '2020-11-29T11:13:28Z',
            channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA',
            title: "[INSIDE SEVENTEEN] 디노의 DANCEOLOGY 비하인드 (DINO'S DANCEOLOGY Behind)",
            description:
              "[INSIDE SEVENTEEN] 디노의 DANCEOLOGY 비하인드 (DINO'S DANCEOLOGY Behind)\n\n#디노 #DINO\n#SEVENTEEN #세븐틴\n#INSIDE_SVT",
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/t_x7Cx6vK48/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/t_x7Cx6vK48/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/t_x7Cx6vK48/hqdefault.jpg',
                width: 480,
                height: 360,
              },
              standard: {
                url: 'https://i.ytimg.com/vi/t_x7Cx6vK48/sddefault.jpg',
                width: 640,
                height: 480,
              },
              maxres: {
                url: 'https://i.ytimg.com/vi/t_x7Cx6vK48/maxresdefault.jpg',
                width: 1280,
                height: 720,
              },
            },
            channelTitle: 'SEVENTEEN',
            playlistId: 'UUfkXDY7vwkcJ8ddFGz8KusA',
            position: 1,
            resourceId: {
              kind: 'youtube#video',
              videoId: 't_x7Cx6vK48',
            },
          },
          contentDetails: {
            videoId: 't_x7Cx6vK48',
            videoPublishedAt: '2020-11-29T12:59:57Z',
          },
        },
        {
          kind: 'youtube#playlistItem',
          etag: 'qLLeGQ8PrNBkYVyKIEWkQcj-mng',
          id: 'VVVma1hEWTd2d2tjSjhkZEZHejhLdXNBLjAxNzIwOEZBQTg1MjMzRjk=',
          snippet: {
            publishedAt: '2020-11-26T05:29:18Z',
            channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA',
            title: '[GOING MOMENT] 세븐틴은 아무 잘못이 없습니다🤭',
            description:
              '[GOING MOMENT] 세븐틴은 아무 잘못이 없습니다🤭\n\n월간 세븐틴 11월 호 호스트 조슈아의 외침\n"이건 내가 봤을 때 아무도 못 살려!!"\n\n맞습니다, 세븐틴은 아무 잘못이 없습니다\n그리고 콘텐츠는 폭파되었습니다...💥\n\nFULL ▶ https://youtu.be/Mq6hMskza_c\n\n#세븐틴 #SEVENTEEN\n#GOING_SVT',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/tMVxuuBqvD0/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/tMVxuuBqvD0/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/tMVxuuBqvD0/hqdefault.jpg',
                width: 480,
                height: 360,
              },
              standard: {
                url: 'https://i.ytimg.com/vi/tMVxuuBqvD0/sddefault.jpg',
                width: 640,
                height: 480,
              },
              maxres: {
                url: 'https://i.ytimg.com/vi/tMVxuuBqvD0/maxresdefault.jpg',
                width: 1280,
                height: 720,
              },
            },
            channelTitle: 'SEVENTEEN',
            playlistId: 'UUfkXDY7vwkcJ8ddFGz8KusA',
            position: 2,
            resourceId: {
              kind: 'youtube#video',
              videoId: 'tMVxuuBqvD0',
            },
          },
          contentDetails: {
            videoId: 'tMVxuuBqvD0',
            videoPublishedAt: '2020-11-26T09:00:28Z',
          },
        },
        {
          kind: 'youtube#playlistItem',
          etag: 'VWq1Vat405beRqVhxrZyGJsNZJo',
          id: 'VVVma1hEWTd2d2tjSjhkZEZHejhLdXNBLjUyMTUyQjQ5NDZDMkY3M0Y=',
          snippet: {
            publishedAt: '2020-11-23T06:39:26Z',
            channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA',
            title: "[INSIDE SEVENTEEN] 徐明浩 THE 8 - '本' Making Film",
            description:
              "[INSIDE SEVENTEEN] 徐明浩 THE 8 - '本' Making Film\n \n#디에잇 #THE8\n#SEVENTEEN #세븐틴\n#INSIDE_SVT",
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/wisC7kYM8Ug/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/wisC7kYM8Ug/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/wisC7kYM8Ug/hqdefault.jpg',
                width: 480,
                height: 360,
              },
              standard: {
                url: 'https://i.ytimg.com/vi/wisC7kYM8Ug/sddefault.jpg',
                width: 640,
                height: 480,
              },
              maxres: {
                url: 'https://i.ytimg.com/vi/wisC7kYM8Ug/maxresdefault.jpg',
                width: 1280,
                height: 720,
              },
            },
            channelTitle: 'SEVENTEEN',
            playlistId: 'UUfkXDY7vwkcJ8ddFGz8KusA',
            position: 3,
            resourceId: {
              kind: 'youtube#video',
              videoId: 'wisC7kYM8Ug',
            },
          },
          contentDetails: {
            videoId: 'wisC7kYM8Ug',
            videoPublishedAt: '2020-11-24T08:59:57Z',
          },
        },
        {
          kind: 'youtube#playlistItem',
          etag: 'MyVAy5zZcrE4T35JuihqmYcUSVk',
          id: 'VVVma1hEWTd2d2tjSjhkZEZHejhLdXNBLjA5MDc5NkE3NUQxNTM5MzI=',
          snippet: {
            publishedAt: '2020-11-23T10:26:37Z',
            channelId: 'UCfkXDY7vwkcJ8ddFGz8KusA',
            title: '[GOING SEVENTEEN 2020] EP.39 CARNIVAL',
            description:
              '[GOING SEVENTEEN 2020] EP.39 CARNIVAL\n\n조슈아 무죄 제작진 유죄👊\n별안간 날아든 호스트의 살인예고..😂\n\n면목없는 제작진과 극대노한 세븐틴\n월간 세븐틴 11월 호 촬영장에서 대체 무슨 일이⁉\n\nJOSHUA: not guilty. Staff: guilty as charged👊\nHost unveils murder plans out of the blue...😂\n\nSEVENTEEN rages while production staff hangs their heads in shame\nWhat in the world happened at the "SEVENTEEN Monthly" November issue set?\n\n#세븐틴 #SEVENTEEN\n#GOING_SVT',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/Mq6hMskza_c/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/Mq6hMskza_c/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/Mq6hMskza_c/hqdefault.jpg',
                width: 480,
                height: 360,
              },
              standard: {
                url: 'https://i.ytimg.com/vi/Mq6hMskza_c/sddefault.jpg',
                width: 640,
                height: 480,
              },
              maxres: {
                url: 'https://i.ytimg.com/vi/Mq6hMskza_c/maxresdefault.jpg',
                width: 1280,
                height: 720,
              },
            },
            channelTitle: 'SEVENTEEN',
            playlistId: 'UUfkXDY7vwkcJ8ddFGz8KusA',
            position: 4,
            resourceId: {
              kind: 'youtube#video',
              videoId: 'Mq6hMskza_c',
            },
          },
          contentDetails: {
            videoId: 'Mq6hMskza_c',
            videoPublishedAt: '2020-11-23T13:09:57Z',
          },
        },
      ];

      Video.registerBulk(videos)
        .then((response) => {
          expect(response.length).toEqual(5);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
