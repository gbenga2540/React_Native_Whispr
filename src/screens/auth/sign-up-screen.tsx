import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { fonts } from 'src/assets/fonts/fonts';
import { images } from 'src/assets/images/images';
import {
  Button,
  Screen,
  Text,
  TextField,
  Image,
  View,
  Icon,
} from 'src/components';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { RegisterUserRequest, useGetOTP } from 'src/domain/auth';
import { errorToast, infoToast } from 'src/helpers';
import validator from 'validator';
import {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const SignUpScreen: FunctionComponent = (): React.JSX.Element => {
  const { colors } = useCustomTheme();
  interface IRegisterUserRequest extends RegisterUserRequest {
    confirm_password: string;
  }

  const navigation = useNavigation();
  const { mutate: getOTPMutate, isLoading } = useGetOTP();

  const [registerData, setRegisterData] = useState<IRegisterUserRequest>({
    email: '',
    user_name: '',
    bio: '',
    full_name: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });
  const [profilePicture, setProfilePicture] = useState<Asset | null>(null);

  const openCamera = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
    };
    const result = await launchCamera(options);

    if (result.didCancel) {
      errorToast({
        message: 'User cancelled image selection',
      });
      return;
    }

    if (result.errorCode) {
      errorToast({
        message: result.errorCode,
      });
      return;
    }

    if (result.errorMessage) {
      errorToast({
        message: result.errorMessage,
      });
      return;
    }

    if (result.assets && (result.assets || [])?.length > 0) {
      setProfilePicture(result.assets[0]);
    }

    return;
  };

  const openGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
    };
    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      errorToast({
        message: 'User cancelled image selection',
      });
      return;
    }

    if (result.errorCode) {
      errorToast({
        message: result.errorCode,
      });
      return;
    }

    if (result.errorMessage) {
      errorToast({
        message: result.errorMessage,
      });
      return;
    }

    if (result.assets && (result.assets || [])?.length > 0) {
      setProfilePicture(result.assets[0]);
    }

    return;
  };

  const clearProfilePicture = () => {
    setProfilePicture(null);
  };

  const handleInputChange = (key: keyof IRegisterUserRequest, val: string) => {
    setRegisterData(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const sendOTP = useCallback(() => {
    try {
      if (validator.isEmpty(registerData.user_name.trim())) {
        errorToast({
          message: 'Invalid Username!',
        });
        return;
      }

      if (validator.isEmpty(registerData.full_name.trim())) {
        errorToast({
          message: 'Invalid Full Name!',
        });
        return;
      }

      if (validator.isEmpty(registerData.bio.trim())) {
        errorToast({
          message: 'Bio cannot be empty!',
        });
        return;
      }

      if (!validator.isMobilePhone(registerData.phone_number.trim())) {
        errorToast({
          message: 'Invalid Phone Number!',
        });
        return;
      }

      if (!validator.isEmail(registerData.email.trim())) {
        errorToast({
          message: 'Invalid Email!',
        });
        return;
      }

      if (!validator.isStrongPassword(registerData.password.trim())) {
        infoToast({
          message:
            'Password must be 8+ chars with upper, lower, number & special char.',
        });
        return;
      }

      if (
        registerData.password.trim() !== registerData.confirm_password.trim()
      ) {
        errorToast({
          message: 'Passwords do not match!',
        });
        return;
      }

      getOTPMutate(
        {
          email: registerData.email.trim(),
          phone_number: registerData.phone_number.trim(),
          user_name: registerData.user_name.trim(),
        },
        {
          onError(error, _variables, _context) {
            errorToast({
              message: (error as any)?.response?.data?.msg,
            });
          },
          onSuccess(data, _variables, _context) {
            if (data.data) {
              navigation.navigate('AuthStack', {
                screen: 'OTPScreen',
                params: {
                  bio: registerData.bio.trim(),
                  email: registerData.email.trim(),
                  full_name: registerData.full_name.trim(),
                  password: registerData.password.trim(),
                  phone_number: registerData.phone_number.trim(),
                  user_name: registerData.user_name.trim(),
                  profile_picture: profilePicture,
                },
              });

              // setRegisterData({
              //   email: '',
              //   user_name: '',
              //   bio: '',
              //   full_name: '',
              //   phone_number: '',
              //   password: '',
              //   confirm_password: '',
              // });
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
        message: 'Something went wrong!',
      });
    }
  }, [registerData, navigation, getOTPMutate, profilePicture]);

  const navToSignInScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignInScreen',
    });
  };

  return (
    <Screen preset="scroll">
      <Text
        text="Let's get you started!"
        marginTop={40}
        marginBottom={40}
        fontSize={28}
        fontFamily={fonts.primaryFont_700}
      />

      <View flex={1} marginBottom={15} flexDirection="row">
        <View
          width={120}
          height={120}
          justifyContent="center"
          alignItems="center"
          borderWidth={2}
          borderColor={colors.inputPLText}
          borderRadius={80}>
          <Image
            sourceFile={profilePicture ? profilePicture : images().default_user}
            width={110}
            height={110}
            borderRadius={110}
          />
        </View>

        <View
          width={120}
          marginLeft={'auto'}
          flexDirection="row"
          flexWrap="wrap"
          gap={10}>
          <Button
            width={50}
            height={50}
            onPress={openCamera}
            borderRadius={50}
            backgroundColor={colors.inputBackground}
            children={<Icon name="camera" width={28} height={28} />}
          />

          <Button
            width={50}
            height={50}
            borderRadius={50}
            onPress={openGallery}
            backgroundColor={colors.inputBackground}
            children={
              <Icon
                name="gallery"
                width={26}
                height={26}
                color={colors.inputBackground}
              />
            }
          />

          <Button
            width={50}
            height={50}
            onPress={clearProfilePicture}
            borderRadius={50}
            backgroundColor={colors.inputBackground}
            children={
              <Icon
                name="close"
                width={25}
                height={25}
                color={colors.inputBackground}
              />
            }
          />
        </View>
      </View>

      <Text
        text="Username"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.user_name}
        setValue={text => handleInputChange('user_name', text as string)}
        placeholder="johndoe"
        // autoFocus={true}
      />

      <Text
        text="Full Name"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.full_name}
        setValue={text => handleInputChange('full_name', text as string)}
        placeholder="John Doe"
      />

      <Text
        text="Bio"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.bio}
        setValue={text => handleInputChange('bio', text as string)}
        placeholder="Enter a bio..."
      />

      <Text
        text="Phone Number"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.phone_number}
        setValue={text => handleInputChange('phone_number', text as string)}
        placeholder="+2348000000000"
        inputMode="tel"
      />

      <Text
        text="Email"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.email}
        setValue={text => handleInputChange('email', text as string)}
        placeholder="johndoe@gmail.com"
        autoCapitalize="none"
      />

      <Text
        text="Password"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.password}
        setValue={text => handleInputChange('password', text as string)}
        placeholder="********"
        secureTextEntry
        isPassword
      />

      <Text
        text="Confirm Password"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.confirm_password}
        setValue={text => handleInputChange('confirm_password', text as string)}
        placeholder="********"
        secureTextEntry
        isPassword
      />

      <Button
        text="Already have an account?"
        preset="link"
        marginLeft={'auto'}
        marginTop={15}
        marginBottom={3}
        onPress={navToSignInScreen}
      />

      <Button
        text="Proceed"
        marginTop={8}
        onPress={sendOTP}
        isLoading={isLoading}
        disabled={
          !(
            registerData.email &&
            registerData.user_name &&
            registerData.bio &&
            registerData.full_name &&
            registerData.phone_number &&
            registerData.password &&
            registerData.confirm_password
          )
        }
      />
    </Screen>
  );
};

export default SignUpScreen;
