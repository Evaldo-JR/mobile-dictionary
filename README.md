# Mobile Dictionary - Desafio Técnico

Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de emprego. O objetivo era criar um aplicativo de dicionário móvel utilizando **React Native** com **Expo** e **TypeScript**. O aplicativo permite aos usuários buscar palavras, visualizar definições, ouvir a pronúncia, salvar favoritos e manter um histórico de palavras pesquisadas. Abaixo, detalho as principais decisões e desafios enfrentados durante o desenvolvimento.

## Tecnologias Utilizadas

- **React Native com Expo**: Escolhi o Expo por sua facilidade de configuração e por permitir o desenvolvimento rápido com acesso a APIs nativas.
- **TypeScript**: Para garantir tipagem estática e melhorar a manutenção do código.
- **Expo Router**: Sistema de rotas baseado em arquivos, que facilita a navegação entre telas.
- **Supabase**: Banco de dados remoto utilizado para buscar as palavras e suas definições.
- **Expo AV e Expo Speech**: Bibliotecas para reprodução de áudio e leitura de texto (Text-to-Speech).
- **Expo Secure Store**: Para armazenar o histórico de palavras e favoritos de forma segura.

## Desafios e Decisões

### 1. **Estrutura de Navegação e Layout**

A navegação foi implementada usando o **Expo Router**, que permite uma configuração de rotas baseada em arquivos. Isso simplificou a organização do código e a navegação entre telas. O layout principal foi estruturado com `SafeAreaView` para garantir que o conteúdo seja exibido corretamente em dispositivos com notches ou áreas seguras.

```tsx
// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

### 2. **Busca e Listagem de Palavras**

A busca de palavras foi implementada com um `FlatList` que carrega os dados de forma paginada a partir do Supabase. Para melhorar a experiência do usuário, adicionei um sistema de **debounce** na barra de busca, que aguarda 300ms após a digitação para realizar a requisição, evitando múltiplas chamadas desnecessárias.

```tsx
// src/app/(tabs)/index.tsx
const debounce = (func: () => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

const updateSearch = (searchQuery: string) => {
  setSearch(searchQuery);
  setPage(1);
  debouncedUpdateSearch();
};
```

### 3. **Reprodução de Áudio e Text-to-Speech**

Para a funcionalidade de áudio, utilizei a biblioteca `expo-av` para reproduzir áudios de pronúncia disponíveis na API. Caso o áudio não estivesse disponível, implementei um fallback usando `expo-speech` para ler a palavra em voz alta.

```tsx
// src/app/dictionary/[word].tsx
const playPronunciation = useCallback(() => {
  if (word) {
    speak(word, {
      language: 'en',
      rate: 0.8,
    });
  }
}, [word]);
```

### 4. **Armazenamento Local de Histórico e Favoritos**

O histórico de palavras pesquisadas e as palavras favoritas são armazenados localmente usando `expo-secure-store`, que oferece uma maneira segura de armazenar dados sensíveis. A cada nova pesquisa, a palavra é adicionada ao histórico, e o usuário pode favoritar palavras para acessá-las posteriormente.

```tsx
// src/app/(tabs)/history.tsx
const loadHistory = async () => {
  const storedHistory = await getHistory();
  setHistory(storedHistory);
};
```

### 5. **Design Responsivo e Temas**

O aplicativo suporta temas claro e escuro, utilizando o `ThemeProvider` do `@react-navigation/native`. As cores e estilos foram definidos em um arquivo centralizado (`Colors.ts`), facilitando a manutenção e consistência visual.

```tsx
// src/app/_layout.tsx
const colorScheme = useColorScheme();
<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  {/* Conteúdo */}
</ThemeProvider>;
```

## Conclusão

Este projeto foi um desafio interessante que me permitiu explorar diversas tecnologias e conceitos, desde a integração com APIs externas até a implementação de funcionalidades complexas como reprodução de áudio e armazenamento seguro. Acredito que o resultado final atende aos requisitos propostos e demonstra minha capacidade de resolver problemas e entregar soluções eficientes.

Para mais detalhes sobre o código, sinta-se à vontade para explorar o repositório no GitHub: [Mobile Dictionary](https://github.com/Evaldo-JR/mobile-dictionary).

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para instalar e executar o aplicativo em sua máquina:

### Pré-requisitos

- Node.js instalado (versão 16 ou superior).
- Expo CLI instalado globalmente (npm install -g expo-cli).
- Um dispositivo físico ou emulador configurado para rodar aplicativos React Native.

### Passos para Instalação

Clone o repositório:

```bash
git clone https://github.com/Evaldo-JR/mobile-dictionary.git
cd mobile-dictionary
```

### Instale as dependências:

```bash
npm install
```

### Configure o ambiente:

Certifique-se de ter o arquivo .env na raiz do projeto com as variáveis de ambiente necessárias (como a URL do Supabase).

Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

### Execute o aplicativo:

Escaneie o QR code exibido no terminal com o aplicativo Expo Go (disponível na App Store ou Google Play).
Ou, se estiver usando um emulador, pressione a (para Android) ou i (para iOS) no terminal para abrir o aplicativo diretamente no emulador.
