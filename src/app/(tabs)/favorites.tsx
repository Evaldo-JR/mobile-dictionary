import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { getFavorites } from '@/lib/storage/favorites';
import { s } from '@/styles/screens/favorites.styles';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = async () => {
    const storedFavorites = await getFavorites();
    setFavorites(storedFavorites);
  };

  // Carregar favoritos sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={s.container}>
      <Text style={s.title}>⭐ Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={s.emptyText}>No favorite words saved.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          style={s.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={s.card} onPress={() => router.push(`/dictionary/${item}`)}>
              <Text style={s.wordText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
