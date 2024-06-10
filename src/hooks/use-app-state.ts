import * as React from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { focusManager } from 'react-query';

export function useAppState() {
  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);
}
