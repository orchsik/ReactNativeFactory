import React, { FC } from 'react';
import {
  TouchableOpacity,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

import { BtnText } from './BtnStyled';
import { StyledButton } from './BtnStyled';
import { H_scale } from '../../../index';

const { ss } = H_scale;
const StyledText = styled(BtnText)``;

const StyledImage = styled.Image`
  width: ${ss(25)}px;
  height: ${ss(25)}px;s
  position: absolute;
  left: 16px;
`;

type Props = {
  testID?: TouchableOpacityProps['testID'];
  activeOpacity?: TouchableOpacityProps['activeOpacity'];
  onPress?: TouchableOpacityProps['onPress'];
  imgLeftSrc?: ImageSourcePropType;
  imgLeftStyle?: StyleProp<ImageStyle>;
  style?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
};

const Button: FC<Props> = ({
  testID,
  activeOpacity = 0.7,
  onPress,
  imgLeftSrc,
  imgLeftStyle,
  style,
  textStyle,
  text = '',
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      <StyledButton style={style}>
        {imgLeftSrc ? (
          <StyledImage style={imgLeftStyle} source={imgLeftSrc} />
        ) : null}
        <StyledText style={textStyle}>{text}</StyledText>
      </StyledButton>
    </TouchableOpacity>
  );
};

export default Button;
