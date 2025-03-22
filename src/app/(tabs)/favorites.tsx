import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { mvs } from 'react-native-size-matters';

import { getFavorites } from '@/lib/storage/favorites';
import { View, Text } from '@/components/Themed';
import { WordCard } from '@/components/WordCard';
import { PageLoading } from '@/components/PageLoading';

import { colors } from '@/styles/themes';
import { s } from '@/styles/screens/favorites.styles';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    const storedFavorites = await getFavorites();
    setFavorites(storedFavorites);
    setLoading(false);
  };

  // Carregar favoritos sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  if (loading) {
    return <PageLoading />;
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>
        <FontAwesome name="heart" color={colors['punch-red'][500]} size={mvs(20)} /> Favorites
      </Text>

      {favorites.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={s.emptyText}>No favorite words saved</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <WordCard title={item} onPress={() => router.push(`/dictionary/${item}`)} />
          )}
          style={s.list}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
