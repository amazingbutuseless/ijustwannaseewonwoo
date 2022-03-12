import React from 'react';
import { CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';

import * as Styled from './style';

interface Props extends Video.Video, Video.WithPublishedAt, Video.WithThumbnails {
  title: string;
  channel?: string;
  forWonwoo?: boolean;
  onClick: (videoId: string, title: string) => void;
}

export default function Video({ videoId, title, publishedAt, thumbnails, onClick, forWonwoo = false, channel }: Props) {
  const handleClick = () => {
    onClick(videoId, title);
  };

  return (
    <Styled.Wrapper>
      <CardActionArea onClick={handleClick}>
        <div style={{ position: 'relative' }}>
          {forWonwoo && <Styled.ForWonwoo />}
          <CardMedia
            component="img"
            src={thumbnails.high}
            srcSet={`${thumbnails.high}, ${thumbnails.standard} 2x, ${thumbnails.maxres} 3x`}
            alt={title}
            loading="lazy"
          />
        </div>

        <CardContent>
          <Typography variant="body2" gutterBottom={true}>
            {title}
          </Typography>
          <div>
            <Typography variant="caption">{channel}</Typography> ・{' '}
            <Typography variant="caption">{dayjs(publishedAt).format('YYYY.MM.DD')}</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Styled.Wrapper>
  );
}
