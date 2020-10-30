import {Platform, TextStyle, ViewStyle} from 'react-native';

export const colors = {
  blue: '#0465d6',
  dark: '#242a2e',
  gray: '#576069',
  light: '#e0e4e8',
  red: '#ff0707',
};

export const paddings = {
  small: 4,
  medium: 8,
  large: 16,
};

export const defaultTextStyle: TextStyle = {
  color: colors.dark,
  fontSize: 16,
  padding: 8,
};

export const getSimpleShadowStyle = (radius: number): ViewStyle =>
  Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: radius / 10,
      shadowRadius: radius,
    },
    android: {
      elevation: radius,
    },
    default: {},
  });
