import { type SQLiteDatabase } from 'expo-sqlite';

export interface DictionaryDatabase {
  id: number;
  word: string;
}

export async function setupDatabase(database: SQLiteDatabase) {
  try {
    console.log('📦 Banco de dados aberto com sucesso!');

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS words (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          word TEXT UNIQUE NOT NULL
        )
      `);

    console.log('✅ Tabela criada/verificada!');
  } catch (error) {
    console.error('❌ Erro ao configurar o banco de dados:', error);
  }
}

// Inserir uma palavra no banco de dados
export async function insertWord(db: SQLiteDatabase, word: string) {
  try {
    await db.runAsync('INSERT OR IGNORE INTO words (word) VALUES ($word)', {
      $word: word,
    });
    // const result = await db.runAsync('INSERT OR IGNORE INTO words (word) VALUES ($word)', {
    //   $word: word,
    // });
    // console.log('word => ', result.lastInsertRowId);
  } catch (error) {
    console.error('Erro ao inserir palavra:', error);
  }
}

export async function fetchWords(
  db: SQLiteDatabase,
  offset: number,
  limit: number
): Promise<DictionaryDatabase[]> {
  try {
    const result = await db.getAllAsync<DictionaryDatabase>(
      'SELECT * FROM words LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return result;
  } catch (error) {
    console.error('Erro ao buscar palavras:', error);
    return [];
  }
}

// Buscar todas as palavras do banco
// export async function fetchWords(db: SQLiteDatabase): Promise<DictionaryDatabase[]> {
//   try {
//     const result = await db.getAllAsync<DictionaryDatabase>('SELECT * FROM words');
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error('Erro ao buscar palavras:', error);
//     return [];
//   }
// }
