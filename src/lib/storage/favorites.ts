import * as SecureStore from 'expo-secure-store';

const FAVORITES_KEY = 'favorite_words';

// Função para obter os favoritos salvos
export async function getFavorites(): Promise<string[]> {
  const favorites = await SecureStore.getItemAsync(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

// Função para adicionar uma palavra aos favoritos
export async function addToFavorites(word: string) {
  const favorites = await getFavorites();
  if (!favorites.includes(word)) {
    favorites.push(word);
    await SecureStore.setItemAsync(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

// Função para remover uma palavra dos favoritos
export async function removeFromFavorites(word: string) {
  const favorites = await getFavorites();
  const updatedFavorites = favorites.filter((w) => w !== word);
  await SecureStore.setItemAsync(FAVORITES_KEY, JSON.stringify(updatedFavorites));
}

// Função para verificar se uma palavra está nos favoritos
export async function isFavorite(word: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(word);
}
