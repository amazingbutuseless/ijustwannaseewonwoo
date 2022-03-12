import API from 'config/amplify';

export async function fetchRecentlyAddedVideos() {
  const { data } = await API.graphql({
    query: `
  query listVideos {
    listVideos(where: {}, sort: [publishedAt_DESC], limit: 12) {
      data {
        videoId
        title
        publishedAt
        thumbnails {
          standard
          high
          maxres
        }
        channel
      }
    }
  }`,
  });

  return data?.listVideos?.data;
}

export async function getById(videoId: string) {
  const { data } = await API.graphql({
    query: `
    query getVideo($videoId: String) {
      getVideo(where: { videoId: $videoId }) {
        data {
          id
          title
          forWonwoo
        }
      }
    }`,
    variables: {
      videoId,
    },
  });

  return data?.getVideo?.data || {};
}
