export interface IColors {
  background: string;
  primary: string;
  secondary: string;
  grayText: string;
  white: string;
  black: string;
  transparent: string;
  inputBackground: string;
  ddInputBackground: string;
  inputPLText: string;
  linkText: string;
}

export const colors: { light: IColors; dark: IColors } = {
  light: {
    background: '#fafafa',
    primary: '#f06c62',
    secondary: '#0cad07',
    grayText: '#3f3f3f',
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    inputBackground: '#efefef',
    ddInputBackground: '#e4e4e4',
    inputPLText: '#9f9f9f',
    linkText: '#007bff',
  },
  dark: {
    background: '#0f0f0f',
    primary: '#f06c62',
    secondary: '#0cad07',
    grayText: '#fafafa',
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    inputBackground: '#1a1a1a',
    ddInputBackground: '#2b2b2b',
    inputPLText: '#6a6a6a',
    linkText: '#4aa3ff',
  },
};
