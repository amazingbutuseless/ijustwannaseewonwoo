import styled from '@emotion/styled';

interface LogoWrapperStyleProps {
  randomCat: string;
}

export const LogoWrapper = styled.h1`
  position: relative;

  margin: 0 auto;
  padding: 0;
  width: 3.2rem;
  height: 3.2rem;
  text-align: center;

  font-size: 3.2rem;

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
    content: '${({ randomCat }: LogoWrapperStyleProps) => randomCat}';
  }
`;
