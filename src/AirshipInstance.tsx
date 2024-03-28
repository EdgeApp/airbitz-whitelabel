import * as React from 'react';
import {Text} from 'react-native';
import {makeAirship, AirshipDropdown} from 'react-native-airship';

export const Airship = makeAirship();

/**
 * Shows an error to the user.
 * Used when some user-requested operation fails.
 */
export function showError(error: unknown): void {
  console.log('Showing error drop-down alert: ', error);

  Airship.show(bridge => (
    <AirshipDropdown bridge={bridge}>
      <Text>{String(error)}</Text>
    </AirshipDropdown>
  )).catch(err => console.error(err));
}
