import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';

import { colors, fonts } from '@/styles/themes';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: mvs(16),
    paddingHorizontal: mvs(24),
  },
  highlightBox: {
    minHeight: mvs(180),
    alignItems: 'center',
    justifyContent: 'center',
    padding: mvs(16),
    marginBottom: mvs(16),
    borderWidth: mvs(1),
    borderRadius: mvs(8),
    borderColor: colors['malachite-green'][800],
    backgroundColor: colors['malachite-green'][50],
  },
  highlightWord: {
    fontFamily: fonts.fontFamily.bold,
    fontSize: fonts.fontSize['4xl'],
    lineHeight: fonts.lineHeight['4xl'],
    color: colors['comet-gray'][950],
    textAlign: 'center',
  },
  highlightPhonetic: {
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.fontSize['lg'],
    lineHeight: fonts.lineHeight['lg'],
    color: colors['comet-gray'][700],
    marginTop: mvs(8),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: mvs(16),
    marginBottom: mvs(24),
  },
  favoriteButton: {
    padding: mvs(8),
    borderRadius: mvs(4),
    borderWidth: mvs(1),
    borderColor: colors['punch-red'][600],
    backgroundColor: colors['punch-red'][50],
  },
  audioButton: {
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(12),
    borderRadius: mvs(4),
    borderWidth: mvs(1),
    borderColor: colors['cerulean-blue'][800],
    backgroundColor: colors['cerulean-blue'][100],
  },
  audioText: {
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.fontSize['base'],
    color: colors['comet-gray'][900],
  },
  heading: {
    fontFamily: fonts.fontFamily.semiBold,
    fontSize: fonts.fontSize['2xl'],
    marginBottom: mvs(12),
  },
  listContent: {
    paddingBottom: mvs(120),
  },
  sectionHeader: {
    paddingBottom: mvs(8),
    borderBottomWidth: mvs(1),
    borderBottomColor: colors['comet-gray'][200],
  },
  partOfSpeech: {
    fontFamily: fonts.fontFamily.semiBold,
    fontSize: fonts.fontSize['xl'],
  },
  definitionContainer: {
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(16),
  },
  definition: {
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.fontSize.base,
    lineHeight: fonts.lineHeight.base,
  },
  callback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: mvs(16),
  },
  error: {
    fontFamily: fonts.fontFamily.medium,
    fontSize: fonts.fontSize['lg'],
    color: colors['punch-red'][500],
  },
});
