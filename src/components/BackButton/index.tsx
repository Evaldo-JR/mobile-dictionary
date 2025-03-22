import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mvs } from 'react-native-size-matters';

import { Text, TouchableOpacity } from '@/components/Themed';
import { useThemeColor } from '@/components/Themed';

import { colors } from '@/styles/themes';
import { s } from './styles';

export function BackButton() {
  const iconColor = useThemeColor(
    { light: colors['comet-gray'][950], dark: colors['comet-gray'][50] },
    'text'
  );

  return (
    <TouchableOpacity style={s.goBack} onPress={router.back}>
      <Ionicons name="chevron-back" size={mvs(24)} color={iconColor} />
      <Text
        lightColor={colors['comet-gray'][950]}
        darkColor={colors['comet-gray'][50]}
        style={s.goBackText}
      >
        Voltar
      </Text>
    </TouchableOpacity>
  );
}
