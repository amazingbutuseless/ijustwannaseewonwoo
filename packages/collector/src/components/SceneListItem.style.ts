import styled from '@emotion/styled';

interface SceneListItemWrapperStyleProps {
  active?: boolean;
}

export const SceneListItemEmptyWrapper = styled.li`
  padding: 0.8rem;
  font-size: 1.4rem;
  color: var(--silver-chalice);
  word-break: keep-all;
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
  margin: 0.8rem;
  margin-top: 0;
  width: 16rem;

  box-sizing: border-box;
  border-top: 4px solid var(${({ active }) => (active ? '--dark-orchid' : '--silver-chalice')});
  border-radius: var(--borderRadius);

  background-color: #fff;

  cursor: pointer;

  &:hover {
    box-shadow: var(--boxShadow);
  }
`;
