import styled from '@emotion/styled';

export const LoadingAnimationWrapper = styled.video`
  position: fixed;
  top: 50vh;
  left: 50vw;
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%);
  clip-path: circle(80px at center);
`;
