import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';

import { colors } from '@/styles/themes';
import { s } from './styles';

interface AudioButtonProps {
  audioUrl: string; // URL do áudio .mp3
}

export function AudioButton({ audioUrl }: AudioButtonProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Carrega o áudio quando o componente é montado
  useEffect(() => {
    const loadAudio = async () => {
      if (audioUrl) {
        setIsLoading(true);
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setSound(sound);
        setIsLoading(false);
      }
    };

    loadAudio();

    // Limpa o áudio quando o componente é desmontado
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]);

  // Reproduz o áudio
  const playAudio = async () => {
    if (sound) {
      await sound.replayAsync(); // Reproduz o áudio do início
    }
  };

  return (
    <TouchableOpacity onPress={playAudio} disabled={isLoading}>
      <View style={s.container}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors['cerulean-blue'][800]} />
        ) : (
          <Text style={s.text}>🔊 Listen</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
