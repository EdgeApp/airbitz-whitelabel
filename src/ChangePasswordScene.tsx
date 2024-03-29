import {EdgeAccount, EdgeContext} from 'edge-core-js';
import {ChangePasswordScreen} from 'edge-login-ui-rn';
import * as React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemedText} from './theming/ThemedText';

interface Props {
  account: EdgeAccount;
  context: EdgeContext;
  onComplete: () => void;
}

export const ChangePasswordScene = (props: Props) => {
  const {account, context, onComplete} = props;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={onComplete}>
        <ThemedText>Back</ThemedText>
      </TouchableOpacity>
      <ChangePasswordScreen
        context={context}
        account={account}
        onComplete={onComplete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
});
