import React from 'react';

import { UserSignInWrapper, ServiceSubTitle } from './UserSignIn.style';

import LogoImage from './LogoImage';
import GoogleSignInButton from './GoogleSignInButton';
import LandingVideo from './LandingVideo';

interface UserSignInProps {
  onClick: () => void;
}

export default function UserSignIn({ onClick }: UserSignInProps) {
  return (
    <>
      <LandingVideo />
      <UserSignInWrapper>
        <LogoImage />
        <ServiceSubTitle>원우가 나오는 유튜브 비디오 장면 모아보기</ServiceSubTitle>
        <GoogleSignInButton type="button" onClick={onClick} aria-label="Sign in with Google" />
      </UserSignInWrapper>
    </>
  );
}
