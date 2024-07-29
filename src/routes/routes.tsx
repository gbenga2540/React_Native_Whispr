import { ComponentType } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  AuthStackParamList,
  AppStackParamList,
  HomeStackParamsList,
} from './types';

// Stacks to be injected into AppStack
import HomeStack from './stacks/home-stack';

// Screens for the Auth Stack
import SignInScreen from 'src/screens/auth/sign-in-screen';
import SignUpScreen from 'src/screens/auth/sign-up-screen';
import OTPScreen from 'src/screens/auth/otp-screen';

// Screens for the Home Stack
import HomeScreen from 'src/screens/home/home-screen';
import ChatScreen from 'src/screens/home/chat-screen';

interface Route<List extends Record<string, object | undefined>> {
  name: keyof List;
  component: ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

export const authRoutes: Array<Route<AuthStackParamList>> = [
  { name: 'SignInScreen', component: SignInScreen },
  { name: 'SignUpScreen', component: SignUpScreen },
  { name: 'OTPScreen', component: OTPScreen },
];
export const appRoutes: Array<Route<AppStackParamList>> = [
  { name: 'HomeStack', component: HomeStack },
];

export const homeRoutes: Array<Route<HomeStackParamsList>> = [
  { name: 'HomeScreen', component: HomeScreen },
  { name: 'ChatScreen', component: ChatScreen },
];
