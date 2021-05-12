import { shell } from 'electron';

import React, { ReactElement } from 'react';

import {
  AddSceneGuideModalDialogWrapper,
  AddSceneGuideModalDialogBackground,
  CloseButtonWrapper,
  GuideItemWrapper,
} from './AddSceneGuideModalDialog.style';

interface CloseButtonProps {
  onConfirm: () => void;
}

interface GuideItemProps {
  summary: string;
  children: Array<ReactElement>;
}

export interface AddSceneGuideModalDialogProps extends CloseButtonProps {}

function CloseButton({ onConfirm }: CloseButtonProps) {
  return (
    <CloseButtonWrapper type="button" onClick={onConfirm}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </CloseButtonWrapper>
  );
}

function ExternalLink({ url, children }) {
  const onClick = (e) => {
    e.preventDefault();

    shell.openExternal(url);
  };

  return (
    <a href="#" onClick={onClick}>
      {children}
    </a>
  );
}

function GuideItem({ summary, children }: GuideItemProps) {
  return (
    <GuideItemWrapper>
      <summary>{summary}</summary>
      {children}
      <hr />
    </GuideItemWrapper>
  );
}

export default function AddSceneGuideModalDialog({ onConfirm }: AddSceneGuideModalDialogProps) {
  return (
    <>
      <AddSceneGuideModalDialogBackground onClick={onConfirm} />
      <AddSceneGuideModalDialogWrapper>
        <CloseButton onConfirm={onConfirm} />
        <h2>장면 추가 FAQ</h2>
        <GuideItem summary="장면을 잘못 추가했어요. 삭제 할 수는 없나요?">
          <p>
            현재는 데이터 소실 방지를 위해 장면을 삭제 할 수 없도록 개발이 되었습니다. (추후에는
            본인이 등록한 장면은 본인이 삭제 할 수 있도록 하는 기능을 추가할 예정이예요!)
          </p>
          <p>
            삭제 기능이 추가되기 전까지는{' '}
            <ExternalLink url="https://www.notion.so/amazingbutuseless/1a93f0efbcc74f7aa5decc412553c318">
              여기
            </ExternalLink>
            에 장면 삭제 요청을 남겨주세요.
          </p>
        </GuideItem>
        <GuideItem summary="등록된 장면의 시간 정보(시작 시간, 종료 시간)를 수정하고 싶어요.">
          <p>장면의 시작 시간이 아닌 종료 시간만을 수정 할 수 있습니다.</p>
          <p>
            특정 장면의 종료 시간을 수정하고 싶을 경우에는, 장면을 등록 했던 방식과 동일하게 해당
            장면의 시작 시간과 변경하려는 종료 시간을 장면 추가 입력란에 입력/등록 해주세요. 장면
            등록이 완료되면 기존에 등록되어 있던 장면을 덮어쓰게 됩니다.
          </p>
        </GuideItem>
        <GuideItem summary="장면을 추가했는데 섬네일 이미지가 표시되지 않아요.">
          <p>
            장면이 추가된 이후 ijustwannaseewonwoo는 장면을 구성하는 프레임들에서 세븐틴 멤버들을
            찾아내고, 그중 원우가 있는지를 확인하는 과정 - 즉 장면 분석 과정을 거칩니다. 그리고 분석
            결과에 원우가 나온 프레임이 포함될 경우, 정확도가 가장 높은 프레임을 섬네일 이미지로
            생성하게 됩니다.
          </p>
          <p>
            분석 결과에 따라 섬네일을 생성/표시하므로 아래의 경우에는 섬네일 이미지 표시가
            지연되거나, 섬네일 이미지가 표시되지 않을 수 있습니다.
          </p>
          <p>1. 장면 분석이 완료될 때까지 섬네일 이미지가 표시되지 않습니다.</p>
          <p>
            장면의 재생 시간(= 장면에 포함된 프레임 수), 사용자의 PC 성능 등의 이유로 장면 분석에
            시간이 오래 소요될 수 있습니다. 일반적으로 장면 분석에 필요한 시간은 장면 재생 시간과
            거의 동일하거나 짧습니다.
            <br />
            장면 분석이 완료되면 섬네일 이미지가 표시되니 염려하지 않으셔도 됩니다. 비디오 화면을
            벗어나도 장면 분석은 계속 진행되니, 섬네일 이미지가 표시될 때까지 일부러 비디오 화면에서
            기다릴 필요는 없어요!
          </p>
          <p>
            2. 장면 분석에서 세븐틴 멤버들의 얼굴을 찾아내지 못한 경우(또는 얼굴 인식의 정확도가
            낮은 경우)에는 섬네일 이미지가 표시되지 않습니다.
          </p>
          <p>
            분석이 완료되었다고 하더라도, 원우를 포함한 세븐팀 멤버들의 얼굴을 찾아내지 못했거나
            인식률이 낮을 경우에는 섬네일 이미지가 표시되지 않습니다.
            <br />
            3초 미만의 장면에서 특히 얼굴 인식의 정확도가 떨어지는 경향이 있습니다. 앞으로 인식률을
            높일 수 있는 방법을 좀 더 고민해볼게요.
          </p>
        </GuideItem>
        <GuideItem summary="장면 추가 후 표시되는 섬네일 이미지에 원우가 아닌 멤버가 표시 돼요.">
          <p>
            ijustwannaseewonwoo는 장면 등록 후 진행되는 장면 분석 과정에서 "원우 얼굴 인식률이 가장
            높은 프레임"을 섬네일 이미지로 선택합니다.
          </p>
          <p>
            만약 분석 중 원우가 나온 프레임을 찾을 수 없었을 경우, 세븐팀 멤버 중 가장 인식률이 좋은
            프레임을 섬네일 이미지로 제공합니다.
          </p>
        </GuideItem>
        <GuideItem summary="뭐가 뭔지 1도 모르겠다.">
          <p>저도요 😹</p>
          <p>
            ijustwannaseewonwoo를 이용하면서 생긴 궁금증이나 불편한 점, 필요한 기능 - 모두{' '}
            <ExternalLink url="https://github.com/amazingbutuseless/ijustwannaseewonwoo/issues">
              GitHub
            </ExternalLink>
            이나 <ExternalLink url="mailto:cindian@amazingbutuseless.net">이메일</ExternalLink>로
            알려주세요. 빠심으로 혐생을 이겨내고 덕질에 과몰입 해보겠습니다.
          </p>
        </GuideItem>
      </AddSceneGuideModalDialogWrapper>
    </>
  );
}
