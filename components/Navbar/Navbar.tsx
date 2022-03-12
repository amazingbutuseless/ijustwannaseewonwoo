import React from 'react';
import Link from 'next/link';

import { Container, Typography } from '@mui/material';

import * as Styled from './style';

export default function Navbar(props: unknown) {
  return (
    <Styled.Wrapper position="sticky" color="transparent" elevation={0} {...props}>
      <Container>
        <Typography variant="h1">
          <Link href="/">ijustwannasee😽</Link>
        </Typography>
      </Container>
    </Styled.Wrapper>
  );
}
