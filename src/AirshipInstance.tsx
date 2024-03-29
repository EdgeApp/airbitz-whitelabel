import * as React from 'react';
import {makeAirship} from 'react-native-airship';
import {ThemedDropdown} from './theming/ThemedDropdown';

export const Airship = makeAirship();

/**
 * Shows an error to the user.
 * Used when some user-requested operation fails.
 */
export function showError(error: unknown): void {
  console.log('Showing error drop-down alert: ', error);

  Airship.show(bridge => (
    <ThemedDropdown bridge={bridge}>{String(error)}</ThemedDropdown>
  )).catch(err => console.error(err));
}
