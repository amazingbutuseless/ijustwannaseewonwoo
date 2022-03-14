import styled from '@emotion/styled'

export const Fieldset = styled.fieldset`
  &:focus-within legend {
    color: ${({theme}) => theme.palette.primary.main};
  }

  & ~ & {
    margin-left: 1.6rem;
  }
`;

export const Controller = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 1.6rem;

  legend {
    font-size: 1.2rem;
  }

  input {
    width: 5rem;
    font-family: monospace;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.6rem;

  button {
    flex-grow: 1;
    margin: 0 .4rem;
  }
`;
