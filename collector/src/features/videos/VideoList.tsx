import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { fetchVideos, selectAllVideos, selectVideosByChannel } from './videosSlice';

import LoadingAnimation from '../../components/LoadingAnimation';
import Header from '../../components/Header';
import VideoItems from './VideoItems';

interface VideoRouterParams {
  channelId?: string;
  playlistId?: string;
}

export default function VideoList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { channelId }: VideoRouterParams = useParams();

  const videoItems = useAppSelector((state) => {
    if (typeof channelId !== 'undefined') {
      return selectVideosByChannel(state, channelId);
    } else {
      return selectAllVideos(state);
    }
  });

  const videoStatus = useAppSelector((state) => state.videos.status);

  useEffect(() => {
    if (videoStatus === 'idle') {
      dispatch(fetchVideos({ channelId: channelId || '', lastId: '' }));
    }
  }, [videoStatus]);

  const onVideoItemClick = (selectedVideoId: string) => {
    history.push(`/video/${selectedVideoId}`);
  };

  return (
    <>
      <Header title={''} />

      {videoStatus !== 'succeeded' && <LoadingAnimation />}

      {videoStatus === 'succeeded' && <VideoItems items={videoItems} onClick={onVideoItemClick} />}
    </>
  );
}
