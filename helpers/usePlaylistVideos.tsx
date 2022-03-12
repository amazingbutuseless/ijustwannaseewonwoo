import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import { fetchVideos } from 'api/playlist';

export default function usePlaylistVideos(playlistId: string) {
  const getFetchVideoKey = useCallback((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.nextPageToken) return null;

    if (pageIndex === 0) return `/playlist/${playlistId}`;

    return `/playlist/${playlistId}?pageToken=${previousPageData.nextPageToken}`;
  }, []);

  const { data, error, size, setSize } = useSWRInfinite(getFetchVideoKey, fetchVideos);
  const isLoading = !data && !error;

  const onShowMoreButtonClick = useCallback(() => {
    setSize(size + 1);
  }, []);

  const videos = useMemo(() => data?.map((response) => response.items).flat() || [], [data]);

  return {
    isLoading,
    videos,
    showMoreButton: data?.[data.length - 1]?.nextPageToken,
    onShowMoreButtonClick,
  };
}
