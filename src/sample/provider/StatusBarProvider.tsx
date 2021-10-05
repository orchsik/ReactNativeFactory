/**
 * StatusBar 색 지정 Provider
 * iOS 테스트 필요
 * withScreen 사용불가
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StatusBarProps,
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  StatusBarStyle,
} from 'react-native';
import createCtx from '../createCtx';
import { useTheme } from '../theme';

interface Context {
  setStatusBarHidden: (isHidden: boolean) => void;
  setStatusBarBackgroundColor: (color: string) => void;
  setStatusBarStyle: (barStyle: StatusBarStyle) => void;
}

const [useCtx, Provider] = createCtx<Context>();
interface Props {
  children: React.ReactElement;
  backgroundColor?: string;
  statusBarProps?: StatusBarProps;
}

function StatusBarProvider({
  children,
  backgroundColor,
  statusBarProps,
}: Props) {
  const { theme, themeType } = useTheme();

  const [hidden, setHidden] = useState<boolean>(
    statusBarProps?.hidden || false,
  );
  const [bgColor, setBackgroundColor] = useState<string>(
    backgroundColor || theme.background,
  );
  const [barStyle, setBarStyle] = useState<StatusBarStyle>(
    themeType === 'LIGHT' ? 'dark-content' : 'light-content',
  );

  const setStatusBarBackgroundColor = (color: string) => {
    setBackgroundColor(color);
  };

  const setStatusBarHidden = (isHidden: boolean) => {
    setHidden(isHidden);
  };

  const setStatusBarStyle = (statusBarStyle: StatusBarStyle) => {
    setBarStyle(statusBarStyle);
  };

  // console.log({ hidden, bgColor });
  return (
    <Provider
      value={{
        setStatusBarBackgroundColor,
        setStatusBarHidden,
        setStatusBarStyle,
      }}
    >
      {Platform.OS === 'ios' ? (
        <>
          <SafeAreaView
            style={[styles.topSafeArea, { backgroundColor: bgColor }]}
          />
          <SafeAreaView
            style={[styles.bottomSafeArea, { backgroundColor: 'white' }]}
          >
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>{children}</View>
          </SafeAreaView>
        </>
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar
            hidden={hidden}
            backgroundColor={bgColor}
            barStyle={barStyle}
            {...statusBarProps}
          />

          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      )}
    </Provider>
  );
}

export { useCtx as useStatusBar, StatusBarProvider };

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  // iOS
  topSafeArea: { flex: 0 },
  bottomSafeArea: { flex: 1 },
});
