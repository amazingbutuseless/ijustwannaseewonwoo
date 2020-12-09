import React from 'react';

import styled from '@emotion/styled';

const LogoWrapper = styled.h1`
  text-align: center;
  font-size: 3.2rem;

  span {
    display: none;
  }
`;

export default function Logo() {
  return (
    <LogoWrapper>
      <span>ijustwannasee</span>😺
    </LogoWrapper>
  );
}
