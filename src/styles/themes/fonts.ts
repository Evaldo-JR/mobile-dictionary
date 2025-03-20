import { moderateScale } from 'react-native-size-matters';

/**
 * @description Configuração de tipografia para aplicativos móveis.
 * Tamanhos otimizados para celulares, tablets e iPads.
 */
export const fonts = {
  /**
   * @description Configuração de famílias de fontes usadas no projeto.
   *
   * @property
   * - **Light | Regular:** texto padrão.
   * - **Medium | SemiBold:** destaques leves.
   * - **Bold:** títulos.
   */
  fontFamily: {
    /** @description Texto padrão para parágrafos e descrições. @weight 300 */
    light: 'Inter_Light',
    /** @description Texto padrão para parágrafos e descrições. @weight 300 _Italic_ */
    lightItalic: 'Inter_Light_Italic',
    /** @description Texto padrão para parágrafos e descrições. @weight 400 */
    regular: 'Inter_Regular',
    /** @description Texto padrão para parágrafos e descrições. @weight 400 _Italic_ */
    regularItalic: 'Inter_Regular_Italic',
    /** @description Para ênfases leves e subtítulos. @weight 500 */
    medium: 'Inter_Medium',
    /** @description Para ênfases leves e subtítulos. @weight 500 _Italic_ */
    mediumItalic: 'Inter_Medium_Italic',
    /** @description Para ênfases leves e subtítulos. @weight 600 */
    semiBold: 'Inter_SemiBold',
    /** @description Títulos ou elementos destacados. @weight 700 */
    bold: 'Inter_Bold',
  },

  /**
   * @description Tamanhos de fonte ajustados para diferentes contextos de texto.
   * @size indica o valor real calculado para o dispositivo.
   */
  fontSize: {
    /** @description Fonte muito pequena, ideal para labels e anotações. @size 12px */
    xs: moderateScale(12),
    /** @description Fonte pequena, útil para textos secundários ou descrições. @size 14px */
    sm: moderateScale(14),
    /** @description Fonte padrão para textos regulares. @size 16px */
    base: moderateScale(16),
    /** @description Subtítulos ou textos ligeiramente destacados. @size 18px */
    lg: moderateScale(18),
    /** @description Títulos menores ou destaques secundários. @size 20px */
    xl: moderateScale(20),
    /** @description Títulos principais. @size 24px */
    '2xl': moderateScale(24),
    /** @description Destaques maiores, como cabeçalhos de seções. @size 30px */
    '3xl': moderateScale(30),
    /** @description Títulos mais importantes para telas de destaque. @size 36px */
    '4xl': moderateScale(36),
  },

  /**
   * @description Altura de linha proporcional aos tamanhos de fonte.
   * @size indica o valor real calculado para o dispositivo.
   */
  lineHeight: {
    /** @description Para textos pequenos com altura compacta. @size 16px */
    xs: moderateScale(16),
    /** @description Linha espaçada para textos menores. @size 20px */
    sm: moderateScale(20),
    /** @description Altura de linha padrão para textos regulares. @size 24px */
    base: moderateScale(24),
    /** @description Linha confortável para subtítulos. @size 27px */
    lg: moderateScale(27),
    /** @description Linha espaçada para títulos menores. @size 30px */
    xl: moderateScale(30),
    /** @description Altura proporcional para títulos principais. @size 36px */
    '2xl': moderateScale(36),
    /** @description Linha para títulos destacados. @size 42px */
    '3xl': moderateScale(42),
    /** @description Linha mais espaçada para títulos maiores. @size 48px */
    '4xl': moderateScale(48),
  },
};
