import { Grid, Container } from '@mui/material';

import Video from 'components/Video';

interface Props {
  heading?: React.ReactElement;
  isLoading: boolean;
  videos: Video[];
  onVideoClick: (videoId: string, title: string) => void;
}

export default function VideoSection({ heading, isLoading, videos, onVideoClick }: Props) {
  return (
    <Container component="section">
      {heading}

      <Grid container spacing={3} wrap="wrap">
        {isLoading && <>Loading...</>}
        {!isLoading &&
          videos.map((video) => {
            return (
              <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={video.id}>
                <Video
                  videoId={video.videoId}
                  title={video.title}
                  publishedAt={new Date(video.publishedAt).toISOString()}
                  thumbnails={video.thumbnails}
                  channel={video.channel}
                  onClick={onVideoClick}
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
