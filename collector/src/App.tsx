import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ContentsWrapper } from './App.style';

import VideoList from './features/videos/VideoList';
import VideoDetails from './features/videos/VideoDetails';
import UserSignIn from './features/user/UserSignIn';
import UserSignedIn from './features/user/UserSignedIn';

export default function App(): ReactElement {
  const userStatus = useSelector((state) => state.user.status);

  return (
    <>
      <ContentsWrapper>
        {userStatus === 'signedOut' && <UserSignIn />}
        {userStatus === 'signedIn' && (
          <>
            <UserSignedIn />
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
          </>
        )}
      </ContentsWrapper>
    </>
  );
}
