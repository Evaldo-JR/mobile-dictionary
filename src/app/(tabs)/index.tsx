import { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { wordsMock, Word } from '../../lib/mockData';

export default function WordsListScreen() {
  const [search, setSearch] = useState<string>('');

  const filteredWords: Word[] = wordsMock.filter((word) =>
    word.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredWords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/dictionary/${item.word}`)}>
            <Text style={styles.word}>{item.word}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  word: { fontSize: 18, padding: 10, borderBottomWidth: 1 },
});
