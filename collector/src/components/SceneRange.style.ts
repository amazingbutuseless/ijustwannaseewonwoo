import styled from '@emotion/styled';

export const TimeInput = styled.input`
  padding: 0.8rem 0;
  width: 2.4rem;
  border: 1px solid transparent;
  border-radius: 2px;
  background-color: transparent;
  color: var(--silver-chalice);
  text-align: center;

  &:focus {
    border: 1px solid var(--silver-chalice);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

TimeInput.defaultProps = {
  type: 'number',
  placeholder: '00',
  min: '0',
};
