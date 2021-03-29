import React, { ReactElement, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPlaylist,
  updateMetadata,
  selectPlaylistById,
  fetchPlaylistVideos,
} from '../playlists/playlistsSlice';

import Header from '../../components/Header';
import MoreVideosButton from '../../components/MoreVideosButton';

import VideoItems from './VideoItems';

interface VideoListForPlaylistUrlParams {
  playlistId: string;
}

export default function VideoListForPlaylist(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const { playlistId }: VideoListForPlaylistUrlParams = useParams();

  const playlist = useSelector((state) => selectPlaylistById(state, playlistId));

  useEffect(() => {
    if (!playlist || typeof playlist.ytVideos === 'undefined') {
      dispatch(fetchPlaylist({ playlistId }));
    }
  }, [playlistId]);

  const onVideoItemClick = (selectedVideoId: string, videoTitle: string) => {
    history.push({
      pathname: `/video/${selectedVideoId}`,
      state: {
        title: videoTitle,
      },
    });
  };

  const hasNextPage = () => {
    return playlist && playlist.pageToken?.length > 0;
  };

  const updateList = async () => {
    const { ytVideos, pageToken, numOfVideos } = await fetchPlaylistVideos({
      playlistId,
      pageToken: playlist.pageToken,
    });

    dispatch(
      updateMetadata({
        id: playlistId,
        pageToken,
        numOfVideos,
        ytVideos: playlist.ytVideos.concat(ytVideos),
      })
    );
  };

  return (
    <>
      <Header title={playlist?.title} />

      {playlist?.ytVideos && <VideoItems items={playlist.ytVideos} onClick={onVideoItemClick} />}

      <MoreVideosButton
        current={playlist?.ytVideos?.length || 0}
        total={playlist?.numOfVideos || 0}
        onClick={hasNextPage() ? updateList : undefined}
      />
    </>
  );
}
