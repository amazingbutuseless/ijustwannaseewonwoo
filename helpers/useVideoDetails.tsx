import useSWR from 'swr';

import { getById } from 'api/video';

export default function useVideoDetails(videoId: string) {
  const { data: videoData, error } = useSWR(`/video/${videoId}`, () => getById(videoId)());

  const video = videoData?.getVideo?.data || {};

  return {
    video: {
      ...video,
      scenes: videoData?.listScenes?.data || [],
    },
    isLoading: !video && !error,
  };
}
