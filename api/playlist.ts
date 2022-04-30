export interface FetchListResponse {
  listPlaylists: { data: Playlist.Entities[] };
}

export interface GetByAliasResponse {
  getPlaylists: { data: Playlist.Entities };
}

export const Queries = {
  fetchList: `
listPlaylists {
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
}`,
  getByAlias: `
query getPlaylists($alias: String) {
  getPlaylists(where: { alias: $alias }) {
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
};
