import { supabase } from '@/database/supabase';

import { Word } from '@/types/word';

const PAGE_SIZE = 100; // Número de palavras carregadas por vez

export async function fetchWords(page: number, searchQuery = ''): Promise<Word[]> {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('words').select('id, word').range(from, to);

  if (searchQuery) {
    query = query.ilike('word', `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar palavras:', error);
    return [];
  }

  return data as Word[]; // Garantimos que a resposta seja um array de `Word`
}
