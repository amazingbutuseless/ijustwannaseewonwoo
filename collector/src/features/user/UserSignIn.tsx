import React from 'react';

import LogoImage from '../../components/LogoImage';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { UserSignInWrapper } from './UserSignIn.style';

export default function UserSignIn({ onClick }) {
  return (
    <UserSignInWrapper>
      <LogoImage />
      <div>
        <GoogleSignInButton type="button" onClick={onClick} aria-label="Sign in with Google" />
      </div>
    </UserSignInWrapper>
  );
}
