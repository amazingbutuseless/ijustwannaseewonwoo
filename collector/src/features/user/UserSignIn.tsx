import React from 'react';

import useAuthentication from './UseAuthentication';

export default function UserSignIn() {
  const { googleSignIn } = useAuthentication();

  return (
    <>
      <button onClick={googleSignIn}>Sign in with Google</button>
    </>
  );
}
