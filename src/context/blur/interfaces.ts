import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from 'react';

export type IBlurProvider = React.FC<{
  children: ReactNode;
}>;

export type IBlurContext = {
  isBlur: boolean;
  setIsBlur: Dispatch<SetStateAction<boolean>>;
};

export const BlurContext = createContext<IBlurContext | null>(null);

export function useBlur(): IBlurContext {
  const context = useContext(BlurContext);

  useEffect(function onDidMount() {
    if (!context) {
      console.error('useBlur must have BlurProvider as parent.');
    }
  });

  return context as IBlurContext;
}
