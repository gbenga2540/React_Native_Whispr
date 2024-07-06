import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './main/auth-stack';
import AppStack from './main/app-stack';
import { useAuth } from 'src/context/auth/interfaces';

const Root = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(): React.JSX.Element | null {
  const { user } = useAuth();
  const authStatus: boolean = user !== null;

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
