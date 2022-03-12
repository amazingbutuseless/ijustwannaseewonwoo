import * as Styled from './style';

export default function Loading() {
  const start = Math.floor(Math.random() * 28);

  return (
    <>
      <Styled.Backdrop />
      <Styled.Wrapper>
        <video src={`/images/loading_web.mp4#t=${start}`} muted autoPlay loop />
      </Styled.Wrapper>
    </>
  );
}
