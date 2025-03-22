import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { fonts } from '@/styles/themes';

export const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.fontFamily.bold,
    fontSize: fonts.fontSize['xl'],
    textAlign: 'center',
    marginBottom: mvs(16),
  },
  list: {
    paddingHorizontal: mvs(24),
    marginTop: mvs(16),
  },
  listContent: {
    gap: mvs(12),
  },
  columnWrapper: {
    gap: mvs(12),
  },
});
