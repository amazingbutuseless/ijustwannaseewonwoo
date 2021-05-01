import styled from '@emotion/styled';

const GoogleSignInButton = styled.button`
  align-self: center;

  margin-top: 0.8rem;
  width: 191px;
  height: 46px;
  border: 0;
  background-color: transparent;
  background-image: url('static:///assets/images/btn_google_signin_light_normal_web@2x.png');
  background-repeat: no-repeat;
  background-size: contain;

  &:hover {
    background-image: url('static:///assets/images/btn_google_signin_light_focus_web@2x.png');
  }

  &:active {
    background-image: url('static:///assets/images/btn_google_signin_light_pressed_web@2x.png');
  }
`;

export default GoogleSignInButton;
