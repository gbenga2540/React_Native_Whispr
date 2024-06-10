import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Button, Screen, Text } from 'src/components';

const HomeScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();

  return (
    <Screen baseAllowance={10}>
      <Text text="Home Screen" marginTop={20} />
      <Button
        text="Go Back"
        marginTop={'auto'}
        preset="secondary"
        onPress={() => navigation.goBack()}
      />
    </Screen>
  );
};

export default HomeScreen;
