import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { colors, fonts, shadows } from '@/styles/themes';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: mvs(16),
  },
  title: {
    fontFamily: fonts.fontFamily.bold,
    fontSize: fonts.fontSize['xl'],
    textAlign: 'center',
    marginBottom: mvs(16),
  },
  emptyText: {
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.fontSize['base'],
    textAlign: 'center',
    color: colors['comet-gray'][500],
    marginTop: mvs(20),
  },
  list: {
    marginTop: mvs(8),
    paddingHorizontal: mvs(24),
    marginBottom: mvs(16),
  },
  listContent: {
    gap: mvs(12),
    paddingBottom: mvs(80),
  },
});
