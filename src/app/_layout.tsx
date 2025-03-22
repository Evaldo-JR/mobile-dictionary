import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { mvs } from 'react-native-size-matters';
import 'react-native-reanimated';

import Colors from '@/constants/Colors';
import { setupDatabase } from '@/database/initializeDatabase';
import { importInitialWords, importRemainingWords } from '@/lib/importData';
import { DatabaseProvider, useDatabase } from '@/context/DatabaseContext';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_Light: require('../../assets/fonts/Inter_18pt-Light.ttf'),
    Inter_Light_Italic: require('../../assets/fonts/Inter_18pt-LightItalic.ttf'),
    Inter_Regular: require('../../assets/fonts/Inter_18pt-Regular.ttf'),
    Inter_Regular_Italic: require('../../assets/fonts/Inter_18pt-Italic.ttf'),
    Inter_Medium: require('../../assets/fonts/Inter_18pt-Medium.ttf'),
    Inter_Medium_Italic: require('../../assets/fonts/Inter_18pt-MediumItalic.ttf'),
    Inter_SemiBold: require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
    Inter_Bold: require('../../assets/fonts/Inter_18pt-Bold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="dictionary.db" onInit={setupDatabase}>
      <DatabaseProvider>
        <RootLayoutNav />
      </DatabaseProvider>
    </SQLiteProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();
  const { setIsDatabaseReady } = useDatabase();

  useEffect(() => {
    async function initializeDatabase() {
      try {
        await importInitialWords(db); // Importa palavras iniciais
        setIsDatabaseReady(true); // Marca o banco de dados como pronto para uso

        SplashScreen.hideAsync(); // Oculta a Splash Screen após carregar as palavras iniciais

        await importRemainingWords(db); // Importa o restante das palavras em segundo plano

        setIsDatabaseReady(true); // Marca o banco de dados como totalmente pronto
      } catch (error) {
        console.error('❌ Erro ao inicializar o banco de dados:', error);
      } finally {
        SplashScreen.hideAsync(); // Garante que a Splash Screen seja ocultada
      }
    }

    initializeDatabase();
  }, [db, setIsDatabaseReady]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: mvs(8),
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          }}
        >
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
