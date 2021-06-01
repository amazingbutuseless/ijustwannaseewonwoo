import React, { useState } from 'react';

import { TitleBarWrapper } from './TitleBar.style';

export default function TitleBar() {
  const [catIndex, setCatIndex] = useState(0);

  const cats = ['😸', '😹', '😺', '😻', '😼', '😽'];

  const onMouseOver = () => {
    const randomCat = Math.floor(Math.random() * cats.length);
    setCatIndex(randomCat);
  };

  return (
    <TitleBarWrapper onMouseOver={onMouseOver}>ijustwannasee {cats[catIndex]}</TitleBarWrapper>
  );
}
