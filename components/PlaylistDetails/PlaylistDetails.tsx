import { Container, Typography } from '@mui/material';

import * as Styled from './style';

export default function PlaylistDetails({
  coverImg,
  title,
  description,
  children,
}: React.PropsWithChildren<Playlist.Entities>) {
  return (
    <main>
      <Styled.PlaylistCover data-cover={coverImg}>
        <Container>
          <Typography variant="h1" component="h2">
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          )}
        </Container>
      </Styled.PlaylistCover>

      {children}
    </main>
  );
}
