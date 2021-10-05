import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle> & object;
  degree?: number;
  shadowColor?: string;
}

const ShadowBox: FC<Props> = ({
  children,
  style,
  degree = 1,
  shadowColor = 'black',
}) => {
  const shadowOffsetWidth = 0;
  const shadowOffsetHeight = 0.5;
  const shadowOpacity = 0.025;
  const ShadowRadius = 0.6666;
  const elevation = 1;

  const shadowStyle = {
    shadowColor: shadowColor,
    shadowOffset: {
      width: shadowOffsetWidth * degree,
      height: shadowOffsetHeight * degree,
    },
    shadowOpacity: shadowOpacity * degree,
    shadowRadius: ShadowRadius * degree,
    elevation: elevation * degree,
  };

  return <View style={{ ...style, ...shadowStyle }}>{children}</View>;
};

export default ShadowBox;
