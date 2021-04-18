import React, { ReactElement, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { RootState } from '../../store';

import {
  fetchPlaylist,
  updateMetadata,
  selectPlaylistById,
  fetchPlaylistVideos,
  PlaylistVideos,
  FetchPlaylistVideosParams,
} from '../playlists/playlistsSlice';

import Header from '../../components/Header';
import MoreVideosButton from '../../components/MoreVideosButton';

import VideoItems from './VideoItems';

interface VideoListForPlaylistUrlParams {
  playlistId: string;
}

export default function VideoListForPlaylist(): ReactElement {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { playlistId }: VideoListForPlaylistUrlParams = useParams();

  const playlist = useAppSelector((state: RootState) => selectPlaylistById(state, playlistId));

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
        playlistId,
      },
    });
  };

  const hasNextPage = () => {
    return playlist && playlist.pageToken?.length > 0;
  };

  const updateList = async () => {
    const params: FetchPlaylistVideosParams = {
      playlistId,
      pageToken: playlist.pageToken,
    };

    if (playlist.videos.length > 0) {
      params.lastVideoPublishedAt = playlist.videos[playlist.videos.length - 1].publishedAt;
    }

    const { ytVideos, videos, pageToken, numOfVideos } = await fetchPlaylistVideos(params);

    const metadata: PlaylistVideos = {
      id: playlistId,
      pageToken,
      numOfVideos,
      ytVideos: playlist.ytVideos.concat(ytVideos),
    };

    if (videos) {
      metadata.videos = playlist.videos.concat(videos);
    }

    dispatch(updateMetadata(metadata));
  };

  return (
    <>
      <Header title={playlist?.title} />

      {playlist?.ytVideos && (
        <VideoItems
          items={playlist.ytVideos}
          sceneRegisteredVideos={playlist.videos}
          onClick={onVideoItemClick}
        />
      )}

      <MoreVideosButton
        current={playlist?.ytVideos?.length || 0}
        total={playlist?.numOfVideos || 0}
        onClick={hasNextPage() ? updateList : undefined}
      />
    </>
  );
}
