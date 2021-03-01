import React from 'react';
import { useHistory } from 'react-router-dom';

import { IVideoItemWithChannel } from '../../types';

import Header from '../../components/Header';
import LoadingAnimation from '../../components/LoadingAnimation';
import VideoItems from './VideoItems';

export default function useVideoList(
  headerTitle: string,
  videoStatus: string,
  videoItems: Array<IVideoItemWithChannel>,
  pageToken: string,
  updateList: () => void
) {
  const history = useHistory();

  const hasNextPage = () => {
    return typeof pageToken !== 'undefined' && pageToken !== '';
  };

  const onVideoItemClick = (selectedVideoId: string) => {
    history.push(`/video/${selectedVideoId}`);
  };

  return (
    <>
      <Header title={headerTitle} />

      {videoStatus !== 'succeeded' && <LoadingAnimation />}

      {videoStatus === 'succeeded' && <VideoItems items={videoItems} onClick={onVideoItemClick} />}

      {hasNextPage() && <button onClick={updateList}>next page</button>}
    </>
  );
}
