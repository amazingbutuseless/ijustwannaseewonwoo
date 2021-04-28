import React from 'react';

import { UserSignInWrapper } from './UserSignIn.style';

import LogoImage from '../../components/LogoImage';
import GoogleSignInButton from '../../components/GoogleSignInButton';

interface UserSignInProps {
  onClick: () => void;
}

export default function UserSignIn({ onClick }: UserSignInProps) {
  return (
    <>
      <video muted autoPlay style={{ objectFit: 'cover' }}></video>
      <UserSignInWrapper>
        <LogoImage />
        <GoogleSignInButton type="button" onClick={onClick} aria-label="Sign in with Google" />
      </UserSignInWrapper>
    </>
  );
}
