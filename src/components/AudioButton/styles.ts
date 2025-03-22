import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { colors, fonts } from '@/styles/themes';

export const s = StyleSheet.create({
  container: {
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(12),
    borderWidth: mvs(1),
    borderColor: colors['cerulean-blue'][600],
    borderRadius: mvs(4),
    backgroundColor: colors['cerulean-blue'][50],
  },
  text: {
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.fontSize['base'],
    color: colors['cerulean-blue'][950],
  },
});
