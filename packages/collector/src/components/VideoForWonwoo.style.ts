import styled from '@emotion/styled';

export const VideoForWonwooWrapper = styled.form`
  display: flex;
  margin-top: 1.6rem;

  input {
    display: none;
  }

  label {
    display: inline-block;
    position: relative;
    padding: 0.8rem;
    border-radius: var(--borderRadius);
    background-color: var(--davys-grey);
    font-size: 1.4rem;
    color: var(--silver-chalice);
    cursor: pointer;

    &:before {
      display: inline-block;
      font-family: 'Lucida Grande', sans-serif;
      color: var(--pumpkin);
      font-weight: 700;
      content: '';
    }

    &:after {
      display: inline-block;
      margin-left: 0.8rem;
      margin-right: -0.8rem;
      color: var(--sonic-silver);
      content: '|';
    }

    &.all {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &.none {
      border-radius: 0;

      strong {
        display: inline-block;
        padding: 0.4rem;
        border-radius: 2px;
        background-color: var(--rich-black-fogra-39);
        font-family: fixed;
        font-size: 1rem;
        color: #fff;
      }
    }

    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      &:after {
        content: '';
      }
    }

    &:hover span[aria-details]:after {
      display: block;
      position: absolute;
      left: 50%;
      bottom: calc(100% + 0.8rem);
      padding: 0.8rem;
      width: 12rem;
      transform: translateX(-50%);
      border-radius: 4px;
      background-color: var(--rich-black-fogra-39);
      font-size: 1.2rem;
      color: #fff;
      word-break: keep-all;
      content: attr(aria-details);
    }
  }

  &.all .all:before,
  &.none .none:before {
    margin-right: 0.8rem;
    content: '✓';
  }
`;
