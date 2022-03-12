import { Card, CardActionArea } from '@mui/material';
import styled from '@emotion/styled';

export const SceneWrapper = styled(Card)`
  position: relative;

  & + & {
    margin-top: 1rem;
  }
`;

export const ClickArea = styled(CardActionArea)`
  &.active::before {
    position: absolute;
    top: 50%;
    left: 1rem;
    width: 1rem;
    height: 1rem;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: lime;
    content: '';
  }
`;
