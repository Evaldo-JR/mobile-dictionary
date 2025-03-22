import { useState, useEffect, useCallback } from 'react';

import { WordData } from '@/types/word';
import { getWordDetails } from '@/services/dictionary';
import { addToHistory } from '@/lib/storage/history';
import { isFavorite, addToFavorites, removeFromFavorites } from '@/lib/storage/favorites';

export const useWordDetails = (word: string) => {
  const [data, setData] = useState<WordData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorite, setFavorite] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const wordData = await getWordDetails(word);
      setData(wordData);
      setError(null);
    } catch (err) {
      setError('Palavra não encontrada.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [word]);

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

  useEffect(() => {
    if (word) {
      addToHistory(word);
      loadData();
      checkFavoriteStatus();
    }
  }, [word, loadData, checkFavoriteStatus]);

  return { data, loading, error, favorite, toggleFavorite };
};
