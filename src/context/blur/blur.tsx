import React, { useState } from 'react';
import { BlurContext, IBlurProvider } from './interfaces';
import { BlurView } from '@react-native-community/blur';
import { ViewStyle } from 'react-native';
import { screenHeight, screenWidth } from '../../design-system';
import { useCustomTheme } from '../theme/interfaces';

const BLUR_CONTAINER: ViewStyle = {
  position: 'absolute',
  flex: 1,
  width: screenWidth,
  height: screenHeight,
};

export const BlurProvider: IBlurProvider = function BlurProvider({ children }) {
  const { currentTheme } = useCustomTheme();
  const [isBlur, setIsBlur] = useState<boolean>(false);

  return (
    <BlurContext.Provider
      value={{
        isBlur,
        setIsBlur,
      }}>
      {children}
      {isBlur && (
        <BlurView
          style={BLUR_CONTAINER}
          blurType={currentTheme === 'light' ? 'light' : 'dark'}
          blurAmount={10}
          reducedTransparencyFallbackColor={
            currentTheme === 'light'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(0, 0, 0, 0.5)'
          }
        />
      )}
    </BlurContext.Provider>
  );
};
