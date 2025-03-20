import { useRef, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { mvs } from 'react-native-size-matters';

import { View } from '../Themed';

import { colors } from '@/styles/themes';
import { s } from './styles';

export function SearchInput(props: TextInputProps) {
  const [focusColor, setFocusColor] = useState(colors['comet-gray'][300]);

  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
    setFocusColor(colors['comet-gray'][800]);
  };

  const handleBlur = () => {
    inputRef.current?.blur();
    setFocusColor(colors['comet-gray'][300]);
  };

  return (
    <View lightColor={colors.white} darkColor={colors.black} style={s.searchContainer}>
      <FontAwesome name="search" size={mvs(20)} color={focusColor} />

      <TextInput
        {...props}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search a word"
        placeholderTextColor={focusColor}
        numberOfLines={1}
        style={s.input}
      />
    </View>
  );
}
