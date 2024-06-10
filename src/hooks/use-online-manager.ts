import * as React from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';
import { Platform } from 'react-native';

export function useOnlineManager() {
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state: NetInfoState) => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable),
        );
      });
    }
  }, []);
}
