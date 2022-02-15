import styled from '@emotion/styled';
import { AppBar } from '@mui/material';

export const Wrapper = styled(AppBar)`
  justify-content: center;
  min-height: var(--app-bar-height);
  background-color: #fff;

  h1 {
    font-size: 2.4rem;
    font-weight: 500;

    a {
      color: var(--rich-black-fogra-39);
      text-decoration: none;
    }
  }
`;
