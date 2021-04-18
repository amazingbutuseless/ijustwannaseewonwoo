import React, { ReactElement } from 'react';
import { useAppSelector } from '../../hooks';

import useAuthentication from './UseAuthentication';
import { selectCurrentUser } from './userSlice';

export default function UserSignedIn(): ReactElement {
  const { googleSignOut } = useAuthentication();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <>
      {currentUser && currentUser.name}
      <button onClick={googleSignOut}>Sign Out</button>
    </>
  );
}
