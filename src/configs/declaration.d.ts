declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const API_BASE_URL_DEV: string;
  export const API_BASE_URL_DEV_ANDROID: string;
  export const API_BASE_URL_PROD: string;
}
