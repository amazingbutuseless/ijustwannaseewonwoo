import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

import PlaylistDetails from 'components/PlaylistDetails';

import * as Styled from './style';

export interface Props {
  playlist: Playlist.Entities[];
}

const GoButton = React.forwardRef(
  ({ onClick, href }: React.HTMLProps<HTMLAnchorElement>, ref: React.LegacyRef<HTMLAnchorElement>) => {
    return (
      <Styled.GoButtonFace href={href} onClick={onClick} ref={ref}>
        Go
        <ArrowForwardIcon />
      </Styled.GoButtonFace>
    );
  }
);
GoButton.displayName = 'GoButton';

export default function PlaylistSection({ playlist }: Props) {
  const { t } = useTranslation('home');

  return (
    <Styled.Wrapper>
      <h2>{t('section.playlists')}</h2>

      <Slider dots={true} infinite={true} speed={3000}>
        {playlist.map((item) => {
          return (
            <PlaylistDetails
              key={item.playlistId}
              {...item}
              headingLevel={3}
              button={
                <Link href={`/playlist/${item.alias}`} passHref>
                  <GoButton />
                </Link>
              }
            />
          );
        })}
      </Slider>
    </Styled.Wrapper>
  );
}
