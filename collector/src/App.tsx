import React, { ReactElement, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAppSelector } from './app/hooks';

import { ContentsWrapper, Content } from './App.style';

import VideoList from './features/videos/VideoList';
import VideoDetails from './features/videos/VideoDetails';
import UserSignIn from './features/user/UserSignIn';
import UserSignedIn from './features/user/UserSignedIn';
import useAuthentication from './features/user/UseAuthentication';

import TitleBar from './components/TitleBar';
import Menu from './components/Menu';
import Playlist from './features/playlists/Playlist';

export default function App(): ReactElement {
  const [activeMenuItem, setActiveMenuItem] = useState('Playlist');
  const { googleSignIn } = useAuthentication();

  const userStatus = useAppSelector((state) => state.user.status);

  return (
    <>
      <TitleBar />
      <ContentsWrapper>
        {userStatus === 'signedOut' && <UserSignIn onClick={googleSignIn} />}

        {userStatus === 'signedIn' && (
          <>
            <Menu activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />

            <Content>
              <Switch>
                <Route exact path={['/', '/main_window']}>
                  <Playlist />
                </Route>
                <Route exact path="/playlist">
                  <Playlist />
                </Route>
                <Route path="/playlist/:playlistId">
                  <Playlist />
                </Route>
                <Route exact path="/video">
                  <VideoList />
                </Route>
                <Route path="/video/:videoId">
                  <VideoDetails />
                </Route>
              </Switch>
            </Content>
          </>
        )}
      </ContentsWrapper>
    </>
  );
}
