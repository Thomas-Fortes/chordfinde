import { Note, Chord, ChordType, Interval } from 'tonal';

export interface DetectedChord {
  symbol: string;       // e.g. "Cmaj7"
  name: string;         // e.g. "C major seventh"
  root: string;         // e.g. "C"
  quality: string;      // e.g. "Major"
  notes: string[];      // e.g. ["C", "E", "G", "B"]
  intervals: string[];  // e.g. ["1P", "3M", "5P", "7M"]
  complexity: number;   // 0 = simplest (major), higher = more complex
}

const CHORD_TYPES_RANKED = [
  { alias: 'M',    quality: 'Majeur',    complexity: 0 },
  { alias: 'm',    quality: 'Mineur',    complexity: 1 },
  { alias: '7',    quality: 'Dominant 7', complexity: 2 },
  { alias: 'maj7', quality: 'Major 7',   complexity: 3 },
  { alias: 'm7',   quality: 'Mineur 7',  complexity: 4 },
  { alias: 'sus2', quality: 'Sus2',      complexity: 5 },
  { alias: 'sus4', quality: 'Sus4',      complexity: 5 },
  { alias: 'dim',  quality: 'Diminué',   complexity: 6 },
  { alias: 'aug',  quality: 'Augmenté',  complexity: 6 },
  { alias: 'm7b5', quality: 'Demi-dim',  complexity: 7 },
  { alias: 'dim7', quality: 'Dim 7',     complexity: 7 },
  { alias: '6',    quality: 'Majeur 6',  complexity: 8 },
  { alias: 'm6',   quality: 'Mineur 6',  complexity: 8 },
  { alias: '9',    quality: 'Neuvième',  complexity: 9 },
  { alias: 'maj9', quality: 'Major 9',   complexity: 9 },
  { alias: 'm9',   quality: 'Mineur 9',  complexity: 9 },
  { alias: 'add9', quality: 'Add9',      complexity: 8 },
];

export function getChordsForNote(noteName: string): DetectedChord[] {
  const pitchClass = Note.pitchClass(noteName);
  if (!pitchClass) return [];

  const results: DetectedChord[] = [];

  for (const chordType of CHORD_TYPES_RANKED) {
    const symbol = `${pitchClass}${chordType.alias === 'M' ? '' : chordType.alias}`;
    // Use 'M' for major but display without suffix (e.g. "C" not "CM")
    const chord = Chord.get(`${pitchClass}${chordType.alias}`);
    if (!chord || chord.empty) continue;

    results.push({
      symbol: `${pitchClass}${chordType.alias === 'M' ? '' : chordType.alias}`,
      name: `${pitchClass} ${chordType.quality}`,
      root: pitchClass,
      quality: chordType.quality,
      notes: chord.notes,
      intervals: chord.intervals,
      complexity: chordType.complexity,
    });
  }

  return results.sort((a, b) => a.complexity - b.complexity);
}

const SEMITONE_TO_INTERVAL: Record<number, string> = {
  0:  '1P',
  1:  '2m',
  2:  '2M',
  3:  '3m',
  4:  '3M',
  5:  '4P',
  6:  '5d',
  7:  '5P',
  8:  '6m',
  9:  '6M',
  10: '7m',
  11: '7M',
};

export function transposeNote(noteName: string, semitones: number): string {
  if (semitones === 0) return noteName;
  const interval = SEMITONE_TO_INTERVAL[((semitones % 12) + 12) % 12];
  const transposed = Note.transpose(noteName, interval);
  return Note.simplify(transposed) || transposed;
}

export function transposeNotes(notes: string[], semitones: number): string[] {
  return notes.map((n) => transposeNote(n, semitones));
}

export function freqToNote(freq: number): string | null {
  if (freq <= 0) return null;
  const note = Note.fromFreq(freq);
  return note || null;
}

export function noteToDisplay(note: string, semitones: number): { concert: string; instrument: string } {
  const concert = Note.pitchClass(note);
  const instrument = Note.pitchClass(transposeNote(note, semitones));
  return { concert: concert || note, instrument: instrument || note };
}

// Friendly French note names
const NOTE_FR: Record<string, string> = {
  C: 'Do', D: 'Ré', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si',
  'C#': 'Do#', 'Db': 'Ré♭', 'D#': 'Ré#', 'Eb': 'Mi♭', 'E#': 'Fa',
  'F#': 'Fa#', 'Gb': 'Sol♭', 'G#': 'Sol#', 'Ab': 'La♭',
  'A#': 'La#', 'Bb': 'Si♭', 'B#': 'Do',
};

export function toFrench(note: string): string {
  return NOTE_FR[note] ?? note;
}

export function chordRootFrench(chord: DetectedChord): string {
  return `${toFrench(chord.root)} ${chord.quality}`;
}
