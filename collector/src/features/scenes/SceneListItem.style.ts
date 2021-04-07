import styled from '@emotion/styled';

interface SceneListItemWrapperStyleProps {
  active?: boolean;
}

export const SceneListItemEmptyWrapper = styled.li`
  font-size: 1.4rem;
  color: var(--silver-chalice);
  cursor: pointer;
`;

export const SceneThumbnail = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const SceneDetails = styled.div`
  padding: 1.6rem;
  font-size: 1.4rem;

  span {
    display: block;

    font-size: 1.2rem;
    color: var(--silver-chalice);
  }
`;

export const SceneListItemWrapper = styled.li<SceneListItemWrapperStyleProps>`
  display: inline-block;

  margin-right: 1.6rem;
  width: 16rem;

  box-sizing: border-box;
  border-top: 4px solid var(${({ active }) => (active ? '--dark-orchid' : '--silver-chalice')});
  border-radius: var(--borderRadius);

  background-color: #fff;

  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    box-shadow: var(--boxShadow);
  }
`;
