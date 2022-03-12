import API, { ENDPOINT } from 'config/amplify';

export function fetchVideos(reqPath: string) {
  return API.get(ENDPOINT.YOUTUBE, reqPath, {});
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

  return data.getPlaylists.data;
}
