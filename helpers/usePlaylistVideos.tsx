import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import { fetchListByPlaylistId, FetchListByPlaylistIdResponse } from 'api/video';

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export default function usePlaylistVideos(playlistId: string) {
  const getFetchVideoKey = useCallback((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.nextPageToken) return null;

    if (pageIndex === 0) return `/playlist/${playlistId}`;

    return `/playlist/${playlistId}/${previousPageData.nextPageToken}`;
  }, []);

  const { data, error, size, setSize } = useSWRInfinite<FetchListByPlaylistIdResponse>(
    getFetchVideoKey,
    async (reqPath) => {
      const [, , playlistId, pageToken] = reqPath.split('/');
      return fetchListByPlaylistId({
        playlistId,
        pageToken,
      });
    }
  );
  const isLoading = !data && !error;

  const onShowMoreButtonClick = useCallback(() => {
    setSize(size + 1);
  }, []);

  const videos = useMemo(
    () =>
      data
        ?.map((response) =>
          response.items.map((video) => {
            const thumbnails: { [k in Video.ThumbnailResolutions]?: string } = {};
            (Object.entries(video.snippet.thumbnails) as Entries<Video.ItemOfYtApi['snippet']['thumbnails']>).forEach(
              ([key, value]) => {
                thumbnails[key] = value.url;
              }
            );

            return {
              videoId: video.snippet.resourceId.videoId,
              title: video.snippet.title,
              publishedAt: video.snippet.publishedAt,
              thumbnails,
              channel: video.snippet.videoOwnerChannelTitle,
            } as Video.Entities;
          })
        )
        .flat() || [],
    [data]
  );

  return {
    isLoading,
    videos,
    showMoreButton: data?.[data.length - 1]?.nextPageToken,
    onShowMoreButtonClick,
  };
}
