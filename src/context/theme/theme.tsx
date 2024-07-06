import React, { useEffect, useState } from 'react';
import {
  CustomThemeContext,
  ICustomThemeProvider,
  ICustomTheme,
} from './interfaces';
import { Appearance, ColorSchemeName } from 'react-native';
import { IColors, colors } from '../../design-system/colors';

export const CustomThemeProvider: ICustomThemeProvider =
  function CustomThemeProvider({ children }) {
    const [customTheme, setCustomTheme] = useState<ICustomTheme>('system');
    const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
      Appearance.getColorScheme(),
    );

    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setSystemScheme(colorScheme);
      });

      return () => {
        subscription.remove();
      };
    }, []);

    const themeColors: IColors =
      customTheme === 'system'
        ? systemScheme === 'dark'
          ? colors.dark
          : colors.light
        : customTheme === 'light'
        ? colors.light
        : colors.dark;

    return (
      <CustomThemeContext.Provider
        value={{
          colors: themeColors,
          currentTheme: customTheme === 'system' ? systemScheme : customTheme,
          setCustomTheme,
        }}>
        {children}
      </CustomThemeContext.Provider>
    );
  };
