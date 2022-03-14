import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CognitoUser, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

import { Auth, Hub } from 'config/amplify';

interface AuthContextProps {
  signIn: VoidFunction;
  signOut: VoidFunction;
  getToken: () => Promise<string>;
  user: CognitoUser | null;
}

export const AuthContext = React.createContext<AuthContextProps>({
  signIn: () => {},
  signOut: () => {},
  getToken: () => Promise.resolve(''),
  user: null,
});

function getUser() {
  return Auth.currentAuthenticatedUser()
    .then((userData) => userData)
    .catch(() => console.log('Not signed in'));
}

export default function AuthProvider({ children }: { children: React.ReactElement }) {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then((userData) => setUser(userData));
  }, []);

  const getToken = useCallback(async () => {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google }),
        signOut: () => Auth.signOut(),
        user,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
