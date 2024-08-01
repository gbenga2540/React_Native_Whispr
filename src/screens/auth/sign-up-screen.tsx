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
import { TextStyle } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

const SignUpScreen: FunctionComponent = (): React.JSX.Element => {
  const { colors, currentTheme } = useCustomTheme();
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
  const [profilePicture, setProfilePicture] = useState<ImageOrVideo | null>(
    null,
  );

  const openCamera = async () => {
    try {
      await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        multiple: false,
        includeBase64: false,
        enableRotationGesture: true,
        forceJpg: true,
        mediaType: 'photo',
      })
        .then(res => {
          if (res) {
            setProfilePicture({
              ...res,
              filename: res?.path?.split('/')?.pop(),
            });
          } else {
            errorToast({
              message: 'Something went wrong!',
            });
            return;
          }
        })
        .catch(err => {
          errorToast({
            message: err?.message,
          });
          return;
        });

      return;
    } catch (error) {
      clearProfilePicture();
      errorToast({
        message:
          (error as any)?.response?.data?.msg ||
          (error as Error)?.message ||
          'Something went wrong!',
      });
      return;
    }
  };

  const openGallery = async () => {
    try {
      await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        multiple: false,
        includeBase64: false,
        enableRotationGesture: true,
        forceJpg: true,
        mediaType: 'photo',
      })
        .then(res => {
          if (res) {
            setProfilePicture({
              ...res,
              filename: res?.path?.split('/')?.pop(),
            });
          } else {
            errorToast({
              message: 'Something went wrong!',
            });
            return;
          }
        })
        .catch(err => {
          errorToast({
            message: err?.message,
          });
          return;
        });

      return;
    } catch (error) {
      clearProfilePicture();
      errorToast({
        message:
          (error as any)?.response?.data?.msg ||
          (error as Error)?.message ||
          'Something went wrong!',
      });
      return;
    }
  };

  const clearProfilePicture = () => {
    setProfilePicture(null);
    ImagePicker.clean();
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

      if (
        !validator.isMobilePhone(registerData.phone_number.trim(), 'any', {
          strictMode: true,
        })
      ) {
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
              message:
                (error as any)?.response?.data?.msg ||
                (error as Error)?.message,
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
  }, [registerData, navigation, getOTPMutate, profilePicture]);

  const navToSignInScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignInScreen',
    });
  };

  const ICON_STYLES: TextStyle = {
    color: colors.inputPLText,
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
            sourceFile={
              profilePicture?.path
                ? { uri: profilePicture.path }
                : images(currentTheme === 'dark').default_user
            }
            width={110}
            height={110}
            borderRadius={55}
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
            children={
              <Icon name="camera" width={28} height={28} style={ICON_STYLES} />
            }
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
                style={ICON_STYLES}
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
                style={ICON_STYLES}
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
        autoCorrect={false}
        autoCapitalize="none"
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
        autoCorrect={false}
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
        autoCorrect={false}
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
        autoComplete="email"
        autoCorrect={false}
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
        autoCorrect={false}
        autoCapitalize="none"
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
        autoCorrect={false}
        autoCapitalize="none"
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
