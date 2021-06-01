import { parse } from 'url';

import { remote, ipcRenderer, IpcRendererEvent } from 'electron';

import React, { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

import { useAppDispatch } from '../../app/hooks';

import configure from '../../configure';

import { signIn, signOut } from './userSlice';

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me';
const GOOGLE_REVOKE_TOKEN = 'https://oauth2.googleapis.com/revoke';
const GOOGLE_REFRESH_TOKEN_URL = 'https://oauth2.googleapis.com/token';

Auth.configure({
  refreshHandlers: {
    google: renewToken,
  },
});

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

    authWindow.loadURL(authUrl, { userAgent: 'Chrome' });
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

function storeToken(tokens) {
  if (typeof tokens.refresh_token !== 'undefined') {
    ipcRenderer.send('auth/storeToken', tokens);
  }
}

function getRefreshToken() {
  return ipcRenderer.sendSync('auth/fetchToken').refresh_token;
}

async function renewToken() {
  const refreshToken = getRefreshToken();

  if (typeof refreshToken === 'undefined') {
    googleSignOut();
    return;
  }

  const data = {
    refresh_token: refreshToken,
    client_id: configure.GOOGLE_CLIENT_ID,
    redirect_uri: configure.GOOGLE_REDIRECT_URL,
    grant_type: 'refresh_token',
  };

  try {
    const response = await fetch(GOOGLE_REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data),
    });

    const token = await response.json();
    storeToken(token);

    const { id_token, expires_at } = token;

    return { token: id_token, expires_at };
  } catch (err) {
    googleSignOut();
  }
}

function googleSignOut() {
  const refreshToken = getRefreshToken();

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
}

export default function useAuthentication() {
  const dispatch = useAppDispatch();

  const getUser = () => {
    return Auth.currentAuthenticatedUser().then((userData) => userData);
  };

  const signInWithCurrentUser = () => {
    getUser()
      .then((userData) => {
        dispatch(signIn(userData));
      })
      .catch((err) => {
        console.log(err);
        dispatch(signOut());
      });
  };

  const handleAuthEvent = ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        signInWithCurrentUser();
        break;

      case 'signOut':
        dispatch(signOut());
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
      storeToken(tokens);

      const { access_token, id_token, expires_at } = tokens;

      const { email, name } = await fetchGoogleProfile(access_token);

      Auth.federatedSignIn(
        'google',
        { token: id_token, expires_at },
        {
          email,
          name,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    googleSignIn,
    googleSignOut,
  };
}
