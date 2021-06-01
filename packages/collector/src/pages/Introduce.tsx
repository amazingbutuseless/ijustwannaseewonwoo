import React from 'react';

import styled from '@emotion/styled';

import { Scrollbar } from '../App.style';

import LogoImage from '../components/LogoImage';
import GitHubLink from '../components/GitHubLink';

const IntroduceWrapper = styled.div`
  padding: 2.4rem;
  width: 100%;
  height: calc(100vh - var(--titleBarHeight));
  box-sizing: border-box;

  color: var(--silver-chalice);
  overflow: auto;

  ${Scrollbar}

  h2,
  h3 {
    margin: 0;
    padding: 0;
  }

  h2 {
    margin-top: 0.4rem;
    margin-bottom: 2.4rem;
    font-size: 3.2rem;
    color: var(--dark-orchid);
  }

  h3 {
    margin: 3.2rem 0 1.6rem;
    font-size: 1.4rem;
  }

  p {
    margin: 0;
    margin-bottom: 1.6rem;
    padding: 0;
    font-size: 1.3rem;
    line-height: 1.8;
  }

  span {
    color: var(--dark-orchid);
  }
`;

export default function Introduce() {
  return (
    <IntroduceWrapper>
      <LogoImage height={30} />
      <h2>
        늦덕이지만
        <br />
        원우의 모든 영상이 보고 싶어.
      </h2>
      <p>
        늦은 입덕 때문에 앞으로 봐야 할 영상이 지금까지 본 영상보다 많다는 기쁨을 누린 것도 잠깐,
        <br />
        매일매일 일에 치이고 돌아와 새벽까지 원우 영상을 보면서 힐링을 하던 덕후는 금세 체력
        고갈때문에 광광 울게 되었어요.
        <br />
        그리고 이런 생각을 하게 되었습니다.
      </p>
      <p>
        "내가 원우가 나온 장면을 보기 위해 모든 영상을 찾아 보지 않더라도,
        <br />좀 더 쉽게 원우가 나온 영상, 장면을 볼 수 있는 방법이 있으면 좋겠다. 어쩌면 AI의
        도움을 받을 수 있지 않을까?"
      </p>
      <p>
        이런 생각 끝에 시작하게 된 ijustwannaseewonwoo 프로젝트는,
        <br />
        1. Youtube에 올라온 영상 중 원우가 나온 장면을 찾아 얼굴 인식에 필요한 데이터를 모으고,
        <br />
        2. 그렇게 모아진 데이터로 열심히 기계를 학습 시켜서
        <br />
        3. 최종적으로는 사람이 직접 영상 전체를 보면서 원우가 나온 장면을 찾아내지 않더라도 AI가
        원우가 등장한 장면을 찾아내어 추천해주는
        <br />
        "AI와 함께 원우 덕질하기" 프로젝트 입니다.
      </p>

      <h3>그냥 동영상을 보시면 돼요! 그리고 원우가 나오면 장면이 있으면 추가해주세요.</h3>
      <p>
        그냥 평소에 유튜브 영상을 보던 것처럼 영상을 봐주세요. 그리고 만약 다른 팬이나 AI가 찾지
        못한 장면을 알고 있다면 그 장면을 추가해주세요.
        <br />
        장면이 추가되면 이 어플리케이션은 장면의 재생 시간 동안 등장하는 사람들을 분석해서 원우와
        세븐틴 멤버들 얼굴을 찾아낼 거예요.
        <br />
        찾아낸 얼굴과 멤버 이름은 그 자체로 AI가 학습 할 수 있는 데이터로 활용됩니다.
      </p>

      <h3>ijustwannaseewonwoo를 만드는 일에도 참여 할 수 있습니다!</h3>
      <p>
        영상을 보면서 장면을 추가하는 것만으로도 이미 이 프로젝트에 크게 기여를 하는 것이지만요,
        <br />
        기획, 디자인, 개발, 번역, 문서화 등 프로젝트를 만드는데 함께 할 수 있는 일, 함께 하고 싶은
        일이 너무 많습니다.
        <br />
        사실은... 그냥... 원우팬인 친구를 사귀고 싶어요. 😽
      </p>
      <GitHubLink link="/amazingbutuseless/ijustwannaseewonwoo" />
    </IntroduceWrapper>
  );
}
