import {EdgeContext, MakeEdgeContext} from 'edge-core-js';
import {LoginUiProvider} from 'edge-login-ui-rn';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import ENV from '../env.json';
import {showError} from './AirshipInstance';
import {MainRouter} from './MainRouter';
import {ThemeProvider, theme} from './theming/ThemeProvider';

interface Props {}

export const Services = (_props: Props) => {
  // Stores the Edge context:
  const [context, setContext] = React.useState<EdgeContext | undefined>();

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={styles.background}>
        <LoginUiProvider>
          <MakeEdgeContext
            airbitzSupport
            apiKey={ENV.AIRBITZ_API_KEY}
            appId=""
            // Called when the core is done loading:
            onLoad={setContext}
            onError={showError}
          />
          <MainRouter context={context} />
        </LoginUiProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.background,
  },
});
