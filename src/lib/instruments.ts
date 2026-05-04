export type InstrumentId =
  | 'guitar'
  | 'piano'
  | 'trumpet'
  | 'alto-sax'
  | 'tenor-sax'
  | 'clarinet'
  | 'voice';

export type DisplayMode = 'diagram' | 'notes';

export interface Instrument {
  id: InstrumentId;
  label: string;
  emoji: string;
  transpositionSemitones: number; // semitones to add to concert pitch for display
  displayMode: DisplayMode;
  description: string;
}

export const INSTRUMENTS: Instrument[] = [
  {
    id: 'guitar',
    label: 'Guitare',
    emoji: '🎸',
    transpositionSemitones: 0,
    displayMode: 'diagram',
    description: 'Do concert',
  },
  {
    id: 'piano',
    label: 'Piano',
    emoji: '🎹',
    transpositionSemitones: 0,
    displayMode: 'diagram',
    description: 'Do concert',
  },
  {
    id: 'voice',
    label: 'Voix',
    emoji: '🎤',
    transpositionSemitones: 0,
    displayMode: 'notes',
    description: 'Do concert',
  },
  {
    id: 'trumpet',
    label: 'Trompette',
    emoji: '🎺',
    transpositionSemitones: 2,
    displayMode: 'notes',
    description: 'Si♭',
  },
  {
    id: 'clarinet',
    label: 'Clarinette',
    emoji: '🎶',
    transpositionSemitones: 2,
    displayMode: 'notes',
    description: 'Si♭',
  },
  {
    id: 'tenor-sax',
    label: 'Sax Ténor',
    emoji: '🎷',
    transpositionSemitones: 2,
    displayMode: 'notes',
    description: 'Si♭',
  },
  {
    id: 'alto-sax',
    label: 'Sax Alto',
    emoji: '🎷',
    transpositionSemitones: 9,
    displayMode: 'notes',
    description: 'Mi♭',
  },
];

export function getInstrument(id: InstrumentId): Instrument {
  return INSTRUMENTS.find((i) => i.id === id) ?? INSTRUMENTS[0];
}
