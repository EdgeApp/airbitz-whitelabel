import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ThemedText} from './theming/ThemedText';

interface Props {}

export const LoadingScene = (_props: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedText header>Loading...</ThemedText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
