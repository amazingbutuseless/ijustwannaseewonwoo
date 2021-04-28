import styled from '@emotion/styled';

export const TitleBarWrapper = styled.header`
  -webkit-user-select: none;
  -webkit-app-region: drag;

  display: flex;
  place-content: center;

  position: fixed;
  top: 0;
  left: 0;

  padding-top: 8px;
  width: 100%;
  height: 30px;

  background-color: var(--jet);

  font-size: 1.4rem;
  color: var(--silver-chalice);

  text-align: center;

  z-index: 1;
`;
