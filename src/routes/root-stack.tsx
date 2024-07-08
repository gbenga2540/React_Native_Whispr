import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './main/auth-stack';
import AppStack from './main/app-stack';
import { useAuthStore } from 'src/store/auth/auth.store';

const Root = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(): React.JSX.Element | null {
  const auth = useAuthStore().auth;
  const authStatus: boolean = Boolean(auth?.user?.user_id);

  return (
    <Root.Navigator
      initialRouteName={authStatus ? 'AppStack' : 'AuthStack'}
      screenOptions={{
        headerShown: false,
      }}>
      {authStatus ? (
        <Root.Screen name="AppStack" component={AppStack} />
      ) : (
        <Root.Screen name="AuthStack" component={AuthStack} />
      )}
    </Root.Navigator>
  );
}
