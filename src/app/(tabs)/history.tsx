import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { getHistory, clearHistory } from '@/lib/storage/history';
import { s } from '@/styles/screens/history.styles';

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
    <View style={s.container}>
      <Text style={s.title}>📜 Search History</Text>

      {history.length === 0 ? (
        <Text style={s.emptyText}>No words in history</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={s.card} onPress={() => router.push(`/dictionary/${item}`)}>
              <Text style={s.wordText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={s.list}
        />
      )}

      {history.length > 0 && (
        <TouchableOpacity style={s.clearButton} onPress={handleClearHistory}>
          <Text style={s.clearText}>Clear History</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
