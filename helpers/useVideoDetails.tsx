import useSWR from 'swr';

import { fetchScenesByVideoId } from 'api/scene';
import { getById } from 'api/video';

export default function useVideoDetails(videoId: string) {
  const { data: videoData, error } = useSWR(`/video/${videoId}`, () => getById(videoId)());
  const video = videoData?.getVideo?.data || {};

  const { data: scenesData } = useSWR(`/video/${videoId}/scenes`, () => fetchScenesByVideoId(videoId)());

  return {
    video: {
      ...video,
      scenes: scenesData?.listScenes?.data || [],
    },
    isLoading: !video && !error,
  };
}
