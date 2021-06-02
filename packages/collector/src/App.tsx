import { ipcRenderer, IpcRendererEvent } from 'electron';

import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Amplify from 'aws-amplify';

import configure from './configure';
import { useAppDispatch, useAppSelector } from './app/hooks';

import { ContentsWrapper, Content } from './App.style';

import { IFaceRecognitionResult } from './app/face_recorgnizer';
import { upload } from './app/image_uploader';
import { uploadSceneThumbnail } from './features/scenes/scenesSlice';

import Introduce from './pages/Introduce';
import Playlist from './features/playlists/Playlist';
import VideoList from './features/videos/VideoList';
import VideoDetails from './features/videos/VideoDetails';
import useAuthentication from './features/user/UseAuthentication';

import { PlayTypeContext } from './components/PlayTypeSwitcher';
import TitleBar from './components/TitleBar';
import Menu from './components/Menu';
import UserSignIn from './components/UserSignIn';

interface FaceDetectedMessage {
  videoId: string;
  start: number;
  thumbnail: string;
  results: {
    [memberName: string]: Array<IFaceRecognitionResult>;
  };
}

Amplify.configure({
  Auth: configure.AUTH,
});

export default function App(): ReactElement {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { googleSignIn, googleSignOut } = useAuthentication();

  const [activeMenuItem, setActiveMenuItem] = useState('Playlist');
  const [playScenes, switchPlayScenes] = useState(true);

  const userStatus = useAppSelector((state) => state.user.status);

  const onFaceDetected = (event: IpcRendererEvent, message: FaceDetectedMessage) => {
    const { videoId, start, thumbnail } = message;
    dispatch(uploadSceneThumbnail({ videoId, start, imageUrl: thumbnail }));

    Object.entries(message.results).forEach(([_, recognitions]) => {
      recognitions.forEach((recognition: IFaceRecognitionResult) => {
        const { name, videoId, distance, url } = recognition;
        const key = `recognized/${name}/${videoId}-${distance.toFixed(2)}.jpg`;
        upload(key, url);
      });
    });
  };

  useEffect(() => {
    ipcRenderer.on('video/detectFaces', onFaceDetected);

    return () => {
      ipcRenderer.off('video/detectFaces', onFaceDetected);
    };
  }, []);

  return (
    <>
      {process.platform !== 'win32' && <TitleBar />}
      <ContentsWrapper>
        {userStatus !== 'signedIn' && <UserSignIn onClick={googleSignIn} />}

        {userStatus === 'signedIn' && (
          <>
            <Menu
              activeItem={activeMenuItem}
              onItemClick={setActiveMenuItem}
              onSignOutButtonClick={googleSignOut}
            />

            <Content>
              <PlayTypeContext.Provider value={{ playScenes, onChange: switchPlayScenes }}>
                <Switch>
                  {window.location.pathname.endsWith('index.html') && history.push('/playlist')}
                  <Route exact path={['/', '/main_window']}>
                    <Playlist />
                  </Route>
                  <Route exact path="/introduce">
                    <Introduce />
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
              </PlayTypeContext.Provider>
            </Content>
          </>
        )}
      </ContentsWrapper>
    </>
  );
}
