import React, { useCallback } from 'react';
import { Card, CardActionArea, CardContent, Grid } from '@mui/material';

interface Props {
  thumbnail: string;
  startTime: string;
  endTime: string;
  onClick: (startTime: string, endTime: string) => void;
  isPlaying: boolean;
}

export default function Scene({ thumbnail, startTime, endTime, onClick, isPlaying }: Props) {
  const handleClick = useCallback(() => {
    onClick(startTime, endTime);
  }, []);

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Grid container>
            <Grid item xs={5}>
              <img src={thumbnail} />
            </Grid>
            <Grid item xs={7}>
              {startTime} ~ {endTime}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
