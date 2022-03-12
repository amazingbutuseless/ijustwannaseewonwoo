import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import Link from 'next/link';

import PlaylistDetails from 'components/PlaylistDetails';
import { Wrapper } from './style';

export interface Props {
  playlist: Playlist.Entities[];
}

export default function PlaylistSection({ playlist }: Props) {
  const { t } = useTranslation('home');

  return (
    <Wrapper>
      <h2>{t('section.playlists')}</h2>

      <Slider dots={true} infinite={true} speed={3000}>
        {playlist.map((item) => {
          return (
            <section key={item.playlistId}>
              <PlaylistDetails {...item} headingLevel={3} button={<Link href={`/playlist/${item.alias}`}>Go!</Link>} />
            </section>
          );
        })}
      </Slider>
    </Wrapper>
  );
}
