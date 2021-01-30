import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchVideos, selectAllVideos, selectVideosByChannel } from './videosSlice';

import Header from '../../container/Header';
import VideoItem from '../../components/VideoItem';
import { VideoItemsWrapper } from './VideoList.style';

interface VideoRouterParams {
  channelId: string;
}

export default function VideoList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelId }: VideoRouterParams = useParams();

  const videoItems = useSelector((state) => {
    if (typeof channelId !== 'undefined') {
      return selectVideosByChannel(state, channelId);
    } else {
      return selectAllVideos(state);
    }
  });

  const videoStatus = useSelector((state) => {
    return state.videos.status;
  });
  const error = useSelector((state) => state.videos.error);

  useEffect(() => {
    if (videoStatus === 'idle') {
      dispatch(fetchVideos({ channelId: channelId || '', lastId: '' }));
    }
  }, [videoStatus, dispatch]);

  const onClick = (selectedVideoId: string) => {
    history.push(`/video/${selectedVideoId}`);
  };

  return (
    <>
      <Header />
      {['idle', 'pending'].includes(videoStatus) && <div>loading...</div>}

      {videoStatus === 'succeeded' && (
        <VideoItemsWrapper>
          {videoItems.map((video) => {
            const { videoId, title, thumbnail, publishedAt, channel } = video;

            return (
              <VideoItem
                key={videoId}
                videoId={videoId}
                title={title}
                thumbnail={thumbnail}
                publishedAt={publishedAt}
                channel={channel}
                onClick={onClick}
              />
            );
          })}
        </VideoItemsWrapper>
      )}
    </>
  );
}
