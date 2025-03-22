import * as SecureStore from 'expo-secure-store';

const IMPORTED_KEY = 'database_populated';

type DatabaseStorageStages = {
  stage1: boolean;
  stage2: boolean;
};

export async function setDatabasePopulated(stages: DatabaseStorageStages) {
  try {
    await SecureStore.setItemAsync(IMPORTED_KEY, JSON.stringify(stages));
  } catch (error) {
    console.error('Erro ao salvar no SecureStore:', error);
  }
}

export async function isDatabasePopulated(): Promise<DatabaseStorageStages> {
  try {
    const values = await SecureStore.getItemAsync(IMPORTED_KEY);
    if (values) {
      return JSON.parse(values) as DatabaseStorageStages;
    }
  } catch (error) {
    console.error('Erro ao ler do SecureStore:', error);
  }

  // Retorna valores padrão caso ocorra um erro ou não haja valores
  return { stage1: false, stage2: false };
}
