import { ViewStyle, TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { colors, getComputedWidth } from 'src/design-system';

/**
 * All Buttons will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  borderRadius: 11,
  height: 52,
  justifyContent: 'center',
  alignItems: 'center',
};

/**
 * All Texts will start off looking like this.
 */
const BASE_TEXT: TextStyle = {
  paddingHorizontal: 12,
  fontSize: getComputedWidth(16),
  fontFamily: fonts.primaryFont_400,
};

type buttonPresetsType = 'primary' | 'secondary' | 'link';
/**
 * All the variations of text styling within the app.
 */
export const buttonPresets: Record<buttonPresetsType, ViewStyle> = {
  /**
   * A smaller piece of secondary information.
   */
  primary: { ...BASE_VIEW, backgroundColor: colors.primary } as ViewStyle,

  secondary: {
    ...BASE_VIEW,
    backgroundColor: colors.secondary,
  } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    height: 'auto',
  } as ViewStyle,
};

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: {
    ...BASE_TEXT,
    color: colors.white,
  } as TextStyle,

  secondary: {
    ...BASE_TEXT,
    color: colors.white,
  } as TextStyle,

  link: {
    ...BASE_TEXT,
    color: colors.linkText,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
};

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof buttonPresets;
