import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

import PlaylistDetails from 'components/PlaylistDetails';

import * as Styled from './style';

export interface Props {
  playlist: Playlist.Entities[];
}

export default function PlaylistSection({ playlist }: Props) {
  const { t } = useTranslation('home');

  return (
    <Styled.Wrapper>
      <h2>{t('section.playlists')}</h2>

      <Slider dots={true} arrows={false} fade={true} speed={500} autoplay={true} autoplaySpeed={3000}>
        {playlist.map((item) => {
          return <PlaylistDetails key={item.playlistId} {...item} headingLevel={3} button={true} />;
        })}
      </Slider>
    </Styled.Wrapper>
  );
}
