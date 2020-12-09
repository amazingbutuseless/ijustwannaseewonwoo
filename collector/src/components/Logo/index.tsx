import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';

const LogoWrapper = styled.h1`
  position: relative;

  margin: 0;
  padding: 0;
  width: 6.4rem;
  height: 6.4rem;

  font-size: 3.2rem;
  cursor: pointer;

  span {
    display: none;
  }

  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '😺';
  }

  &:hover:after {
    content: '${({ randomCat }) => randomCat}';
  }
`;

export default function Logo() {
  const [randomCat, setRandomCat] = useState('');

  const cats = ['😸', '😹', '😻', '😼', '😽'];

  useEffect(() => {
    setTimeout(() => {
      setRandomCat(cats[Math.floor(Math.random() * cats.length)]);
    }, 2000);
  }, [randomCat]);

  return (
    <LogoWrapper randomCat={randomCat}>
      <span>ijustwannaseewonwoo</span>
    </LogoWrapper>
  );
}
