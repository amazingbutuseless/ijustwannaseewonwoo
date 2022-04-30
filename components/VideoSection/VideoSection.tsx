import { Container, Grid } from '@mui/material';

import Video from 'components/Video';
interface Props {
  heading?: React.ReactElement;
  videos: Video.Entities[];
  onVideoClick: (videoId: string, title: string) => void;
}

export default function VideoSection({ heading, videos, onVideoClick }: Props) {
  return (
    <Container component="section">
      {heading}

      <Grid container spacing={3} wrap="wrap">
        {videos.map((video) => {
          return (
            <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={video.videoId}>
              <Video {...video} publishedAt={new Date(video.publishedAt).toISOString()} onClick={onVideoClick} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
