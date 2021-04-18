import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { fetchPlaylists, selectAllPlaylists } from './playlistsSlice';

import { MenuTitle, PlaylistListWrapper, PlaylistListItems } from './PlaylistList.style';

import PlaylistItem from './PlaylistItem';

export default function PlaylistList() {
  const dispatch = useAppDispatch();
  const [lastPlaylistId, updateLastPlaylistId] = useState('');

  const playlists = useAppSelector(selectAllPlaylists);
  const playlistStatus = useAppSelector((state) => state.playlists.status);

  useEffect(() => {
    if (playlistStatus === 'idle') {
      dispatch(fetchPlaylists({ lastId: lastPlaylistId }));
    }
  }, []);

  return (
    <PlaylistListWrapper>
      <MenuTitle>Playlist</MenuTitle>

      {['idle', 'loading'].includes(playlistStatus) && <div>loading...</div>}

      <PlaylistListItems>
        {playlistStatus === 'succeeded' &&
          playlists.map((playlist) => <PlaylistItem key={playlist.id} {...playlist} />)}
      </PlaylistListItems>
    </PlaylistListWrapper>
  );
}
