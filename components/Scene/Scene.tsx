import React, { useCallback } from 'react';
import { CardActions, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, Link } from '@mui/icons-material';

import { formatSecondsToMmss, formatSecondsToDuration } from 'helpers/time';

import { SceneWrapper, ClickArea } from './style';

interface Props extends Omit<Video.Scene, 'id'> {
  onClick: (startTime: number, endTime: number) => void;
  onShareButtonClick: (startTime: number) => void;
}

const Scene = React.forwardRef(
  (
    { thumbnailUrl, startTime, endTime, onClick, onShareButtonClick }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const handleClick = useCallback(() => {
      onClick(startTime, endTime);
    }, []);

    const handleShareButtonClick = useCallback(() => {
      onShareButtonClick(startTime);
    }, []);

    return (
      <SceneWrapper>
        <Box sx={{ display: 'flex' }}>
          <ClickArea onClick={handleClick} ref={ref}>
            <CardMedia image={thumbnailUrl} />
            <CardContent>
              {formatSecondsToMmss(startTime)}
              <Typography variant="caption"> ({formatSecondsToDuration(endTime - startTime)})</Typography>
            </CardContent>
          </ClickArea>
          <CardActions>
            <IconButton>
              <FavoriteBorder />
            </IconButton>
            <IconButton onClick={handleShareButtonClick}>
              <Link />
            </IconButton>
          </CardActions>
        </Box>
      </SceneWrapper>
    );
  }
);
Scene.displayName = 'Scene';

export default Scene;
