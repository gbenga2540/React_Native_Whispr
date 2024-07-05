import React, { useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from 'src/design-system';
import { OTPFieldProps } from './otp-field.props';
import { fonts } from 'src/assets/fonts/fonts';

const defaultHeight = 50;
export function OTPField({
  otpValue,
  setOTPValue,
  otpCount = 4,
  textStyle,
  editable = true,
  focusColor,
  ...props
}: OTPFieldProps): React.JSX.Element {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [currentInput, setCurrentInput] = useState<number>(0);

  const handleChange = (index: number, value: string) => {
    const newOTP = [...otpValue];
    newOTP[index] = value?.toString();

    if (value && index < otpCount - 1) {
      inputRefs.current[index + 1]?.focus();
      setCurrentInput(index + 1);
    }

    setOTPValue(newOTP);
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otpValue[index]) {
      const newOTP = [...otpValue];
      newOTP[index - 1] = '';
      inputRefs.current[index - 1]?.focus();
      setCurrentInput(index - 1);
      setOTPValue(newOTP);
    } else {
    }
  };

  const handleOnFocus = (index: number) => {
    setCurrentInput(index);
  };

  const CONTAINER: ViewStyle = {
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: defaultHeight,
    opacity: editable ? 1 : 0.5,
    ...props,
  };

  const TEXT_INPUT: TextStyle = {
    fontFamily: fonts.primaryFont_400,
    fontSize: 16,
    borderWidth: 2,
    color: colors.grayText,
    backgroundColor: colors.inputBackground,
    marginLeft: 3,
    marginRight: 3,
    width: defaultHeight,
    height: defaultHeight,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 8,
    borderColor: colors.inputPLText,
    ...textStyle,
  };

  const TEXT_INPUT_ACTIVE: TextStyle = {
    borderColor: focusColor || colors.primary,
  };

  return (
    <View style={CONTAINER}>
      {Array.from({ length: otpCount }, (_, index) => (
        <TextInput
          key={`${_} - ${index}`}
          placeholder="0"
          placeholderTextColor={
            props.placeholderTextColor || colors.inputPLText
          }
          style={{
            ...TEXT_INPUT,
            ...(index === currentInput && { ...TEXT_INPUT_ACTIVE }),
          }}
          value={otpValue[index]}
          onChangeText={(text: string) => {
            handleChange(index, text);
          }}
          onChange={props.onChange}
          onBlur={props.onBlur}
          blurOnSubmit={props.blurOnSubmit}
          onFocus={() => handleOnFocus(index)}
          autoCapitalize={props.autoCapitalize}
          autoCorrect={props.autoCorrect}
          inputMode={props.inputMode || 'numeric'}
          autoFocus={index === 0}
          editable={editable}
          maxLength={1}
          autoComplete={'off'}
          multiline={false}
          ref={ref => (inputRefs.current[index] = ref)}
          onKeyPress={e => handleKeyPress(index, e)}
        />
      ))}
    </View>
  );
}
