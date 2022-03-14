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

export const AuthButton = styled.a`
display: inline-flex;
align-items: center;
height: 4rem;
padding: 1.8rem .8rem;
box-sizing: border-box;
border: 1px solid #efefef;
border-radius: 2px;
font-size: 1.4rem;
color: #000;
text-decoration: none;

img {
  margin-right: 2.4rem;
}
`;
