import styled from '@emotion/styled';

interface SceneListItemWrapperStyleProps {
  active?: boolean;
}

export const SceneListItemEmptyWrapper = styled.li`
  display: inline-block;
  font-size: 1.4rem;
  color: var(--silver-chalice);
  cursor: pointer;
`;

export const SceneListItemWrapper = styled.li<SceneListItemWrapperStyleProps>`
  display: inline-block;

  margin-right: 1.6rem;
  padding: 1.6rem;
  width: 16rem;

  box-sizing: border-box;
  border-top: 4px solid transparent;
  border-radius: var(--borderRadius);

  background-color: #fff;

  font-size: 1.4rem;

  cursor: pointer;

  span {
    display: block;

    font-size: 1.2rem;
    color: var(--silver-chalice);
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    box-shadow: var(--boxShadow);
  }
`;
