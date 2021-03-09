import styled from '@emotion/styled';

export const MoreButtonContainer = styled.div`
  text-align: center;
`;

export const MoreVideosButtonWrapper = styled.button`
  padding: 0.8rem 1.6rem;
  border: 1px solid var(--dark-orchid);
  border-radius: 3.2rem;
  background-color: transparent;
  font-size: 1.6rem;
  color: var(--dark-orchid);
`;

MoreVideosButtonWrapper.defaultProps = {
  type: 'button',
};
