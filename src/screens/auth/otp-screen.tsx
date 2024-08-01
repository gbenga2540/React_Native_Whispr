import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, OTPField, Screen, Text } from 'src/components';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { useGetOTP, useRegisterUser, useVerifyOTP } from 'src/domain/auth';
import { errorToast, successToast } from 'src/helpers';
import { AuthStackParamList } from 'src/routes/types';
import { useAuthStore } from 'src/store/auth/auth.store';

const OTPScreen: FunctionComponent = (): React.JSX.Element => {
  const { colors } = useCustomTheme();
  const updateAuth = useAuthStore().updateAuth;
  const route = useRoute<RouteProp<AuthStackParamList, 'OTPScreen'>>();
  const route_params = route.params;

  const { mutateAsync: verifyOTPMutate, isLoading } = useVerifyOTP();
  const { mutate: getOTPMutate, isLoading: getOTPIsLoading } = useGetOTP();
  const { mutateAsync: registerUserMutate, isLoading: registerUserIsLoading } =
    useRegisterUser();

  const [otpValue, setOTPValue] = useState<string[]>([]);

  const resendOTP = () => {
    getOTPMutate(
      {
        email: route_params.email,
        phone_number: route_params.phone_number,
        user_name: route_params.user_name,
      },
      {
        onError(error, _variables, _context) {
          errorToast({
            message:
              (error as any)?.response?.data?.msg || (error as Error)?.message,
          });
        },
        onSuccess(data, _variables, _context) {
          if (data.data) {
            setOTPValue([]);
            successToast({
              title: 'OTP Verification',
              message: 'OTP sent successfully!',
            });
          } else {
            errorToast({
              message: data.msg,
            });
          }
        },
      },
    );
  };

  const registerUser = useCallback(async () => {
    try {
      await registerUserMutate(
        { ...route_params },
        {
          onError(error, _variables, _context) {
            errorToast({
              message:
                (error as any)?.response?.data?.msg ||
                (error as Error)?.message,
            });
          },
          onSuccess(data, _variables, _context) {
            if (data.data?.token) {
              updateAuth(data.data);
              successToast({
                title: 'Authentication',
                message: 'Account created successfully!',
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
  }, [registerUserMutate, route_params, updateAuth]);

  const verifyOTP = useCallback(async () => {
    try {
      if (otpValue.length < 4) {
        errorToast({
          message: 'Invalid OTP!',
        });
        return;
      }

      await verifyOTPMutate(
        {
          email: route_params.email,
          token: otpValue.join(''),
        },
        {
          onError(error, _variables, _context) {
            errorToast({
              message:
                (error as any)?.response?.data?.msg ||
                (error as Error)?.message,
            });
          },
          onSuccess: async (data, _variables, _context) => {
            if (data.data) {
              registerUser();
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
  }, [verifyOTPMutate, otpValue, route_params.email, registerUser]);

  return (
    <Screen preset="fixed">
      <Text
        text="Verify your Email"
        marginTop={40}
        marginBottom={5}
        fontSize={25}
        fontFamily={fonts.primaryFont_700}
      />
      <Text
        text="We have sent the verification code to your email address!"
        marginBottom={25}
        color={colors.inputPLText}
        width={300}
      />

      <OTPField otpValue={otpValue} setOTPValue={setOTPValue} />

      <Button
        text="Resend OTP?"
        preset="link"
        marginLeft={'auto'}
        marginTop={10}
        marginBottom={'auto'}
        onPress={resendOTP}
      />

      <Button
        text="Verify OTP"
        marginBottom={10}
        onPress={verifyOTP}
        isLoading={isLoading || getOTPIsLoading || registerUserIsLoading}
        disabled={otpValue.length < 4}
      />
    </Screen>
  );
};

export default OTPScreen;
