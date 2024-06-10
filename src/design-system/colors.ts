import { Appearance } from 'react-native';
const isDarkMode = Appearance.getColorScheme() === 'dark';

export const colors = {
  background: isDarkMode ? '#0f0f0f' : '#fafafa',
  primary: '#0f9932',
  secondary: '#b800b8',
  grayText: isDarkMode ? '#fafafa' : '#3f3f3f',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  inputBackground: isDarkMode ? '#1a1a1a' : '#efefef',
  inputPLText: isDarkMode ? '#6a6a6a' : '#9f9f9f',
  linkText: isDarkMode ? '#4aa3ff' : '#007bff',
};
