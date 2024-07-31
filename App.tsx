/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent } from 'react';
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

const App: FunctionComponent = () => {
  const queryClient = new QueryClient();

  useAppState();
  useOnlineManager();

  return (
    <CustomThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GestureHandlerRootView style={DEFAULT_CONTAINER}>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <BlurProvider>
                  <NavigationContainer
                    onReady={() =>
                      Platform.OS === 'android' && SplashScreen.hide()
                    }>
                    <RootStack />
                  </NavigationContainer>
                </BlurProvider>
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer />
    </CustomThemeProvider>
  );
};

export default App;
