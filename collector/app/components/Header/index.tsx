import React from 'react';
import styled from '@emotion/styled';

export interface HeaderProps {
  title: string;
}

const HeaderWrapper = styled.header`
  border-bottom: 1px solid #efefef;
  background-color: #fff;

  h1 {
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

export default function Header({
  title = 'ijustwannaseewonwoo',
}: HeaderProps): JSX.Element {
  return (
    <HeaderWrapper>
      <h1>{title}</h1>
    </HeaderWrapper>
  );
}
