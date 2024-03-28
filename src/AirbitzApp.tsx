import {EdgeAccount} from 'edge-core-js';
import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';

interface Props {
  account: EdgeAccount;
}

export const AirbitzApp = (_props: Props) => {
  return (
    <SafeAreaView>
      <Text>Airbitz</Text>
    </SafeAreaView>
  );
};
