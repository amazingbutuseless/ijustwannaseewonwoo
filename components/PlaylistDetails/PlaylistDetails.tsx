import { ReactElement } from 'react';
import { Container, Typography } from '@mui/material';
import { LinkProps } from 'next/link';

import * as Styled from './style';

interface Props extends Playlist.Entities {
  headingLevel?: 2 | 3;
  button?: ReactElement<LinkProps>;
}

export default function PlaylistDetails({
  coverImg,
  portraitCoverImg,
  title,
  description,
  titleColor,
  descriptionColor,
  children,
  headingLevel = 2,
  button,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <Styled.PlaylistCover landscape={coverImg} portrait={portraitCoverImg}>
        <Container>
          <Typography
            variant="h1"
            component={`h${headingLevel}`}
            style={{ color: titleColor || 'var(--playlist-title-color)' }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body1"
              component="p"
              style={{ color: descriptionColor || 'var(--playlist-description-color)' }}
            >
              {description}
            </Typography>
          )}
          {button}
        </Container>
      </Styled.PlaylistCover>

      {children}
    </>
  );
}
