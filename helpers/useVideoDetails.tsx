import useSWR from 'swr';

import { fetchScenesByVideoId } from 'api/scene';
import { getById } from 'api/video';

export default function useVideoDetails(videoId: string) {
  const { data: video, error } = useSWR(`/video/${videoId}`, () => getById(videoId));

  const { data: scenes } = useSWR(`/video/${videoId}/scenes`, () => fetchScenesByVideoId(videoId));

  return {
    video: {
      ...video,
      scenes: scenes || [],
    },
    isLoading: !video && !error,
  };
}
