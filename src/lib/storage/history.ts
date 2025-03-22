import * as SecureStore from 'expo-secure-store';

const HISTORY_KEY = 'word_history';

// Função para obter o histórico salvo
export async function getHistory(): Promise<string[]> {
  const history = await SecureStore.getItemAsync(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

// Função para adicionar uma nova palavra ao histórico
export async function addToHistory(word: string) {
  const history = await getHistory();

  // Se a palavra já estiver no histórico, mova para o topo
  const updatedHistory = [word, ...history.filter((w) => w !== word)];

  // Mantemos um máximo de 20 palavras no histórico
  if (updatedHistory.length > 20) {
    updatedHistory.pop();
  }

  await SecureStore.setItemAsync(HISTORY_KEY, JSON.stringify(updatedHistory));
}

// Função para limpar o histórico
export async function clearHistory() {
  await SecureStore.deleteItemAsync(HISTORY_KEY);
}
