import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';
import { appRoutes } from '../routes';

const App = createNativeStackNavigator<AppStackParamList>();

export default function AppStack(): React.JSX.Element | null {
  return (
    <App.Navigator
      initialRouteName={'HomeStack'}
      screenOptions={{
        headerShown: false,
      }}>
      {appRoutes.map((screen, idx) => {
        return (
          <App.Screen
            key={idx}
            {...screen}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </App.Navigator>
  );
}
