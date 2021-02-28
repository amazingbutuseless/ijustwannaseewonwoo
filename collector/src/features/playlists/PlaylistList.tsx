import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlaylists, selectAllPlaylists } from './playlistsSlice';

import { PlaylistListWrapper, PlaylistListItems } from './PlaylistList.style';

import PlaylistItem from './PlaylistItem';

export default function PlaylistList() {
  const dispatch = useDispatch();
  const [lastPlaylistId, updateLastPlaylistId] = useState('');

  const playlists = useSelector(selectAllPlaylists);
  const playlistStatus = useSelector((state) => state.playlists.status);

  useEffect(() => {
    if (playlistStatus === 'idle') {
      dispatch(fetchPlaylists({ lastId: lastPlaylistId }));
    }
  }, [playlistStatus, dispatch]);

  return (
    <PlaylistListWrapper>
      <h2>Playlist</h2>

      {['idle', 'loading'].includes(playlistStatus) && <div>loading...</div>}

      <PlaylistListItems>
        {playlistStatus === 'succeeded' &&
          playlists.map((playlist) => <PlaylistItem key={playlist.id} {...playlist} />)}
      </PlaylistListItems>
    </PlaylistListWrapper>
  );
}
