import { colors } from '@/styles/themes';

const tintColorLight = colors['cerulean-blue'][700];
const tintColorDark = colors['comet-gray'][50];

export default {
  light: {
    text: colors['comet-gray'][700],
    background: colors['comet-gray'][50],
    tint: tintColorLight,
    tabIconDefault: colors['comet-gray'][400],
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: colors['comet-gray'][50],
    background: colors['comet-gray'][950],
    tint: tintColorDark,
    tabIconDefault: colors['comet-gray'][400],
    tabIconSelected: tintColorDark,
  },
};
