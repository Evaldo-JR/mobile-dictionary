/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  TextInput as DefaultTextInput,
  TextInputProps as DefaultTextInputProps,
  useColorScheme,
} from 'react-native';

import Colors from '@/constants/Colors';
import { forwardRef } from 'react';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & React.ComponentProps<typeof DefaultText>;
export type ViewProps = ThemeProps & React.ComponentProps<typeof DefaultView>;
export type TouchableOpacityProps = ThemeProps &
  React.ComponentProps<typeof DefaultTouchableOpacity>;
export type TextInputProps = ThemeProps & DefaultTextInputProps;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultTouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}
export const TextInput = forwardRef<DefaultTextInput, TextInputProps>((props, ref) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultTextInput
      ref={ref} // Encaminha a ref para o TextInput nativo
      style={[{ color }, style]}
      {...otherProps}
    />
  );
});
