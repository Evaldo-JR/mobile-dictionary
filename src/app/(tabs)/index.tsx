import { useMemo, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { View, Text } from '@/components/Themed';
import { SearchInput } from '@/components/SearchInput';
import { wordsMock } from '@/lib/mockData';

import { s } from '@/styles/screens/home.styles';

export default function WordsListScreen() {
  const [search, setSearch] = useState('');

  /**
   * Filtra um array de dados com base em um texto de busca,
   * ignorando acentos e diferenças entre maiúsculas e minúsculas.
   */
  const filteredWords = useMemo(() => {
    // Normaliza o texto de busca: remove acentos e converte para minúsculas
    const normalizedSearch = search.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    return wordsMock.filter(({ word }) =>
      word
        .toLowerCase() // Converte o título para minúsculas
        .normalize('NFD') // Normaliza para forma NFD
        .replace(/[̀-ͯ]/g, '') // Remove diacríticos
        .includes(normalizedSearch)
    );
  }, [search, wordsMock]);

  return (
    <View style={s.container}>
      <Text style={s.title}>📖 Mobile Dictionary</Text>

      {/* Input de Pesquisa */}
      <SearchInput value={search} onChangeText={setSearch} />

      {/* Grid de Palavras */}
      <FlatList
        data={filteredWords}
        keyExtractor={(item) => item.word}
        numColumns={2}
        style={s.list}
        columnWrapperStyle={s.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => router.push(`/dictionary/${item.word}`)}>
            <Text style={s.wordText}>{item.word}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
