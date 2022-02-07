import React from 'react';
import { Divider } from '@mui/material';
import Link from 'next/link';

import * as Styled from './style';

export default function Footer() {
  return (
    <Styled.Wrapper>
      <Divider />
      <Link href="/about">ijustwannaseewonwoo</Link>
      <address>&copy;amazingbutuseless 2021-{new Date().getFullYear()}.</address>
    </Styled.Wrapper>
  );
}
