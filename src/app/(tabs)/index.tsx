import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { router } from 'expo-router';
import { View, Text } from '@/components/Themed';
import { SearchInput } from '@/components/SearchInput';
import { WordCard } from '@/components/WordCard';
import { fetchWords } from '@/lib/fetchWords';
import { s } from '@/styles/screens/home.styles';
import { Word } from '@/types/word';
import { PageLoading } from '@/components/PageLoading';

const PAGE_SIZE = 100;

export default function WordsListScreen() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Chama a função de carregar palavras ao abrir o app
  useEffect(() => {
    loadInitialWords();
  }, []);

  // Função de debounce
  const debounce = (func: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  };

  // Uso do debounce na atualização da pesquisa
  const debouncedUpdateSearch = debounce(() => {
    loadInitialWords();
  }, 300); // 300ms de delay

  // Função para atualizar a pesquisa
  const updateSearch = (searchQuery: string) => {
    setSearch(searchQuery);
    setPage(1); // Resetando a página para 1 quando a pesquisa for alterada
    debouncedUpdateSearch(); // Usa o debounce para chamar loadInitialWords
  };

  // Função para carregar palavras iniciais
  const loadInitialWords = async () => {
    setLoading(true);
    const initialWords = await fetchWords(0, search); // Usa o valor atual de `search`
    setWords(initialWords);
    setPage(1);
    setHasMore(initialWords.length === PAGE_SIZE);
    setLoading(false);
    setPageLoading(false);
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>📖 Mobile Dictionary</Text>

      <SearchInput value={search} onChangeText={updateSearch} />

      {pageLoading ? (
        <PageLoading />
      ) : (
        <FlatList
          data={words}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          style={s.list}
          contentContainerStyle={[s.listContent, words.length === 0 && { flex: 1 }]}
          columnWrapperStyle={s.columnWrapper}
          renderItem={({ item }) => (
            <WordCard title={item.word} onPress={() => router.push(`/dictionary/${item.word}`)} />
          )}
          onEndReached={loadInitialWords} // Função chamada para carregar mais palavras
          onEndReachedThreshold={0.5} // Carrega mais palavras quando a lista chega a 50% do final
          ListFooterComponent={
            loading && words.length > 0 ? (
              <ActivityIndicator size="small" style={{ marginVertical: 16 }} />
            ) : null
          }
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{search ? 'Nenhuma palavra encontrada.' : 'Sem dados disponíveis.'}</Text>
            </View>
          )}
          initialNumToRender={PAGE_SIZE}
          maxToRenderPerBatch={PAGE_SIZE}
          updateCellsBatchingPeriod={50}
        />
      )}
    </View>
  );
}
