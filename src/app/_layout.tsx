import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import Colors from '@/constants/Colors';
import 'react-native-reanimated';
import { mvs } from 'react-native-size-matters';

export {
  // Captura qualquer erro lançado pelo componente layout.
  ErrorBoundary,
} from 'expo-router';

// Previne a splash screen de ocultar automaticamente antes do carregamento completo dos recursos.
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
          <Stack screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }} />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
