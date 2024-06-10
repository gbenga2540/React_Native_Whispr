import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import { authRoutes } from '../routes';

const Auth = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack(): React.JSX.Element | null {
  return (
    <Auth.Navigator
      initialRouteName={'SignInScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      {authRoutes.map((screen, idx) => {
        return (
          <Auth.Screen
            key={idx}
            {...screen}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </Auth.Navigator>
  );
}
