import React, { CSSProperties } from 'react';
import { Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

import * as Styled from './style';
interface Props extends Playlist.Entities {
  headingLevel?: 2 | 3;
  button?: boolean;
}

export default function PlaylistDetails({
  coverImg,
  portraitCoverImg,
  title,
  description,
  titleColor,
  descriptionColor,
  alias,
  children,
  headingLevel = 2,
  button = false,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <Styled.PlaylistCover
        landscape={coverImg}
        portrait={portraitCoverImg}
        style={
          {
            '--title-color': titleColor || 'var(--playlist-title-color)',
            '--description-color': descriptionColor || 'var(--playlist-description-color)',
          } as CSSProperties
        }
      >
        <Container>
          <Typography variant="h1" component={`h${headingLevel}`}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          )}
          {button && (
            <Link href={`/playlist/${alias}`} passHref>
              <Styled.GoButtonFace>
                Go <ArrowForwardIcon />
              </Styled.GoButtonFace>
            </Link>
          )}
        </Container>
      </Styled.PlaylistCover>

      {children}
    </>
  );
}
