import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { IColors } from '../../design-system/colors';
import { ColorSchemeName } from 'react-native';

export type ICustomTheme = 'system' | 'light' | 'dark';

export type ICustomThemeProvider = React.FC<{
  children: ReactNode;
}>;

export type ICustomThemeContext = {
  colors: IColors;
  currentTheme: ColorSchemeName;
  setCustomTheme: Dispatch<SetStateAction<ICustomTheme>>;
};

export const CustomThemeContext = createContext<ICustomThemeContext | null>(
  null,
);

export function useCustomTheme(): ICustomThemeContext {
  const context = useContext(CustomThemeContext);

  useEffect(function onDidMount() {
    if (!context) {
      console.error('useCustomTheme must have CustomThemeProvider as parent.');
    }
  });

  return context as ICustomThemeContext;
}
