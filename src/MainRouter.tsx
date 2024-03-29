import {EdgeAccount, EdgeContext} from 'edge-core-js';
import {LoginScreen} from 'edge-login-ui-rn';
import * as React from 'react';

import {AirbitzApp} from './AirbitzApp';
import {LoadingScene} from './LoadingScene';

interface Props {
  context: EdgeContext | undefined;
}

export const MainRouter = (props: Props) => {
  const {context} = props;

  // Stores the Edge account:
  const [account, setAccount] = React.useState<EdgeAccount | undefined>();

  // Once the context is ready, we can show the login screen.
  // Once the user logs in, we can show the main app:
  return context == null ? (
    <LoadingScene />
  ) : account == null ? (
    <LoginScreen
      accountOptions={{}}
      appName="Airbitz"
      context={context}
      fastLogin
      primaryLogo={require('./assets/logo_large.png')}
      onLogin={setAccount}
    />
  ) : (
    <AirbitzApp account={account} />
  );
};
