// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import T from 'prop-types';

// import { H_Scale, H_Utils } from '../../utils/iilliil';
// const { vs, s, ds, ms, WINDOW_HEIGHT, WINDOW_WIDTH } = H_Scale;
// const { checkSameArr } = H_Utils;

// const pickerSelectStyles = (
//   width,
//   height,
//   borderWidth,
//   borderColor,
//   marginVertical,
//   fontSize,
//   color,
// ) => {
//   return StyleSheet.create({
//     inputAndroid: {
//       height,
//       width,
//       fontSize: fontSize ? fontSize : height * 0.3,
//       marginVertical: marginVertical ? marginVertical : 0,
//       paddingHorizontal: 0,
//       borderWidth: borderWidth ? borderWidth : 0,
//       borderColor: borderColor ? borderColor : 'grey',
//       color,
//       paddingRight: s(30), // to ensure the text is never behind the icon
//     },
//     inputIOS: {
//       height,
//       width,
//       fontSize: fontSize ? fontSize : height * 0.3,
//       marginVertical: marginVertical ? marginVertical : 0,
//       paddingHorizontal: 0,
//       borderWidth: borderWidth ? borderWidth : 0,
//       borderColor: borderColor ? borderColor : 'grey',
//       color,
//       paddingRight: s(30), // to ensure the text is never behind the icon,
//     },
//   });
// };

// const initItems = [{ label: '', value: '' }];

// const PickerStyled = (props) => {
//   const {
//     placeholder,
//     items,
//     onValueChange,
//     value,
//     width,
//     height,
//     borderWidth,
//     backgroundColor,
//     borderColor,
//     marginVertical,
//     fontSize,
//     themeColors,
//     leftIcon,
//     arrowDown,
//   } = props;
//   const { CONTENTS_TEXT_COLOR, INACTIVE_COLOR } = themeColors;

//   // const [pickerItems, setPrevItems] = useState(initItems);
//   // useEffect(() => {
//   //   const newItems = items || initItems;
//   //   if (!checkSameArr(pickerItems, newItems)) {
//   //     setPrevItems([...newItems]);
//   //   }
//   // }, [pickerItems, items]);
//   const pickerItems = items || [{ label: '', value: '' }];

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         paddingHorizontal: s(15),
//         backgroundColor,
//       }}
//     >
//       <View
//         style={{
//           width: s(60),
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginRight: s(10),
//         }}
//       >
//         {leftIcon}
//       </View>
//       <RNPickerSelect
//         placeholder={placeholder}
//         items={pickerItems}
//         value={value}
//         onValueChange={onValueChange}
//         style={{
//           ...pickerSelectStyles(
//             width - s(60),
//             height,
//             borderWidth,
//             borderColor,
//             marginVertical,
//             fontSize,
//             CONTENTS_TEXT_COLOR,
//           ),
//           iconContainer: { top: height * 0.4, right: width * 0.02 },
//         }}
//         Icon={() => {
//           if (!arrowDown) return null;
//           return (
//             <SimpleLineIcons
//               name="arrow-down"
//               color={INACTIVE_COLOR}
//               size={vs(23)}
//             />
//           );
//         }}
//         useNativeAndroidPickerStyle={false}
//         doneText="확인"
//       />
//     </View>
//   );
// };

// PickerStyled.defaultProps = {
//   onValueChange: () => {},
//   placeholder: { label: 'Select a items...', value: null },
//   items: [{ label: '------', value: '------' }],
//   value: '',
// };

// PickerStyled.propTypes = {
//   placeholder: T.any,
//   items: T.any,
//   onValueChange: T.any,
//   value: T.any,
//   width: T.any,
//   height: T.any,
//   borderWidth: T.any,
//   borderColor: T.any,
//   marginVertical: T.any,
//   fontSize: T.any,
// };

// export default PickerStyled;
