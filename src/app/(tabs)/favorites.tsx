import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { getFavorites, removeFromFavorites } from '@/lib/storage/favorites';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = async () => {
    const storedFavorites = await getFavorites();
    setFavorites(storedFavorites);
  };

  const handleRemoveFavorite = async (word: string) => {
    await removeFromFavorites(word);
    loadFavorites();
  };

  // Carregar histórico sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorite words</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.wordContainer}>
              <TouchableOpacity onPress={() => router.push(`/dictionary/${item}`)}>
                <Text style={styles.word}>{item}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
                <Text style={styles.remove}>✖</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  empty: { textAlign: 'center', fontSize: 18, color: 'gray' },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  word: { fontSize: 18 },
  remove: { fontSize: 18, color: 'red' },
});
