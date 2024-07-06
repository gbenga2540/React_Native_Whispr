import React, { FunctionComponent } from 'react';
import { Screen, Text } from 'src/components';

const HomeScreen: FunctionComponent = (): React.JSX.Element => {
  return (
    <Screen baseAllowance={10}>
      <Text text="Home Screen" marginTop={20} />
    </Screen>
  );
};

export default HomeScreen;
