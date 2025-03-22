import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { fonts, shadows } from '@/styles/themes';

export const s = StyleSheet.create({
  card: {
    flex: 1,
    padding: mvs(20),
    borderRadius: 12,
    ...shadows,
  },
  wordText: {
    textAlign: 'center',
    fontFamily: fonts.fontFamily.medium,
    fontSize: fonts.fontSize.lg,
  },
});
