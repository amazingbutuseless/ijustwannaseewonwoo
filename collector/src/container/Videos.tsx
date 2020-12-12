import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { fetchVideos, selectAllVideos, selectVideosByChannel } from '../actions/videos';
import VideoItem from '../components/VideoItem';

const VideoItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Videos() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelId } = useParams();

  const videoItems = useSelector(selectAllVideos);

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

  const VideoItems = () => {
    if (['idle', 'pending'].includes(videoStatus)) {
      return <div>loading...</div>;
    }

    if (videoStatus === 'succeeded') {
      return (
        <VideoItemsWrapper>
          {videoItems.map(({ videoId, title, thumbnail, publishedAt, channel }) => {
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
      );
    }

    return <></>;
  };

  return (
    <>
      <h2>{channelId} Videos</h2>
      <VideoItems />
    </>
  );
}
