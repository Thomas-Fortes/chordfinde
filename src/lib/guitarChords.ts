// Guitar chord fingering data
// Frets: array of 6 strings (low E to high e), -1 = muted, 0 = open
// Fingers: optional fingering positions [string, fret, finger]
// baseFret: fret offset if chord is not at open position

export interface GuitarChordShape {
  frets: number[];   // 6 strings, low E first, -1=muted, 0=open
  fingers?: number[]; // finger number for each string (0=open)
  baseFret?: number;  // base fret (1 = standard open position)
  barre?: number;     // fret of barre if applicable
}

export type GuitarChordData = Record<string, GuitarChordShape>;

export const GUITAR_CHORDS: GuitarChordData = {
  // Majors
  'C':   { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  'D':   { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  'E':   { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  'F':   { frets: [1, 1, 2, 3, 3, 1], fingers: [1, 1, 2, 3, 4, 1], barre: 1 },
  'G':   { frets: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] },
  'A':   { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  'B':   { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], barre: 2 },
  'C#':  { frets: [-1, 4, 3, 1, 2, 1], fingers: [0, 4, 3, 1, 2, 1], baseFret: 1, barre: 1 },
  'Db':  { frets: [-1, 4, 3, 1, 2, 1], fingers: [0, 4, 3, 1, 2, 1], baseFret: 1, barre: 1 },
  'D#':  { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3], baseFret: 1 },
  'Eb':  { frets: [-1, -1, 1, 3, 4, 3], fingers: [0, 0, 1, 2, 4, 3], baseFret: 1 },
  'F#':  { frets: [2, 2, 3, 4, 4, 2], fingers: [1, 1, 2, 3, 4, 1], baseFret: 2, barre: 2 },
  'Gb':  { frets: [2, 2, 3, 4, 4, 2], fingers: [1, 1, 2, 3, 4, 1], baseFret: 2, barre: 2 },
  'G#':  { frets: [4, 4, 5, 6, 6, 4], fingers: [1, 1, 2, 3, 4, 1], baseFret: 4, barre: 4 },
  'Ab':  { frets: [4, 4, 5, 6, 6, 4], fingers: [1, 1, 2, 3, 4, 1], baseFret: 4, barre: 4 },
  'A#':  { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barre: 1 },
  'Bb':  { frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barre: 1 },

  // Minors
  'Cm':  { frets: [-1, 3, 1, 0, 1, -1], fingers: [0, 3, 1, 0, 2, 0], barre: 3 },
  'Dm':  { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  'Em':  { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  'Fm':  { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barre: 1 },
  'Gm':  { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], baseFret: 3, barre: 3 },
  'Am':  { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  'Bm':  { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barre: 2 },
  'C#m': { frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], baseFret: 4, barre: 4 },
  'Dbm': { frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], baseFret: 4, barre: 4 },
  'D#m': { frets: [-1, -1, 1, 3, 4, 2], fingers: [0, 0, 1, 3, 4, 2], baseFret: 1 },
  'Ebm': { frets: [-1, -1, 1, 3, 4, 2], fingers: [0, 0, 1, 3, 4, 2], baseFret: 1 },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], baseFret: 2, barre: 2 },
  'Gbm': { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], baseFret: 2, barre: 2 },
  'G#m': { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], baseFret: 4, barre: 4 },
  'Abm': { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], baseFret: 4, barre: 4 },
  'A#m': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barre: 1 },
  'Bbm': { frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barre: 1 },

  // Dominant 7ths
  'C7':  { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
  'D7':  { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3] },
  'E7':  { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
  'G7':  { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
  'A7':  { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
  'B7':  { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] },
  'F7':  { frets: [1, 1, 2, 3, 1, 1], fingers: [1, 1, 2, 3, 1, 1], barre: 1 },

  // Major 7ths
  'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
  'Dmaj7': { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 2, 3] },
  'Emaj7': { frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0] },
  'Fmaj7': { frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 4, 3, 1, 0] },
  'Gmaj7': { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1] },
  'Amaj7': { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0] },
  'Bmaj7': { frets: [-1, 2, 4, 3, 4, 2], fingers: [0, 1, 3, 2, 4, 1], barre: 2 },
};

export function getGuitarChord(symbol: string): GuitarChordShape | null {
  return GUITAR_CHORDS[symbol] ?? null;
}
