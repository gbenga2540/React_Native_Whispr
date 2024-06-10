import React, { useState } from 'react';
import { TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { colors } from 'src/design-system';
import { TextFieldProps } from './text-field.props';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import { fonts } from 'src/assets/fonts/fonts';

const defaultHeight = 53;
export function TextField({
  value,
  setValue,
  textStyle,
  isPassword,
  leftChild,
  rightChild,
  editable = true,
  ...props
}: TextFieldProps): React.JSX.Element {
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const CONTAINER: ViewStyle = {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: props.borderRadius || 11,
    backgroundColor: colors.inputBackground,
    minHeight: defaultHeight,
    opacity: editable ? 1 : 0.5,
    paddingHorizontal: 18,
    ...props,
  };

  const TEXT_INPUT: TextStyle = {
    flex: 1,
    fontFamily: fonts.primaryFont_400,
    fontSize: 16,
    textAlignVertical: props.multiline ? 'top' : 'center',
    marginVertical: props.multiline ? 3 : 0,
    borderWidth: 0,
    color: colors.grayText,
    minHeight: defaultHeight,
    ...textStyle,
  };

  return (
    <View style={CONTAINER}>
      {leftChild}
      <TextInput
        style={TEXT_INPUT}
        placeholder={props.placeholder || 'Start typing...'}
        placeholderTextColor={props.placeholderTextColor || colors.inputPLText}
        value={value}
        secureTextEntry={isPassword ? !showPwd : false}
        onChangeText={(text: string) => {
          setValue(text);
        }}
        onChange={props.onChange}
        onFocus={props.onFocus}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        inputMode={props.inputMode}
        autoFocus={props.autoFocus}
        editable={editable}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete}
        multiline={props.multiline}
      />
      {isPassword ? (
        <Button
          justifyContent="center"
          alignItems="center"
          backgroundColor={colors.transparent}
          onPress={() => setShowPwd(!showPwd)}
          height={defaultHeight}
          marginLeft={10}
          children={
            <Icon
              size={24}
              name={showPwd ? 'pwd-off' : 'pwd-on'}
              color={colors.inputBackground}
              stroke={colors.grayText}
            />
          }
        />
      ) : (
        rightChild
      )}
    </View>
  );
}
