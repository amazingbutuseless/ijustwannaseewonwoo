import styled from '@emotion/styled';
import { Container } from '@mui/material';

export const ShowMoreButtonContainer = styled(Container)`
  display: flex;
  justify-content: center;
  margin-top: 2.4rem;

  button {
    display: inline-block;
    padding: .8rem 1.6rem;
    border: 1px solid var(--silver-chalice);
    border-radius: 1.6rem;
    background-color: transparent;
    color: var(--silver-chalice);
    cursor: pointer;
  }
`; 

export const Wrapper = styled(Container)``;
