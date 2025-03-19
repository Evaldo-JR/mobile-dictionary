import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Captura qualquer erro lançado pelo componente layout.
  ErrorBoundary,
} from 'expo-router';

// Previne a splash screen de ocultar automaticamente antes do carregamento completo dos recursos.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_Bold: require('../../assets/fonts/Inter_18pt-Bold.ttf'),
    Inter_SemiBold: require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
    Inter_Regular: require('../../assets/fonts/Inter_18pt-Regular.ttf'),
  });

  // Expo Router usa Error Boundaries para capturar erros na árvore de navegação.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="dictionary/[word]" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
