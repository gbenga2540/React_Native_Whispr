import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Screen, Text, TextField } from 'src/components';
import { useAuth } from 'src/context/auth/interfaces';
import { LoginUserRequest } from 'src/domain/auth';
import { errorToast, successToast } from 'src/helpers';
import validator from 'validator';

const SignInScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();
  const { setUser } = useAuth();

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
    if (!validator.isEmail(loginData.email)) {
      errorToast({
        message: 'Invalid Email!',
      });
      return;
    }

    if (!loginData.password) {
      errorToast({
        message: 'Invalid Password!',
      });
      return;
    }

    //TODO: Run SignIn Logic
    successToast({
      message: 'User Logged in successfully logic!',
    });
    setUser({
      id: 'test',
    });

    setLoginData({
      email: '',
      password: '',
    });
  }, [loginData, setUser]);

  const navToSignUpScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignUpScreen',
    });
  };

  return (
    <Screen preset="scroll" baseAllowance={300}>
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
        textStyle={LINK_TEXT}
      />

      <Button
        text="Login"
        marginTop={8}
        onPress={loginUser}
        disabled={!(loginData.email && loginData.password)}
      />
    </Screen>
  );
};

export default SignInScreen;

const LINK_TEXT: TextStyle = {
  fontSize: 13,
};
