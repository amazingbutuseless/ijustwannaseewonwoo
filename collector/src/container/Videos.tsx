import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchVideos, selectAllVideos, selectVideosByChannel } from '../actions/videos';
import VideoItem from '../components/VideoItem';
import { VideoItemsWrapper } from './Videos.style';

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

  return (
    <>
      {['idle', 'pending'].includes(videoStatus) && <div>loading...</div>}

      {videoStatus === 'succeeded' && (
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
      )}
    </>
  );
}
