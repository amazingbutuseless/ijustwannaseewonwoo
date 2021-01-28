import styled from '@emotion/styled';

export const SceneWrapper = styled.div`
  display: flex;
  margin: 1.6rem 0;
  align-content: center;
`;

export const SceneList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

export const AddSceneContainer = styled.form`
  margin-right: 1.6rem;
  padding: 1.6rem;
  border-radius: var(--borderRadius);
  background-color: var(--davys-grey);
  color: var(--silver-chalice);

  input {
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
  }
`;
