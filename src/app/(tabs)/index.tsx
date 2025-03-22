import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { router } from 'expo-router';

import { DictionaryDatabase, fetchWords } from '@/database/initializeDatabase';

import { View, Text } from '@/components/Themed';
import { SearchInput } from '@/components/SearchInput';
import { useDatabase } from '@/context/DatabaseContext';
import { WordCard } from '@/components/WordCard';

import { s } from '@/styles/screens/home.styles';

const PAGE_SIZE = 100; // Número de palavras carregadas por vez

export default function WordsListScreen() {
  const db = useSQLiteContext();
  const { isDatabaseReady } = useDatabase();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<DictionaryDatabase[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Filtra um array de dados com base em um texto de busca,
   * ignorando acentos e diferenças entre maiúsculas e minúsculas.
   */
  const filteredWords = useMemo(() => {
    // Normaliza o texto de busca: remove acentos e converte para minúsculas
    const normalizedSearch = search.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    return words.filter(({ word }) =>
      word
        .toLowerCase() // Converte o título para minúsculas
        .normalize('NFD') // Normaliza para forma NFD
        .replace(/[̀-ͯ]/g, '') // Remove diacríticos
        .includes(normalizedSearch)
    );
  }, [search, words]);

  useEffect(() => {
    if (isDatabaseReady) {
      async function fetchInitialWords() {
        try {
          const initialWords = await fetchWords(db, 0, PAGE_SIZE);
          setWords(initialWords);
          setPage(1); // Define a próxima página
        } catch (error) {
          console.error('Erro ao buscar palavras:', error);
        } finally {
          setLoading(false);
        }
      }

      fetchInitialWords();
    }
  }, [isDatabaseReady, db]);

  const loadMoreWords = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const newWords = await fetchWords(db, page * PAGE_SIZE, PAGE_SIZE);
      if (newWords.length > 0) {
        setWords((prev) => [...prev, ...newWords]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais palavras:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && words.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>📖 Mobile Dictionary</Text>

      {/* Campo para pesquisa */}
      <SearchInput value={search} onChangeText={setSearch} />

      {/* Lista de palavras no banco de dados */}
      <FlatList
        data={filteredWords}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={s.list}
        contentContainerStyle={[s.listContent, filteredWords.length === 0 && { flex: 1 }]}
        columnWrapperStyle={s.columnWrapper}
        renderItem={({ item }) => (
          <WordCard title={item.word} onPress={() => router.push(`/dictionary/${item.word}`)} />
        )}
        onEndReached={loadMoreWords}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && words.length > 0 ? (
            <ActivityIndicator size="small" style={{ marginVertical: 16 }} />
          ) : null
        }
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{search ? 'Pesquisa não encontrada.' : 'Sem dados disponíveis.'}</Text>
          </View>
        )}
        initialNumToRender={PAGE_SIZE} // Número inicial de itens a renderizar
        maxToRenderPerBatch={PAGE_SIZE} // Número máximo de itens a renderizar por lote
        updateCellsBatchingPeriod={50} // Intervalo de atualização dos itens
      />
    </View>
  );
}
