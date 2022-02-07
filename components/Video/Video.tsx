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
            srcSet={`${thumbnails.high.url} 1x, ${thumbnails.standard.url} 2x, ${thumbnails.maxres.url} 3x`}
            alt={title}
            loading="lazy"
          />
        </div>

        <CardContent>
          <Typography variant="h3" gutterBottom={true}>
            {title}
          </Typography>
          <Typography variant="body2">{channel}</Typography>
          <Typography variant="body1">{dayjs(publishedAt).format('YYYY.MM.DD')}</Typography>
        </CardContent>
      </CardActionArea>
    </Styled.Wrapper>
  );
}
