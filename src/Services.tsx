import {EdgeContext, MakeEdgeContext} from 'edge-core-js';
import {LoginUiProvider} from 'edge-login-ui-rn';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {showError} from './AirshipInstance';
import {MainRouter} from './MainRouter';

interface Props {}

export const Services = (_props: Props) => {
  // Stores the Edge context:
  const [context, setContext] = React.useState<EdgeContext | undefined>();

  return (
    <GestureHandlerRootView style={styles.background}>
      <LoginUiProvider>
        <MakeEdgeContext
          airbitzSupport
          apiKey="..."
          appId=""
          // Called when the core is done loading:
          onLoad={setContext}
          onError={showError}
        />
        <MainRouter context={context} />
      </LoginUiProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0e4479',
  },
});
