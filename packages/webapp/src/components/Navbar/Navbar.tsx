import Link from 'next/link';

import { Container, Typography } from '@material-ui/core';

import * as Styled from './style';

export default function Navbar() {
  return (
    <Styled.Wrapper position="sticky" color="transparent" elevation={0}>
      <Container>
        <Typography variant="h1">
          <Link href="/">ijustwannasee😽</Link>
        </Typography>
      </Container>
    </Styled.Wrapper>
  );
}
