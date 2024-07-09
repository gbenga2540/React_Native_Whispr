import React, { FunctionComponent } from 'react';
import { Button, Screen, Text } from 'src/components';
import { useAuthStore } from 'src/store/auth/auth.store';

const HomeScreen: FunctionComponent = (): React.JSX.Element => {
  const clearAuth = useAuthStore().clearAuth;

  return (
    <Screen>
      <Text text="Home Screen" marginTop={20} />
      <Button
        text="Log Out"
        marginTop={'auto'}
        onPress={() => clearAuth()}
        preset="secondary"
      />
    </Screen>
  );
};

export default HomeScreen;
