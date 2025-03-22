import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { fonts } from '@/styles/themes';

export const s = StyleSheet.create({
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: mvs(4),
    marginBottom: mvs(16),
  },
  goBackText: {
    fontFamily: fonts.fontFamily.light,
    fontSize: fonts.fontSize.base,
    lineHeight: fonts.lineHeight.base,
  },
});
