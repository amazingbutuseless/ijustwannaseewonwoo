import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlaylist, selectPlaylistById } from '../playlists/playlistsSlice';
import { fetchPlaylistVideos, selectVideosByPlaylist } from './videosSlice';

import useVideoList from './UseVideoList';

export default function VideoListForPlaylist() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();

  const playlist = useSelector((state) => selectPlaylistById(state, playlistId));

  const videoItems = useSelector((state) => selectVideosByPlaylist(state, playlistId));
  const { status: videoStatus, pageToken } = useSelector((state) => {
    return state.videos;
  });

  const updateList = () => {
    dispatch(fetchPlaylistVideos({ playlistId, pageToken }));
  };

  useEffect(() => {
    if (!playlist) dispatch(fetchPlaylist({ playlistId }));
    if (videoStatus === 'idle') updateList();
  }, []);

  return useVideoList(playlist?.title, videoStatus, videoItems, pageToken, updateList);
}
