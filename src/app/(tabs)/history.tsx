import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { getHistory, clearHistory } from '@/lib/storage/history';
import { WordCard } from '@/components/WordCard';
import { View, Text, TouchableOpacity } from '@/components/Themed';
import { PageLoading } from '@/components/PageLoading';

import { s } from '@/styles/screens/history.styles';

export default function HistoryScreen() {
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClearHistory = async () => {
    Alert.alert('Limpar Histórico', 'Tem certeza que deseja limpar o histórico de palavras?', [
      {
        text: 'Sim, limpar',
        onPress: async () => {
          await clearHistory();
          setHistory([]);
        },
        style: 'destructive',
      },
      { text: 'Não' },
    ]);
  };

  const loadHistory = async () => {
    setLoading(true);
    const storedHistory = await getHistory();
    setHistory(storedHistory);
    setLoading(false);
  };

  // Carregar histórico sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  if (loading) {
    return <PageLoading />;
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>📜 Words History</Text>

      {history.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={s.emptyText}>No words in history</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <WordCard title={item} onPress={() => router.push(`/dictionary/${item}`)} />
          )}
          style={s.list}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
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
