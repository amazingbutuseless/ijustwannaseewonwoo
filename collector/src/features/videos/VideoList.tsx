import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { fetchVideos, selectAllVideos } from './videosSlice';

import { VideoListWrapper, VideoItemsContainer } from './VideoList.style';

import VideoItem from '../../components/VideoItem';
import MoreVideosButton from '../../components/MoreVideosButton';
import LoadingAnimation from '../../components/LoadingAnimation';

interface VideoRouterParams {
  channelId?: string;
  playlistId?: string;
}

export default function VideoList() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const videoItems = useAppSelector(selectAllVideos);
  const videoStatus = useAppSelector((state) => state.videos.status);

  const [lastVideoId, setLastVideoId] = useState('');
  const [isLoading, updateLoading] = useState(true);

  useEffect(() => {
    if (videoStatus === 'idle') {
      dispatch(fetchVideos({ lastId: '' }));
    } else if (videoStatus === 'succeeded') {
      updateLoading(false);

      if (videoItems.length > 0) {
        const lastId =
          videoItems.length % 30 === 0 ? videoItems[videoItems.length - 1].publishedAt : '';
        setLastVideoId(lastId);
      }
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

  const onMoreVideoButtonClick = () => {
    dispatch(fetchVideos({ lastId: lastVideoId }));
  };

  return (
    <>
      <VideoListWrapper>
        <VideoItemsContainer>
          {videoItems.map((video) => {
            const { videoId, title, publishedAt, thumbnail } = video;

            return (
              <VideoItem
                key={videoId}
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

        {videoItems.length > 0 && lastVideoId && (
          <MoreVideosButton onClick={onMoreVideoButtonClick}>
            <>
              Next{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#9d4edd"
                style={{ verticalAlign: 'middle' }}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
              </svg>
            </>
          </MoreVideosButton>
        )}
      </VideoListWrapper>
      {isLoading && <LoadingAnimation />}
    </>
  );
}
