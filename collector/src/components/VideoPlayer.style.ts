import styled from '@emotion/styled';

export const VideoPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  width: 72rem;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
