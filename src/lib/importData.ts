import { insertWord } from '@/database/initializeDatabase';
import { isDatabasePopulated, setDatabasePopulated } from '@/lib/storage/database';
import { type SQLiteDatabase } from 'expo-sqlite';

// Arquivo inicial com palavras mais comuns
const INITIAL_WORDS = require('@/assets/data/words_dictionary_initial.json');

// Arquivos adicionais com o restante das palavras
const WORD_FILES = [
  require('@/assets/data/words_dictionary_part1.json'),
  require('@/assets/data/words_dictionary_part2.json'),
  require('@/assets/data/words_dictionary_part3.json'),
  require('@/assets/data/words_dictionary_part4.json'),
  require('@/assets/data/words_dictionary_part5.json'),
  require('@/assets/data/words_dictionary_part6.json'),
  require('@/assets/data/words_dictionary_part7.json'),
];

export async function importInitialWords(db: SQLiteDatabase) {
  try {
    const { stage1 } = await isDatabasePopulated();

    if (stage1) {
      console.log('✅ O primeiro estágio do banco já está populado.');
      return;
    }

    const words = Object.keys(INITIAL_WORDS);
    for (const word of words) {
      await insertWord(db, word);
    }

    await setDatabasePopulated({ stage1: true, stage2: false });
    console.log('✅ Palavras iniciais importadas!');
  } catch (error) {
    console.error('❌ Erro ao importar palavras iniciais:', error);
  }
}

export async function importRemainingWords(db: SQLiteDatabase) {
  try {
    // const { stage2 } = await isDatabasePopulated();

    // if (stage2) {
    //   console.log('✅ O banco já está populado.');
    //   return;
    // }

    // for (const file of WORD_FILES) {
    //   const words = Object.keys(file);
    //   for (const word of words) {
    //     await insertWord(db, word);
    //   }
    //   console.log(`✅ Inserido arquivo ${WORD_FILES.indexOf(file) + 1}/${WORD_FILES.length}`);
    // }

    // await setDatabasePopulated({ stage1: true, stage2: true });
    console.log('🎉 Importação concluída!');
  } catch (error) {
    console.error('❌ Erro ao importar palavras:', error);
  }
}
