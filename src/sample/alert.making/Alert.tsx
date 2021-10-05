import React, { FunctionComponent, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';

import { hs, ss } from '../lib/scale';
import { H_colors } from '../theme/colors';

export interface Props {
  type?: string;
  isOpen: boolean;
  message?: string;
  okText?: string;
  okFunc?: Function;
  cancelText?: string;
  cancelFunc?: Function;
  // subject?: string;
}

// isOpen: false, message: '', okText: 'OK'
const BasicModal: FunctionComponent<Props> = ({
  type = '',
  isOpen = false,
  message = '',
  okText = '예',
  okFunc = () => true,
  cancelText,
  cancelFunc,
}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const _okFunc = () => {
    okFunc();
    setModalVisible(!modalVisible);
  };

  const _cancelFunc = () => {
    cancelFunc && cancelFunc();
    setModalVisible(!modalVisible);
  };

  return (
    <View style={[styles.centeredView]}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={[
            styles.centeredView,
            {
              flex: 1,
              width: '100%',
              backgroundColor: H_colors.transparency[7],
            },
          ]}
        >
          <View
            style={[
              styles.modalView,
              { width: '75%', borderWidth: 5, borderColor: 'red' },
            ]}
          >
            <Text style={{ fontSize: ss(18) }}>Subject</Text>
            <Text style={{ fontSize: ss(14) }}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </Text>
            <View style={{ marginTop: ss(20) }}></View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { paddingHorizontal: 10, width: hs(46) },
                ]}
                onPress={() => _okFunc()}
              >
                <Text style={[styles.textStyle, { fontSize: ss(10) }]}>예</Text>
              </Pressable>
              <View style={{ marginLeft: ss(10) }}></View>

              {cancelText && (
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { paddingHorizontal: 10, width: hs(46) },
                  ]}
                  onPress={() => _cancelFunc()}
                >
                  <Text style={[styles.textStyle, { fontSize: ss(10) }]}>
                    아니오
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
  },
  modalView: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default BasicModal;

// <HTextInput
//           subject="subject"
//           //  subjectStyle={styles.subject}
//           textInputProps={
//             {
//               //  onPressIn: () => scrollAuto(1),
//               //  autoCapitalize: 'none',
//               //  secureTextEntry: true,
//               //  value: Password,
//               //  placeholder: '8자 이상 영문/숫자 모두 포함',
//               //  onChangeText: (value) => onChangeTextInput('Password', value),
//             }
//           }
//           //  textStyle={styles.textInput}
//           //  alert={
//           //    pwdValidation
//           //      ? ''
//           //      : '총 8자 이상 영문/숫자를 각각 한 자 이상 입력해주세요.'
//           //  }
//         />
