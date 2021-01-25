import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ContentsWrapper } from './Contents.style';

import Videos from './Videos';
import Video from './Video';

export default function Contents() {
  return (
    <ContentsWrapper>
      <Switch>
        <Route exact path="/">
          <Videos />
        </Route>
        <Route path="/channel/:channelId">
          <Videos />
        </Route>
        <Route path="/video/:videoId">
          <Video />
        </Route>
      </Switch>
    </ContentsWrapper>
  );
}
