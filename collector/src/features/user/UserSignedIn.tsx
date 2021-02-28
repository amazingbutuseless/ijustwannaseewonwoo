import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import useAuthentication from './UseAuthentication';
import { selectUserById } from './userSlice';

export default function UserSignedIn(): ReactElement {
  const { googleSignOut, userId } = useAuthentication();
  const user = useSelector((state) => selectUserById(state, userId));

  return (
    <>
      {user && user.name}
      <button onClick={googleSignOut}>Sign Out</button>
    </>
  );
}
