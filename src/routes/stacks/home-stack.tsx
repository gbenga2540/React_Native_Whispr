import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamsList } from '../types';
import { homeRoutes } from '../routes';

const Home = createNativeStackNavigator<HomeStackParamsList>();

function HomeStack() {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {homeRoutes.map((screen, index) => {
        return (
          <Home.Screen
            key={index}
            {...screen}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </Home.Navigator>
  );
}

export default HomeStack;
