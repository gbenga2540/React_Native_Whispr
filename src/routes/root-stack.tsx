import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './main/auth-stack';
import AppStack from './main/app-stack';

const Root = createNativeStackNavigator<RootStackParamList>();

export default function RootStack(): React.JSX.Element | null {
  const authStatus: boolean = false;

  return (
    <Root.Navigator
      initialRouteName={authStatus ? 'AppStack' : 'AuthStack'}
      screenOptions={{
        headerShown: false,
      }}>
      {/* Re-enable the below when authStatus is dynamic */}
      {/* {authStatus ? (
        <Root.Screen name="AppStack" component={AppStack} />
      ) : (
        <Root.Screen name="AuthStack" component={AuthStack} />
      )} */}
      <Root.Screen name="AppStack" component={AppStack} />
      <Root.Screen name="AuthStack" component={AuthStack} />
    </Root.Navigator>
  );
}
