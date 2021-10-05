import React from 'react';
import { Modal, Text, Pressable, View } from 'react-native';
import styled from 'styled-components/native';

import { Segment } from './HStyled';
import modalStyles from '../../pages/uis/modalStyles';

import { H_colors, H_scale, H_theme } from '..';
const { ss } = H_scale;

type Info = {
  title?: string;
  subject?: string;
  description?: string;
};

type ButtonObj = {
  text?: string;
  action?: Function;
};

const ModalPopup = ({
  visible,
  offVisible,
  info,
  okBtn,
  cancelBtn,
  otherBtn,
}: {
  visible: boolean;
  offVisible: Function;
  info?: Info;
  okBtn?: ButtonObj;
  cancelBtn?: ButtonObj;
  otherBtn?: ButtonObj;
}) => {
  const { theme } = H_theme.useTheme();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => offVisible()}
    >
      <View style={[modalStyles.centeredView, modalStyles.modalWrapper]}>
        <View style={[modalStyles.modalView, modalStyles.shadow]}>
          <Title>{info?.title || ''} </Title>

          <Segment marginTop={10} />
          <Subject>{info?.subject || ''}</Subject>

          <Segment marginTop={10} />
          <Description>{info?.description || ''}</Description>

          <Segment marginTop={10} />
          <View style={modalStyles.buttonWrapper}>
            <Pressable
              style={[modalStyles.button, { backgroundColor: theme.primary }]}
              onPress={async () => {
                if (okBtn?.action) await okBtn.action();
              }}
            >
              <Text
                style={[modalStyles.textStyle, { color: theme.primaryText }]}
              >
                {okBtn?.text || '확인'}
              </Text>
            </Pressable>

            <Segment marginLeft={10} />
            <Pressable
              style={[modalStyles.button, { backgroundColor: theme.secondary }]}
              onPress={async () => {
                if (cancelBtn?.action) await cancelBtn.action();
                offVisible();
              }}
            >
              <Text
                style={[modalStyles.textStyle, { color: theme.secondaryText }]}
              >
                {cancelBtn?.text || '취소'}
              </Text>
            </Pressable>
          </View>

          {otherBtn && (
            <>
              <Segment marginTop={10} />
              <View style={modalStyles.buttonWrapper}>
                <Pressable
                  style={[
                    modalStyles.button,
                    { backgroundColor: H_colors.indigo[1] },
                  ]}
                  onPress={async () => {
                    if (otherBtn?.action) await otherBtn.action();
                    offVisible();
                  }}
                >
                  <Text style={[modalStyles.textStyle, { color: 'black' }]}>
                    {otherBtn?.text || '나중에'}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const Title = styled.Text`
  fontSize: ${ss(17) + 'px'} 
  fontWeight: bold
  color: ${({ theme }) => theme.primary} 
`;

const Subject = styled.Text`
  fontSize: ${ss(16) + 'px'} 
  color: ${({ theme }) => theme.primary} 
`;

const Description = styled.Text`
  font-size: ${ss(16) + 'px'};
`;

export default ModalPopup;
