import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList> | undefined;
  AppStack: NavigatorScreenParams<AppStackParamList> | undefined;
};

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type AppStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamsList> | undefined;
};

export type HomeStackParamsList = {
  HomeScreen: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type HomeStackScreenProps<Screen extends keyof HomeStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamsList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export {};
