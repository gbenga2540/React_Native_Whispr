/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppState } from './src/hooks/use-app-state';
import { useOnlineManager } from './src/hooks/use-online-manager';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DEFAULT_CONTAINER } from './src/assets/styles/global';
import RootStack from 'src/routes/root-stack';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';
import { CustomThemeProvider } from 'src/context/theme/theme';
import { AuthProvider } from 'src/context/auth/auth';
import { BlurProvider } from 'src/context/blur/blur';
import { QueryClient, QueryClientProvider } from 'react-query';
import ToastContainer from 'react-native-toast-message';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SocketProvider } from 'src/context/socket/socket';
import { checkAndRequestNotificationPermission } from 'src/utils/check-permissions';
import instance from 'src/configs/axios';

const App: FunctionComponent = () => {
  const queryClient = new QueryClient();

  useAppState();
  useOnlineManager();

  useEffect(() => {
    // Wake the server
    const preload_svr = async () => {
      try {
        await instance.get('/');
      } catch (error) {}
    };

    preload_svr();
    checkAndRequestNotificationPermission();
  }, []);

  return (
    <CustomThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GestureHandlerRootView style={DEFAULT_CONTAINER}>
            <SafeAreaProvider>
              <NavigationContainer
                onReady={() =>
                  Platform.OS === 'android' && SplashScreen.hide()
                }>
                <SocketProvider>
                  <BottomSheetModalProvider>
                    <BlurProvider>
                      <RootStack />
                    </BlurProvider>
                  </BottomSheetModalProvider>
                </SocketProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer />
    </CustomThemeProvider>
  );
};

export default App;
