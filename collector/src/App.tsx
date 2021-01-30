import React, { ReactElement } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { ContentsWrapper, NavigationWrapper } from './App.style';

import VideoList from './features/videos/VideoList';
import VideoDetails from './features/videos/VideoDetails';
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
            <VideoList />
          </Route>
          <Route path="/channel/:channelId">
            <VideoList />
          </Route>
          <Route path="/video/:videoId">
            <VideoDetails />
          </Route>
        </Switch>
      </ContentsWrapper>
    </>
  );
}
