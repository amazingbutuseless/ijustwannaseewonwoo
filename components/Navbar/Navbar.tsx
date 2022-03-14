import React, { useContext } from 'react';
import Link from 'next/link';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { AuthContext } from 'contexts/AuthContext';

import * as Styled from './style';

export default function Navbar(props: unknown) {
  const auth = useContext(AuthContext);

  const { t } = useTranslation('common');

  const handleSignInButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    auth.signIn();
  };

  const handleSignOutButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    auth.signOut();
  };

  return (
    <Styled.Wrapper position="sticky" color="transparent" elevation={0} {...props}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h1">
          <Link href="/">ijustwannasee😽</Link>
        </Typography>
        {auth.user ? (
          <Styled.AuthButton href="#" onClick={handleSignOutButtonClick}>
            {t('signOut')}
          </Styled.AuthButton>
        ) : (
          <Styled.AuthButton href="#" onClick={handleSignInButtonClick}>
            <img src="/images/g-logo.png" width="18" height="18" />
            {t('signInWithGoogle')}
          </Styled.AuthButton>
        )}
      </Container>
    </Styled.Wrapper>
  );
}
