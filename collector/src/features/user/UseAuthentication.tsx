import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';

import { useAppDispatch } from '../../hooks';

import configure from '../../configure';

import { signIn, signOut } from './userSlice';

Amplify.configure({
  Auth: configure.AUTH,
});

export default function useAuthentication() {
  const [userId, setUserId] = useState('');
  const [googleAPIReady, setGoogleAPIReady] = useState(false);

  const dispatch = useAppDispatch();

  const getUser = () => {
    return new Promise((resolve, reject) => {
      if (!googleAPIReady) return reject('Google API Not ready');

      Auth.currentAuthenticatedUser()
        .then((userData) => {
          setUserId(userData.id);
          resolve(userData);
        })
        .catch((err) => reject(err));
    });
  };

  const signInWithCurrentUser = () => {
    getUser()
      .then((userData) => {
        dispatch(signIn(userData));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleAuthEvent = ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        signInWithCurrentUser();
        break;

      case 'signOut':
        dispatch(signOut(data));
        break;

      case 'customOAuthState':
      default:
        console.log({ event, data });
    }
  };

  useEffect(() => {
    if (!googleAPIReady) {
      const ga = window.gapi && window.gapi.auth2 ? window.gapi.auth2.getAuthInstance() : null;

      if (!ga) {
        createScript();
      } else {
        setGoogleAPIReady(true);
      }
    }

    Hub.listen('auth', handleAuthEvent);

    signInWithCurrentUser();

    return () => {
      Hub.remove('auth', handleAuthEvent);
    };
  }, [googleAPIReady]);

  const googleSignIn = () => {
    const ga = window.gapi.auth2.getAuthInstance();

    ga.signIn({ scope: 'https://www.googleapis.com/auth/youtube.readonly' })
      .then((googleUser) => getAWSCredentials(googleUser))
      .catch((err) => {
        console.log(err);
      });
  };

  const googleSignOut = () => {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signOut()
      .then((response) => {
        Auth.signOut();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAWSCredentials = (googleUser) => {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();

    return Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      {
        email: profile.getEmail(),
        name: profile.getName(),
      }
    );
  };

  const createScript = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = initGapi;
    document.body.appendChild(script);
  };

  const initGapi = () => {
    const g = window.gapi;

    g.load('auth2', () => {
      g.auth2.init({
        client_id: configure.GOOGLE_CLIENT_ID,
        scope: 'profile email openid',
      });
    });

    g.load('client:auth2', () => {
      g.client.setApiKey(configure.YOUTUBE_API_KEY);
      g.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest').then(() => {
        setGoogleAPIReady(true);
      });
    });
  };

  return {
    googleSignIn,
    googleSignOut,
    userId,
  };
}
