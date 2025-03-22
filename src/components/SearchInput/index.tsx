import { useRef, useState } from 'react';
import { TextInput as DefaultTextInput, TextInputProps } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { mvs } from 'react-native-size-matters';

import { useThemeColor, View, TextInput } from '@/components/Themed';

import { colors } from '@/styles/themes';
import { s } from './styles';

export function SearchInput(props: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<DefaultTextInput>(null);

  const iconColor = useThemeColor(
    {
      light: isFocused ? colors['cerulean-blue'][600] : colors['comet-gray'][500],
      dark: isFocused ? colors['cerulean-blue'][400] : colors['comet-gray'][500],
    },
    'text'
  );

  const handleFocus = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    inputRef.current?.blur();
    setIsFocused(false);
  };

  return (
    <View lightColor={colors.white} darkColor={colors.black} style={s.searchContainer}>
      <FontAwesome name="search" size={mvs(20)} color={iconColor} />

      <TextInput
        {...props}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search a word"
        placeholderTextColor={colors['comet-gray'][500]}
        numberOfLines={1}
        style={s.input}
      />
    </View>
  );
}
