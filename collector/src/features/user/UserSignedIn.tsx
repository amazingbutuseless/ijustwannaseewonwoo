import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import useAuthentication from './UseAuthentication';
import { selectCurrentUser } from './userSlice';

export default function UserSignedIn(): ReactElement {
  const { googleSignOut } = useAuthentication();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {currentUser && currentUser.name}
      <button onClick={googleSignOut}>Sign Out</button>
    </>
  );
}
