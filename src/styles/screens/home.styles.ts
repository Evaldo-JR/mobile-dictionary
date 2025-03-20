import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { fonts, shadows } from '@/styles/themes';

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
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderRadius: 12,
    ...shadows,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
