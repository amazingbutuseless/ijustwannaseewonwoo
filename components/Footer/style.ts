import styled from '@emotion/styled';
import { Container } from '@mui/material';

export const Wrapper = styled(Container)`
  padding-top: 2rem;
  font-size: 1.2rem;

  hr {
    margin-bottom: 2rem;
  }

  a {
    text-decoration: none;
    color: var(--dark-orchid);
  }

  address {
    padding-top: 1rem;
    color: var(--silver-chalice);
  }
`;
