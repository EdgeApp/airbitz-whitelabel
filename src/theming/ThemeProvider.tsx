import {makeThemeContext} from 'react-native-patina';

export interface Theme {
  rem: (size: number) => number;
  background: string;
  text: string;
  header: string;

  button: string;
  buttonText: string;

  dropdown: string;
  dropdownText: string;

  // Modal:
  modalBackground: string;
  modalBorderColor: string;
  modalBorderWidth: number;
}

// From airbitz-android-gui:
const background = '#0e4479';
const darkText = '#0C578C';
// const darkTextHint = '#990C578C';
// const darkTextLink = '#007aFF';
const brightText = '#ffffff';
// const bright_text_link = '#CFEDF6';
// const bright_text_hint = '#dddddd';
const buttonGreen = '#80C342';
// const buttonBlue = '#2291CF';
// const buttonGreenFaded = '#5580c342';
// const buttonBlueFaded = '#55006698';
// const dark_text_field_background = '#404040';
// const dark_text_field_text_hint = '#cccccc';
// const dark_text_field_text = '#FFFFFF';
// const dark_divider = '#444444';
// const semi_black_text = '#505050';
// const transaction_list_name = '#1770A6';
// const transaction_list_name_light = '#bb1770A6';

export const theme: Theme = {
  rem(size: number): number {
    return Math.round(size * 16);
  },

  background,
  text: brightText,
  header: brightText,

  button: buttonGreen,
  buttonText: brightText,

  dropdown: 'white',
  dropdownText: darkText,

  // Modal:
  modalBackground: 'rgba(255,255,255,0.5)',
  modalBorderColor: '#000000',
  modalBorderWidth: 0,
};

export const {changeTheme, ThemeProvider, useTheme, withTheme} =
  makeThemeContext(theme);
