import { parse } from 'url';

import { remote } from 'electron';

import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';

import { useAppDispatch } from '../../app/hooks';

import configure from '../../configure';

import { signIn, signOut } from './userSlice';

Amplify.configure({
  Auth: configure.AUTH,
});

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me';
const GOOGLE_REVOKE_TOKEN = 'https://oauth2.googleapis.com/revoke';

function signInWithPopup(): Promise<string | string[] | Error> {
  return new Promise((resolve, reject) => {
    const authWindow = new remote.BrowserWindow({
      show: true,
      width: 500,
      height: 600,
    });

    function handleNavigation(url) {
      const query = parse(url, true).query;

      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`));
        } else if (query.code) {
          authWindow.removeAllListeners('closed');
          setImmediate(() => authWindow.close());
          resolve(query.code);
        }
      }
    }

    const urlParams = {
      response_type: 'code',
      redirect_uri: configure.GOOGLE_REDIRECT_URL,
      client_id: configure.GOOGLE_CLIENT_ID,
      scope: 'profile email openid',
    };
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${new URLSearchParams(urlParams).toString()}`;

    authWindow.on('close', () => {
      reject(new Error('Auth window was closed by user'));
    });

    authWindow.webContents.on('will-redirect', (event, url) => {
      handleNavigation(url);
    });

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url);
    });

    authWindow.loadURL(authUrl);
  });
}

async function fetchAccessTokens(code: string) {
  const data = {
    code,
    client_id: configure.GOOGLE_CLIENT_ID,
    redirect_uri: configure.GOOGLE_REDIRECT_URL,
    grant_type: 'authorization_code',
  };

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data),
  });

  return response.json();
}

async function fetchGoogleProfile(accessToken: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(GOOGLE_PROFILE_URL, {
    headers,
  });

  return response.json();
}

export default function useAuthentication() {
  const [userId, setUserId] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const dispatch = useAppDispatch();

  const getUser = () => {
    return new Promise((resolve, reject) => {
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
        console.log(err);
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
    // @ts-ignore
    Hub.listen('auth', handleAuthEvent);

    signInWithCurrentUser();

    return () => {
      // @ts-ignore
      Hub.remove('auth', handleAuthEvent);
    };
  }, []);

  const googleSignIn = async () => {
    try {
      const code = await signInWithPopup();
      const tokens = await fetchAccessTokens(code as string);
      const { email, name } = await fetchGoogleProfile(tokens.access_token);
      setRefreshToken(tokens.refresh_token);

      getAWSCredentials({ tokens, email, name });
    } catch (err) {
      console.log(err);
    }
  };

  const googleSignOut = () => {
    fetch(GOOGLE_REVOKE_TOKEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token: refreshToken }),
    })
      .then((response) => {
        Auth.signOut();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAWSCredentials = ({ tokens: { id_token, expires_at }, email, name }) => {
    return Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      {
        email,
        name,
      }
    );
  };

  return {
    googleSignIn,
    googleSignOut,
    userId,
  };
}
