import { Typography, Grid, Container } from '@mui/material';

import Video from 'components/Video';

interface Props {
  title?: string;
  isLoading: boolean;
  videos: Video[];
  onClick: (videoId: string) => void;
}

export default function VideoSection({ title, isLoading, videos, onClick }: Props) {
  return (
    <Container component="section">
      <Typography variant="h3" style={{ display: title ? 'block' : 'none' }}>
        {title || 'Videos'}
      </Typography>

      <Grid container spacing={3} wrap="wrap">
        {isLoading && <>Loading...</>}
        {!isLoading &&
          videos.map((video) => {
            return (
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={video.id}>
                <Video
                  videoId={video.id}
                  title={video.snippet.title}
                  publishedAt={new Date(video.snippet.publishedAt).toISOString()}
                  thumbnails={video.snippet.thumbnails}
                  channel={video.snippet.videoOwnerChannelTitle}
                  onClick={() => {
                    onClick(video.snippet.resourceId.videoId);
                  }}
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
