import styled from '@emotion/styled';

interface SceneListItemWrapperStyleProps {
  active: boolean;
}

export const SceneListItemWrapper = styled.li`
  display: inline-block;

  margin-right: 1.6rem;
  padding: 1.6rem;
  width: 24rem;

  box-sizing: border-box;
  border: 2px solid
    ${({ active }: SceneListItemWrapperStyleProps) => (active ? 'var(--pumpkin)' : 'transparent')};
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
