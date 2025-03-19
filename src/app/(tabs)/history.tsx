import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { getHistory, clearHistory } from '@/lib/storage/history';

export default function HistoryScreen() {
  const [history, setHistory] = useState<string[]>([]);

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]);
  };

  const loadHistory = async () => {
    const storedHistory = await getHistory();
    setHistory(storedHistory);
  };

  // Carregar histórico sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <Text style={styles.empty}>No words in history</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/dictionary/${item}`)}>
              <Text style={styles.word}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {history.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
          <Text style={styles.clearText}>Clear History</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  empty: { textAlign: 'center', fontSize: 18, color: 'gray' },
  word: { fontSize: 18, padding: 10, borderBottomWidth: 1, textAlign: 'center' },
  clearButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  clearText: { color: 'white', fontSize: 18 },
});
