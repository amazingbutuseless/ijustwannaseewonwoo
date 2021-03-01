import styled from '@emotion/styled';

export const PlaylistTitle = styled.h3`
  margin: 0;
  margin-bottom: 0.8rem;
  padding: 0;
  font-size: 1.6rem;
`;

export const ChannelInfo = styled.cite`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-style: normal;

  img {
    display: inline-block;
    margin-right: 0.8rem;
    width: 6rem;
    height: 6rem;
    border-radius: 3rem;
  }
`;

export const PlaylistItemWrapper = styled.li`
  padding: 1.6rem;
  width: calc(50% - 0.8rem);
  box-sizing: border-box;
  border-radius: var(--borderRadius);
  background-color: #fff;
  cursor: pointer;
`;
