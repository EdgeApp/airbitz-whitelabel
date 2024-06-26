import {
  EdgeAccount,
  EdgeContext,
  OtpError,
  asMaybeOtpError,
} from 'edge-core-js';
import {
  LoginScreen,
  OtpRepairScreen,
  SecurityAlertsScreen,
  hasSecurityAlerts,
  watchSecurityAlerts,
} from 'edge-login-ui-rn';
import * as React from 'react';

import {MainScene} from './MainScene';
import {showError} from './AirshipInstance';
import {ChangePasswordScene} from './ChangePasswordScene';
import {LoadingScene} from './LoadingScene';

interface Props {
  context: EdgeContext | undefined;
}

export const MainRouter = (props: Props) => {
  const {context} = props;

  // Stores the Edge account:
  const [account, setAccount] = React.useState<EdgeAccount | undefined>();

  const handleLogout = () => {
    account?.logout().catch(error => showError(error));
    setAccount(undefined);
    setChangingPassword(false);
  };

  // Change password screen:
  const [changingPassword, setChangingPassword] = React.useState(false);
  const handleChangePassword = () => setChangingPassword(true);
  const handleChangePasswordComplete = () => setChangingPassword(false);

  // Security alerts screen:
  const [securityAlerts, setSecurityAlerts] = React.useState(false);
  const handleSecurityAlertsComplete = () => setSecurityAlerts(false);

  // OTP repair screen:
  const [otpError, setOtpError] = React.useState<OtpError | undefined>();
  const handleOtpRepairComplete = () => setOtpError(undefined);

  // Watch for security alerts:
  React.useEffect(() => {
    if (account == null) {
      return;
    }
    if (hasSecurityAlerts(account)) {
      setSecurityAlerts(true);
    }
    return watchSecurityAlerts(account, () => setSecurityAlerts(true));
  }, [context, account]);

  // Watch for OTP errors:
  React.useEffect(() => {
    if (context == null || account == null) {
      return;
    }
    context.on('error', (error: unknown) => {
      console.log(error);
      const otpError = asMaybeOtpError(error);
      if (otpError != null) {
        setOtpError(otpError);
      }
    });
  }, [context, account]);

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
      landingScreenText="Airbitz has been renamed to Edge Wallet. Please visit the app store to
      install our new application instead."
      primaryLogo={require('./assets/logo_large.png')}
      onLogin={setAccount}
    />
  ) : otpError != null ? (
    <OtpRepairScreen
      branding={{
        appName: 'Airbitz',
      }}
      context={context}
      account={account}
      otpError={otpError}
      onComplete={handleOtpRepairComplete}
    />
  ) : securityAlerts ? (
    <SecurityAlertsScreen
      context={context}
      account={account}
      onComplete={handleSecurityAlertsComplete}
    />
  ) : changingPassword ? (
    <ChangePasswordScene
      account={account}
      context={context}
      onComplete={handleChangePasswordComplete}
    />
  ) : (
    <MainScene
      account={account}
      onChangePassword={handleChangePassword}
      onLogout={handleLogout}
    />
  );
};
