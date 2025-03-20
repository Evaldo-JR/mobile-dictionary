import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { speak } from 'expo-speech';

import { addToHistory } from '@/lib/storage/history';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/lib/storage/favorites';

interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

export default function WordDetailScreen() {
  const { word } = useLocalSearchParams<{ word: string }>();
  const [data, setData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const checkFavoriteStatus = useCallback(async () => {
    if (word) {
      const isFav = await isFavorite(word);
      setFavorite(isFav);
    }
  }, [word]);

  const toggleFavorite = async () => {
    if (word) {
      if (favorite) {
        await removeFromFavorites(word);
      } else {
        await addToFavorites(word);
      }
      setFavorite(!favorite);
    }
  };

  const playPronunciation = () => {
    if (word) {
      speak(word, {
        language: 'en',
        rate: 0.8,
      });
    }
  };

  useEffect(() => {
    if (word) {
      addToHistory(word); // Salva no histórico
      checkFavoriteStatus(); // Checa se é favorita.
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) setData(result[0]);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setLoading(false));
  }, [word]);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (!data) return <Text style={styles.error}>Word not found</Text>;

  return (
    <ScrollView>
      <View className="flex-1 p-5">
        <Text style={styles.word}>{data.word}</Text>

        {/* Botão de Pronúncia */}
        <TouchableOpacity style={styles.audioButton} onPress={playPronunciation}>
          <Text style={styles.audioText}>🔊 Listen</Text>
        </TouchableOpacity>

        {/* Botão de Favoritos */}
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Text style={styles.favoriteText}>{favorite ? '★ Unfavorite' : '☆ Favorite'}</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Meanings</Text>
        {data.meanings.map((meaning, index) => (
          <View key={index} style={styles.meaningBlock}>
            <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
            {meaning.definitions.map((def, i) => (
              <Text key={i} style={styles.definition}>
                • {def.definition}
              </Text>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  word: { fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  audioButton: {
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  audioText: { fontSize: 18 },
  favoriteButton: {
    alignSelf: 'center',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  favoriteText: { fontSize: 18 },
  heading: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  meaningBlock: { marginTop: 10 },
  partOfSpeech: { fontSize: 18, fontWeight: 'bold', color: '#4A90E2' },
  definition: { fontSize: 16, marginLeft: 10, marginTop: 5 },
  button: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { textAlign: 'center', fontSize: 18, color: 'red' },
});
