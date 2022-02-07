declare namespace Playlist {
  interface Entities {
    playlistId: string;
    alias: string;
    title: string;
    description?: string;
    coverImg: string;
  }
}

export = Playlist;
export as namespace Playlist;
