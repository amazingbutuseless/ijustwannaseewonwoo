import React, { useState, useEffect } from 'react';

import { LogoWrapper } from './Logo.style';

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
