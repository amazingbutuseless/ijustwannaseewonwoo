import React, { useEffect, useState } from 'react';

import Amplify, { Auth, Hub } from 'aws-amplify';

import { useDispatch, useSelector } from 'react-redux';

import { signIn, signOut } from './userSlice';

import configure from '../../configure';

Amplify.configure({
  Auth: configure.AUTH,
});

export default function useAuthentication() {
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const getUser = () =>
    Auth.currentAuthenticatedUser().then((userData) => {
      setUserId(userData.id);
      return userData;
    });

  useEffect(() => {
    const ga = window.gapi && window.gapi.auth2 ? window.gapi.auth2.getAuthInstance() : null;

    if (!ga) createScript();

    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getUser().then((userData) => {
            dispatch(signIn(userData));
          });
          break;

        case 'signOut':
          dispatch(signOut(data));
          break;

        case 'customOAuthState':
        default:
          console.log({ event, data });
      }
    });

    getUser()
      .then((userData) => {
        dispatch(signIn(userData));
      })
      .catch((err) => {
        console.log(err);
        console.log('Not signed in');
      });
  }, []);

  const googleSignIn = () => {
    const ga = window.gapi.auth2.getAuthInstance();
    ga.signIn()
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
      const auth2 = g.auth2.init({
        client_id: configure.GOOGLE_CLIENT_ID,
        scope: 'profile email openid',
      });
    });
  };

  return {
    googleSignIn,
    googleSignOut,
    userId,
  };
}
