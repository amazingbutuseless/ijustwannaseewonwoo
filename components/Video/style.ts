import styled from '@emotion/styled';
import { Card } from '@mui/material';

export const ForWonwoo = styled.i`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 2.4rem;
  height: 2.4rem;
  font-size: 2.4rem;
  font-style: normal;
`;

ForWonwoo.defaultProps = {
  children: '😻',
};

export const Wrapper = styled(Card)`
  h3 {
    font-size: 1.6rem;
  }

  .MuiCardMedia-img	img {
    width: 100%;
    height: auto;
  }
`;
