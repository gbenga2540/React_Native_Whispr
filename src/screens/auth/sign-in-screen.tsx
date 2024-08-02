import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Screen, Text, TextField } from 'src/components';
import { saveString } from 'src/configs/storage';
import { strings } from 'src/configs/strings';
import { LoginUserRequest, useLoginUser } from 'src/domain/auth';
import { errorToast, successToast } from 'src/helpers';
import { useAuthStore } from 'src/store/auth/auth.store';
import validator from 'validator';

const SignInScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();
  const updateAuth = useAuthStore().updateAuth;

  const { mutate: loginMutate, isLoading } = useLoginUser();

  const [loginData, setLoginData] = useState<LoginUserRequest>({
    email: '',
    password: '',
  });

  const handleInputChange = (key: keyof LoginUserRequest, val: string) => {
    setLoginData(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const loginUser = useCallback(() => {
    try {
      if (!validator.isEmail(loginData.email.trim())) {
        errorToast({
          message: 'Invalid Email!',
        });
        return;
      }

      if (validator.isEmpty(loginData.password.trim())) {
        errorToast({
          message: 'Invalid Password!',
        });
        return;
      }

      loginMutate(
        {
          email: loginData.email.trim(),
          password: loginData.password.trim(),
        },
        {
          onError: (error, _variables, _context) => {
            errorToast({
              message:
                (error as any)?.response?.data?.msg ||
                (error as Error)?.message,
            });
          },
          onSuccess: async (data, _variables, _context) => {
            if (data.data?.token) {
              await saveString(strings.userToken, data.data.token);
              updateAuth(data.data);
              successToast({
                title: 'Authentication',
                message: 'User Logged in successfully!',
              });
              setLoginData({
                email: '',
                password: '',
              });
            } else {
              errorToast({
                message: data.msg,
              });
            }
          },
        },
      );
    } catch (error) {
      errorToast({
        message:
          (error as any)?.response?.data?.msg ||
          (error as Error)?.message ||
          'Something went wrong!',
      });
    }
  }, [loginData, loginMutate, updateAuth]);

  const navToSignUpScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignUpScreen',
    });
  };

  return (
    <Screen preset="scroll">
      <Text
        text="Welcome Back!"
        marginTop={40}
        marginBottom={25}
        fontSize={28}
        fontFamily={fonts.primaryFont_700}
      />

      <Text
        text="Email"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={loginData.email}
        setValue={text => handleInputChange('email', text as string)}
        placeholder="johndoe@gmail.com"
        autoCapitalize="none"
        inputMode="email"
        // autoFocus={true}
      />

      <Text
        text="Password"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={loginData.password}
        setValue={text => handleInputChange('password', text as string)}
        placeholder="********"
        secureTextEntry
        isPassword
      />

      <Button
        text="Don't have an account?"
        preset="link"
        marginLeft={'auto'}
        marginTop={15}
        marginBottom={3}
        onPress={navToSignUpScreen}
      />

      <Button
        text="Login"
        marginTop={8}
        onPress={loginUser}
        isLoading={isLoading}
        disabled={!(loginData.email && loginData.password)}
      />
    </Screen>
  );
};

export default SignInScreen;
