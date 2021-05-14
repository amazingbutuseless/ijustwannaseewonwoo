import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAllPlaylists,
  selectPlaylistById,
  fetchPlaylists,
  fetchPlaylist,
  fetchPlaylistVideos,
  getVideosIds,
  updateMetadata,
  PlaylistVideos,
  FetchPlaylistVideosParams,
} from './playlistsSlice';

import PlaylistList from '../../components/PlaylistList';
import PlaylistVideosContainer from '../../components/PlaylistVideosContainer';

import { PlaylistContainer, PlaylistListWrapper, PlaylistVideosWrapper } from './Playlist.style';
import LoadingAnimation from '../../components/LoadingAnimation';

interface PlaylistUrlParams {
  playlistId?: string;
}

export default function Playlist() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { playlistId }: PlaylistUrlParams = useParams();

  const [lastPlaylistId, setLastPlaylistId] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [isLoading, updateLoading] = useState(true);

  const playlists = useAppSelector(selectAllPlaylists);
  const playlistStatus = useAppSelector((state) => state.playlists.status);
  const selectedPlaylist = useAppSelector((state) => selectPlaylistById(state, selectedPlaylistId));

  const hasSelectedPlaylistFetched = () => {
    return typeof selectedPlaylist?.ytVideos !== 'undefined';
  };

  const havePlaylistLoadedButNoPlaylistSelected = () => {
    return (
      playlistStatus.playlists === 'succeeded' && playlists.length > 0 && selectedPlaylistId === ''
    );
  };

  const doesSelectedPlaylistHaveMoreYtVideos = () => {
    return selectedPlaylist && selectedPlaylist.pageToken?.length > 0;
  };

  const onVideoClick = (videoId: string, title: string) => {
    history.push(`/video/${videoId}`, {
      title,
      playlistId: selectedPlaylistId,
      depths: [
        { title: 'Playlist', path: '/playlist' },
        { title: selectedPlaylist.title, path: `/playlist/${selectedPlaylistId}` },
        { title: title, path: null },
      ],
    });
  };

  const onMoreVideosButtonClick = () => {
    if (doesSelectedPlaylistHaveMoreYtVideos()) {
      updateVideoList();
    }
  };

  const updateVideoList = async () => {
    const params: FetchPlaylistVideosParams = {
      playlistId: selectedPlaylistId,
      pageToken: selectedPlaylist.pageToken,
    };

    if (selectedPlaylist.videos.length > 0) {
      params.lastVideoPublishedAt =
        selectedPlaylist.videos[selectedPlaylist.videos.length - 1].publishedAt;
    }

    const { ytVideos, videos, pageToken, numOfVideos } = await fetchPlaylistVideos(params);

    const metadata: PlaylistVideos = {
      id: selectedPlaylistId,
      pageToken,
      numOfVideos,
      ytVideos: selectedPlaylist.ytVideos.concat(ytVideos),
    };

    if (videos) {
      metadata.videos = selectedPlaylist.videos.concat(videos);
    }

    dispatch(updateMetadata(metadata));
  };

  useEffect(() => {
    if (playlistStatus.playlists === 'idle') {
      dispatch(fetchPlaylists({ lastId: lastPlaylistId }));
    } else if (playlistId) {
      setSelectedPlaylistId(playlistId);
    } else if (havePlaylistLoadedButNoPlaylistSelected()) {
      setSelectedPlaylistId(playlists[0].id);
    }
  }, [playlistStatus.playlists]);

  useEffect(() => {
    if (playlistStatus.playlists === 'succeeded' && playlistStatus.playlist === 'succeeded') {
      updateLoading(false);
    }
  }, [playlistStatus]);

  useEffect(() => {
    if (selectedPlaylistId.length < 1) return;

    if (!selectedPlaylist || !hasSelectedPlaylistFetched()) {
      dispatch(fetchPlaylist({ playlistId: selectedPlaylistId }));
      return;
    }

    const lastRegisteredVideo =
      selectedPlaylist.videos.length > 0
        ? selectedPlaylist.videos[selectedPlaylist.videos.length - 1].publishedAt
        : '';
    getVideosIds(selectedPlaylistId, lastRegisteredVideo).then((updatedRegisteredVideos) => {
      dispatch(
        updateMetadata({
          ...selectedPlaylist,
          videos: selectedPlaylist.videos.concat(updatedRegisteredVideos),
        })
      );
    });
  }, [selectedPlaylistId]);

  return (
    <>
      <PlaylistContainer>
        <PlaylistListWrapper>
          {playlistStatus.playlists === 'succeeded' && (
            <PlaylistList
              playlists={playlists}
              activeId={selectedPlaylistId}
              onClick={setSelectedPlaylistId}
            />
          )}
        </PlaylistListWrapper>
        <PlaylistVideosWrapper>
          {hasSelectedPlaylistFetched() && (
            <PlaylistVideosContainer
              playlist={selectedPlaylist}
              onVideoClick={onVideoClick}
              onMoreVideosButtonClick={onMoreVideosButtonClick}
            />
          )}
        </PlaylistVideosWrapper>
      </PlaylistContainer>
      {isLoading && <LoadingAnimation />}
    </>
  );
}
