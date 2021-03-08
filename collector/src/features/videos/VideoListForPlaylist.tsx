import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlaylist, selectPlaylistById } from '../playlists/playlistsSlice';

import YoutubeAPI from '../../utils/youtube_api';

import Header from '../../components/Header';
import LoadingAnimation from '../../components/LoadingAnimation';
import VideoItems from './VideoItems';
import { IVideoItemWithChannel } from '../../types';

interface fetchPlaylistVideosParams {
  playlistId: string;
  pageToken?: string;
}

async function fetchVideos({ playlistId, pageToken = '' }: fetchPlaylistVideosParams) {
  const response = await YoutubeAPI.listPlaylistItem({ playlistId, pageToken });

  const videos = response.result.items.map((item) => {
    const { channelId, playlistId, title, publishedAt } = item.snippet;

    return {
      id: 'video',
      channelId,
      playlistId,
      videoId: item.contentDetails.videoId,
      title,
      publishedAt,
      thumbnail: item.snippet.thumbnails.high,
      scenes: [],
    };
  });

  return {
    videos,
    pageToken: response.result.nextPageToken,
  };
}

export default function VideoListForPlaylist() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { playlistId } = useParams();

  const playlist = useSelector((state) => selectPlaylistById(state, playlistId));

  const [pageToken, updatePageToken] = useState('');
  const [videos, updateVideos] = useState<Array<IVideoItemWithChannel>>([]);

  useEffect(() => {
    if (!playlist) {
      dispatch(fetchPlaylist({ playlistId }));
    }
    updateList();
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
    return playlist && pageToken?.length > 0;
  };

  const updateList = async () => {
    const { videos: updatedVideos, pageToken: newPageToken } = await fetchVideos({
      playlistId,
      pageToken,
    });

    updateVideos(videos.concat(updatedVideos));
    updatePageToken(newPageToken);
  };

  return (
    <>
      <Header title={playlist?.title} />

      <VideoItems items={videos} onClick={onVideoItemClick} />

      {hasNextPage() && <button onClick={updateList}>next page</button>}
    </>
  );
}
