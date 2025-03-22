import { ActivityIndicator, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import { View } from '../Themed';
import { s } from './styles';

export function PageLoading() {
  const colorScheme = useColorScheme();

  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color={Colors[colorScheme || 'light'].tint} />
    </View>
  );
}
