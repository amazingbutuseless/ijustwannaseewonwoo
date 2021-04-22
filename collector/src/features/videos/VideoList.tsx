import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks';

import { fetchVideos, selectAllVideos } from './videosSlice';

import { VideoListWrapper, VideoItemsContainer } from './VideoList.style';

import VideoItem from '../../components/VideoItem';

interface VideoRouterParams {
  channelId?: string;
  playlistId?: string;
}

export default function VideoList() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [lastVideoId, setLastVideoId] = useState('');

  const videoItems = useAppSelector(selectAllVideos);
  const videoStatus = useAppSelector((state) => state.videos.status);

  useEffect(() => {
    if (videoStatus === 'idle') {
      dispatch(fetchVideos({ lastId: lastVideoId }));
    }
  }, [videoStatus]);

  const onVideoItemClick = (videoId: string, title: string) => {
    history.push(`/video/${videoId}`, {
      title,
      depths: [
        {
          title: 'Video',
          path: '/video',
        },
        {
          title,
          path: null,
        },
      ],
    });
  };

  return (
    <VideoListWrapper>
      <VideoItemsContainer>
        {videoItems.map((video) => {
          const { videoId, title, publishedAt, thumbnail } = video;
          return (
            <VideoItem
              videoId={videoId}
              title={title}
              publishedAt={publishedAt}
              thumbnail={thumbnail.url}
              onClick={onVideoItemClick}
              forWonwoo={false}
            />
          );
        })}
      </VideoItemsContainer>
    </VideoListWrapper>
  );
}
