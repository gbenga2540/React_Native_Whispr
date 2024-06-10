import { ComponentType } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  AuthStackParamList,
  AppStackParamList,
  HomeStackParamsList,
} from './types';

// Used directly in the authStack
import SignInScreen from 'src/screens/auth/sign-in-screen';
import SignUpScreen from 'src/screens/auth/sign-up-screen';

// Stack for HomeScreens to be injected into AppStack
import HomeStack from './stacks/home-stack';

// Screens for Home Stack
import HomeScreen from 'src/screens/home/home-screen';

interface Route<List extends Record<string, object | undefined>> {
  name: keyof List;
  component: ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

export const authRoutes: Array<Route<AuthStackParamList>> = [
  { name: 'SignInScreen', component: SignInScreen },
  { name: 'SignUpScreen', component: SignUpScreen },
];
export const appRoutes: Array<Route<AppStackParamList>> = [
  {
    name: 'HomeStack',
    component: HomeStack,
  },
];

export const homeRoutes: Array<Route<HomeStackParamsList>> = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
  },
];
