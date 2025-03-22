import { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Text, TouchableOpacity } from '@/components/Themed';

import { colors } from '@/styles/themes';
import { s } from './styles';

type WordProps = TouchableOpacityProps & {
  title: string;
};

const WordCardComponent = ({ title, ...rest }: WordProps) => {
  return (
    <TouchableOpacity {...rest} style={s.card} lightColor={colors.white} darkColor={colors.black}>
      <Text style={s.wordText} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const WordCard = memo(WordCardComponent);
