import axios from 'axios';

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export const getWordDetails = async (word: string) => {
  try {
    const response = await axios.get(`${API_URL}/${word}`);
    return response.data; // Retorna o primeiro resultado
  } catch (error) {
    throw new Error(`Erro ao buscar palavra: ${error}`);
  }
};
