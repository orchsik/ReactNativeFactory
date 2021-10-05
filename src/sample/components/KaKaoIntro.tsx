import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { IC_MASK } from '../../../utils/Icons';
import Button from '../../../utils/components/samples/Button';
import IntroTemp from '../../../utils/components/samples/IntroTemp.disable';

import { H_rn, H_scale } from '../../../utils';

const { alertConfirm } = H_rn;
const { ss } = H_scale;

type Props = {
  // navigation: RootStackNavigationProps;
  // route: InterviewStackRouteProps<'Screen4'>;
};

// const KaKaoIntro: React.FC = (props: any) => {
function KaKaoIntro(props: Props): React.ReactElement {
  // const navigation = useNavigation<InterviewStackNavigationProps>();
  // const route = useRoute<InterviewStackRouteProps>();
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      setResult(JSON.stringify(token));
    } catch (error) {
      console.error('[signInWithKakao]', { error });
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getKakaoProfile();

    setResult(JSON.stringify(profile));
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    setResult(message);
  };

  return (
    <ContainerX style={{ flex: 1 }}>
      <IntroTemp result={result} />

      <ButtonWrapper>
        <Button
          testID="btn-login"
          style={{
            backgroundColor: '#FEE500',
            borderRadius: 40,
            borderWidth: 1,
          }}
          textStyle={{
            color: 'black',
            fontSize: 18,
          }}
          imgLeftSrc={IC_MASK}
          onPress={() => signInWithKakao()}
          text={'카카오 로그인'}
        />
        <View style={{ marginTop: 12 }} />

        <Button
          testID="btn-login"
          style={{
            backgroundColor: '#FEE500',
            borderRadius: 40,
            borderWidth: 1,
          }}
          textStyle={{
            color: 'black',
            fontSize: 16,
          }}
          imgLeftSrc={IC_MASK}
          onPress={() => getProfile()}
          text={'프로필 조회'}
        />
        <View style={{ marginTop: 12 }} />
        <Button
          testID="btn-login"
          style={{
            backgroundColor: '#FEE500',
            borderRadius: 40,
            borderWidth: 1,
          }}
          textStyle={{
            color: 'black',
            fontSize: 16,
          }}
          imgLeftSrc={IC_MASK}
          onPress={() => unlinkKakao()}
          text={'링크 해제'}
        />
        <View style={{ marginTop: 12 }} />
        <Button
          testID="btn-login"
          style={{
            backgroundColor: '#FEE500',
            borderRadius: 40,
            borderWidth: 1,
          }}
          textStyle={{
            color: 'black',
            fontSize: 16,
          }}
          imgLeftSrc={IC_MASK}
          onPress={() => signOutWithKakao()}
          text={'카카오 로그아웃'}
        />
        <View style={{ marginTop: 12 }} />

        <Button
          testID="btn-login"
          style={{
            backgroundColor: '#FEE500',
            borderRadius: 40,
            borderWidth: 1,
          }}
          textStyle={{
            color: 'black',
            fontSize: 16,
          }}
          imgLeftSrc={IC_MASK}
          // onPress={() => props.navigation.replace('Login')}
          text={'navigate Login'}
        />
        <View style={{ marginTop: 12 }} />

        <Button
          testID="btn-login"
          style={{
            backgroundColor: '#FEE500',
            borderRadius: 40,
            borderWidth: 1,
          }}
          textStyle={{
            color: 'black',
            fontSize: 16,
          }}
          imgLeftSrc={IC_MASK}
          // onPress={() => props.navigation.replace('Pass')}
          text={'navigate Pass'}
        />
        <View style={{ marginTop: 12 }} />

        <Button
          testID="btn-login"
          style={{
            backgroundColor: '#FEE500',
            borderRadius: 40,
            borderWidth: 1,
          }}
          textStyle={{
            color: 'black',
            fontSize: 16,
          }}
          imgLeftSrc={IC_MASK}
          // onPress={() => props.navigation.replace('Home')}
          text={'navigate Home'}
        />
        <View style={{ marginTop: 40 }} />
      </ButtonWrapper>
    </ContainerX>
  );
}

const ContainerX = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }) => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40px;
  width: 85%;
  align-self: center;
`;

export default KaKaoIntro;
