import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { fonts, shadows } from '@/styles/themes';

export const s = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: mvs(4),
    paddingHorizontal: mvs(12),
    marginHorizontal: mvs(24),
    borderRadius: mvs(8),
    ...shadows,
  },
  input: {
    flex: 1,
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.fontSize.sm,
    marginLeft: mvs(8),
  },
});
