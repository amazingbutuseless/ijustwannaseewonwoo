import styled from '@emotion/styled';

export const ForWonwoo = styled.i`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 2.4rem;
  height: 2.4rem;
  font-size: 2.4rem;
  font-style: normal;
`;

ForWonwoo.defaultProps = {
  children: '😻',
};

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
  transform: translateY(100%);
  transition: transform 300ms;

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
  margin: 0 1.6rem 4rem;
  border-radius: var(--borderRadius);
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: var(--boxShadow);

    ${VideoItemInfo} {
      transform: translateY(0);
    }
  }
`;
