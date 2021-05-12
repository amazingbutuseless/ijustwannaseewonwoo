import styled from '@emotion/styled';
import { Scrollbar } from '../App.style';

export const AddSceneGuideModalDialogBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const CloseButtonWrapper = styled.button`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  border: 0;
  background-color: transparent;

  svg {
    fill: var(--silver-chalice);
  }
`;

export const GuideItemWrapper = styled.details`
  margin-botom: 1.6rem;
  font-size: 1.4rem;
  line-height: 1.5;

  summary {
    margin-bottom: 0.8rem;
    outline: none;
  }

  a {
    color: var(--dark-orchid);
  }

  p {
    word-break: keep-all;
  }

  hr {
    margin: 1.6rem 0;
    padding: 0;
    height: 1px;
    border: 0;
    background-color: var(--jet);
  }

  &[open] summary {
    color: var(--dark-orchid);
  }
`;

export const AddSceneGuideModalDialogWrapper = styled.div`
  ${Scrollbar}

  position: fixed;
  top: 50vh;
  left: 50vw;
  padding: 2.4rem;
  width: 80vw;
  height: 80vh;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  border-radius: var(--borderRadius);
  background-color: var(--rich-black-fogra-39);
  color: var(--silver-chalice);
  box-shadow: var(--boxShadow);
  overflow: auto;

  h2 {
    margin: 0;
    margin-bottom: 2.4rem;
    padding: 0;
    font-size: 1.6rem;
  }
`;
