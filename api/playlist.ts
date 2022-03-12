import API, { ENDPOINT } from 'config/amplify';

export async function fetchVideos(resourceId: string) {
  const playlistVideos = await API.get(ENDPOINT.YOUTUBE, resourceId, {});
  return playlistVideos?.items || [];
}

export async function fetchList() {
  const { data } = await API.graphql({
    query: `{listPlaylists{
      data {
        playlistId
        alias
        title
        description
        coverImg
        portraitCoverImg
        titleColor
        descriptionColor
      }
    }}`,
  });

  return data;
}

export async function getByAlias(alias: string) {
  const { data } = await API.graphql({
    query: `query getPlaylists($getPlaylistsParams: PlaylistsGetWhereInput!) {
      getPlaylists(where: $getPlaylistsParams) {
        data {
          playlistId
          title
          description
          coverImg
          portraitCoverImg
          titleColor
          descriptionColor
        }
      }
    }`,
    variables: {
      getPlaylistsParams: {
        alias,
      },
    },
  });

  return data;
}
