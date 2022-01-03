import React from 'react';
import { Container } from '@material-ui/core';
import Link from 'next/link';

import * as Styled from './style';

export default function Footer() {
  return (
    <Styled.Wrapper>
      <Container>
        <Link href="/about">ijustwannaseewonwoo</Link>
      </Container>
      <Container component="address">&copy;amazingbutuseless 2021-{new Date().getFullYear()}.</Container>
    </Styled.Wrapper>
  );
}
