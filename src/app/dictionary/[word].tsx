import { useCallback } from 'react';
import { Button, SectionList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { mvs } from 'react-native-size-matters';
import { speak } from 'expo-speech';

import { useWordDetails } from '@/hooks/useWordDetails';
import { View, Text, TouchableOpacity, useThemeColor } from '@/components/Themed';
import { AudioButton } from '@/components/AudioButton';
import { PageLoading } from '@/components/PageLoading';
import { BackButton } from '@/components/BackButton';

import { colors } from '@/styles/themes';
import { s } from '@/styles/screens/wordDetails.styles';

export default function WordDetailScreen() {
  const { word } = useLocalSearchParams<{ word: string }>();
  const { data, loading, error, favorite, toggleFavorite } = useWordDetails(word || '');

  const playPronunciation = useCallback(() => {
    if (word) {
      speak(word, {
        language: 'en',
        rate: 0.8,
      });
    }
  }, [word]);

  if (loading) return <PageLoading />;
  if (error)
    return (
      <View style={s.callback}>
        <Text style={s.error}>{error}</Text>
        <Button title="VOLTAR" onPress={router.back} />
      </View>
    );
  if (!data)
    return (
      <View style={s.callback}>
        <Text style={s.error}>Word not found</Text>
        <Button title="VOLTAR" onPress={router.back} />
      </View>
    );

  // Obtém a fonética que contém o áudio (se disponível)
  const phoneticWithAudio = data[0].phonetics.find((phonetic) => phonetic.audio);
  const phoneticText = phoneticWithAudio?.text || ''; // Texto da fonética
  const audioUrl = phoneticWithAudio?.audio; // URL do áudio

  // Transforma os dados para a SectionList
  const sections = data.flatMap((entry) =>
    entry.meanings.map((meaning) => ({
      title: meaning.partOfSpeech, // Título da seção (parte do discurso)
      data: meaning.definitions, // Dados da seção (definições)
    }))
  );

  return (
    <View style={s.container}>
      {/* Botão de Voltar */}
      <BackButton />

      {/* Palavra em Destaque */}
      <View style={s.highlightBox}>
        <Text style={s.highlightWord}>{data[0].word}</Text>
        {phoneticText && <Text style={s.highlightPhonetic}>{phoneticText}</Text>}
      </View>

      {/* Botões de Favoritar e Escutar */}
      <View style={s.buttonsContainer}>
        <TouchableOpacity style={s.favoriteButton} onPress={toggleFavorite}>
          {favorite ? (
            <FontAwesome name="heart" color={colors['punch-red'][600]} size={mvs(20)} />
          ) : (
            <FontAwesome name="heart-o" color={colors['punch-red'][600]} size={mvs(20)} />
          )}
        </TouchableOpacity>

        {audioUrl ? (
          <AudioButton audioUrl={audioUrl} />
        ) : (
          // Usa Text-to-Speech caso o áudio não esteja disponível
          <TouchableOpacity style={s.audioButton} onPress={playPronunciation}>
            <Text style={s.audioText}>🔊 Listen</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text lightColor={colors['comet-gray'][900]} style={s.heading}>
        Meanings
      </Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.definition + index}
        renderSectionHeader={({ section: { title } }) => (
          <View style={s.sectionHeader}>
            <Text
              lightColor={colors['cerulean-blue'][700]}
              darkColor={colors['cerulean-blue'][500]}
              style={s.partOfSpeech}
            >
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={s.definitionContainer}>
            <Text lightColor={colors['comet-gray'][800]} style={s.definition}>
              • {item.definition}
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listContent}
      />
    </View>
  );
}
