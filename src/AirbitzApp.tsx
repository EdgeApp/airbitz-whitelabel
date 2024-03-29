import {EdgeAccount} from 'edge-core-js';
import * as React from 'react';
import {Linking, Platform, SafeAreaView, StyleSheet} from 'react-native';
import {cacheStyles} from 'react-native-patina';

import {ThemedButton} from './theming/ThemedButton';
import {Theme, useTheme} from './theming/ThemeProvider';
import {ThemedText} from './theming/ThemedText';

interface Props {
  account: EdgeAccount;
  onChangePassword: () => void;
  onLogout: () => void;
}

export const AirbitzApp = (props: Props) => {
  const {onChangePassword, onLogout} = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleDownload = async () => {
    if (Platform.OS === 'android') {
      await Linking.openURL(
        'https://play.google.com/store/apps/details?id=co.edgesecure.app',
      );
    } else {
      await Linking.openURL(
        'https://itunes.apple.com/app/apple-store/id1344400091',
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ThemedText header>Airbitz</ThemedText>
      <ThemedText>
        Airbitz has been renamed to Edge Wallet. Please visit the app store to
        install our new application, and log in there.
      </ThemedText>
      <ThemedButton onPress={handleDownload}>Download Edge</ThemedButton>
      <ThemedButton onPress={onChangePassword}>Change Password</ThemedButton>
      <ThemedButton onPress={onLogout}>Logout</ThemedButton>
    </SafeAreaView>
  );
};

const getStyles = cacheStyles((theme: Theme) => ({
  screen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContents: {
    padding: theme.rem(1),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
