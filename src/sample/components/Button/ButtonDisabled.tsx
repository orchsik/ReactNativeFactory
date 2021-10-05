import React, { FC } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import { StyledButton } from './BtnStyled';
import { BtnText } from './BtnStyled';

const StyledButtonDisabled = styled(StyledButton)`
  background-color: ${({ theme }) => theme.disabled};
  border-color: rgb(200, 200, 200);
`;

const StyledTextDisabled = styled(BtnText)`
  color: ${({ theme }) => theme.disabledText};
`;

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
};

const ButtonDisabled: FC<Props> = ({ style, textStyle, text }) => {
  return (
    <StyledButtonDisabled style={style}>
      <StyledTextDisabled style={textStyle}>{text}</StyledTextDisabled>
    </StyledButtonDisabled>
  );
};

export default ButtonDisabled;
