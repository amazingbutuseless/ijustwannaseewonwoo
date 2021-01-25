import styled from '@emotion/styled';

export const VideoItemThumbnail = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const VideoItemInfo = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.75);

  strong {
    font-size: 1.4rem;
    color: #fff;
    line-height: 1.3;

    span {
      display: block;
      font-size: 1rem;
      color: #ccc;
    }
  }

  img {
    margin-right: 0.8rem;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 7.2rem;
  }
`;

export const VideoItemWrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.5);
  }

  @media screen and (min-width: 1024px) {
    max-width: calc(100% / 3 - 3.6rem);
  }
`;
