import React, { ReactElement, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlaylist, selectPlaylistById } from '../playlists/playlistsSlice';

import YoutubeAPI from '../../utils/youtube_api';

import Header from '../../components/Header';
import VideoItems from './VideoItems';
import { IVideoItemWithChannel } from '../../types';

import MoreVideosButton from '../../components/MoreVideosButton';

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
    };
  });

  return {
    videos,
    pageToken: response.result.nextPageToken,
    pageInfo: response.result.pageInfo,
  };
}

export default function VideoListForPlaylist(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const { playlistId } = useParams();

  const playlist = useSelector((state) => selectPlaylistById(state, playlistId));

  const [pageToken, updatePageToken] = useState('');
  const [videos, updateVideos] = useState<Array<IVideoItemWithChannel>>([]);
  const [totalVideos, updateTotalVideos] = useState(0);

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
    const { videos: updatedVideos, pageToken: newPageToken, pageInfo } = await fetchVideos({
      playlistId,
      pageToken,
    });

    updateVideos(videos.concat(updatedVideos));
    updatePageToken(newPageToken);
    updateTotalVideos(pageInfo.totalResults);
  };

  return (
    <>
      <Header title={playlist?.title} />

      <VideoItems items={videos} onClick={onVideoItemClick} />

      {hasNextPage() && (
        <MoreVideosButton current={videos.length} total={totalVideos} onClick={updateList} />
      )}
    </>
  );
}
