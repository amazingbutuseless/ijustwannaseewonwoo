import React, { useCallback } from 'react';
import { CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { formatSecondsToMmss, formatSecondsToDuration } from 'helpers/time';

import { SceneWrapper, ClickArea } from './style';

interface Props extends Omit<Video.Scene, 'id'> {
  onClick: (startTime: number, endTime: number) => void;
}

const Scene = React.forwardRef(
  ({ thumbnailUrl, startTime, endTime, onClick }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const handleClick = useCallback(() => {
      onClick(startTime, endTime);
    }, []);

    return (
      <SceneWrapper>
        <ClickArea onClick={handleClick} ref={ref}>
          <CardContent>
            <Grid container>
              <Grid item xs={5}>
                {thumbnailUrl && <CardMedia image={thumbnailUrl} />}
              </Grid>
              <Grid item xs={7}>
                {formatSecondsToMmss(startTime)} ~ {formatSecondsToMmss(endTime)}
                <br />
                <Typography variant="caption">{formatSecondsToDuration(endTime - startTime)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </ClickArea>
      </SceneWrapper>
    );
  }
);
Scene.displayName = 'Scene';

export default Scene;
