import styled from '@emotion/styled';

export const Button = styled.button`
  margin-left: 1.6rem;
  padding: 0.8rem 1.6rem;

  border: 1px solid var(--dark-orchid);
  border-radius: 2px;
  background-color: rgba(158, 78, 221, 0);

  color: var(--dark-orchid);

  transition: background-color 200ms;

  &:hover {
    background-color: rgba(158, 78, 221, 1);

    color: var(--rich-black-fogra-39);
  }
`;

export const SceneAddFormContainer = styled.form`
  display: flex;
  align-items: center;

  padding: 1.6rem;

  border-radius: var(--borderRadius);
  background-color: var(--rich-black-fogra-39);

  color: var(--silver-chalice);
`;
