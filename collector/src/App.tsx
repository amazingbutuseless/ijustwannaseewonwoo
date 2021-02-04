import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ContentsWrapper } from './App.style';

import VideoList from './features/videos/VideoList';
import VideoDetails from './features/videos/VideoDetails';
import UserSignIn from './features/user/UserSignIn';
import UserSignedIn from './features/user/UserSignedIn';

import Drawer from './components/Drawer';

export default function App(): ReactElement {
  const userStatus = useSelector((state) => state.user.status);

  return (
    <>
      <ContentsWrapper>
        {userStatus === 'signedOut' && <UserSignIn />}
        {userStatus === 'signedIn' && (
          <>
            <Drawer>
              <UserSignedIn />
            </Drawer>
            <Switch>
              <Route exact path="/">
                <VideoList />
              </Route>
              <Route exact path="/video">
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
