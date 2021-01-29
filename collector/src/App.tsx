import React, { ReactElement } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { ContentsWrapper, NavigationWrapper } from './App.style';

import Videos from './features/videos/Videos';
import Video from './features/video/Video';
import Channels from './features/channels/Channels';

export default function App(): ReactElement {
  const history = useHistory();

  const onClick = (channelId: string) => {
    history.push(`/channel/${channelId}`);
  };

  return (
    <>
      <NavigationWrapper>
        <Channels onClick={onClick} />
      </NavigationWrapper>
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
    </>
  );
}
