export interface Word {
  id: number;
  word: string;
}

export interface Phonetic {
  text: string;
  audio?: string;
}

export interface Definition {
  definition: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface WordData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}
