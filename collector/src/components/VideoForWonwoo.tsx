import React, { useState } from 'react';

import { VideoForWonwooWrapper } from './VideoForWonwoo.style';

export default function VideoForWonwoo() {
  const [selectedType, setSelectedType] = useState('');
  const [numOfPeopleChooseNone, updateNumOfPeopleChooseNone] = useState(0);

  const onRadioClick = (e) => {
    setSelectedType(e.target.value);
  };

  const reset = () => {
    setSelectedType('');
  };

  return (
    <VideoForWonwooWrapper
      action="#"
      className={selectedType}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label className="all">
        <input type="radio" name="scenes" value="all" onClick={onRadioClick} />
        <span>영상 전체에 😻가 나와요.</span>
      </label>
      <label className="none">
        <input type="radio" name="scenes" value="none" onClick={onRadioClick} />
        <span aria-details="원우가 나오지 않아요를 선택한 사람 수가 일정 수 이상일 경우, 이 동영상이 리스트에 표시되지 않습니다.">
          😿가 나오지 않아요. <strong>{numOfPeopleChooseNone}</strong>
        </span>
      </label>
      <label>
        <input type="radio" onClick={reset} />
        <span aria-details="잘못 선택한 경우 선택을 취소하세요.">취소</span>
      </label>
    </VideoForWonwooWrapper>
  );
}
