'use client';

import { DetectedChord, toFrench, transposeNotes } from '@/lib/musicTheory';
import { getGuitarChord } from '@/lib/guitarChords';
import { InstrumentId } from '@/lib/instruments';
import GuitarDiagram from './GuitarDiagram';
import PianoDiagram from './PianoDiagram';

interface Props {
  chord: DetectedChord;
  instrumentId: InstrumentId;
  transpositionSemitones: number;
  concertNote: string;  // e.g. "C4"
  isMain?: boolean;
}

export default function ChordCard({
  chord,
  instrumentId,
  transpositionSemitones,
  concertNote,
  isMain = false,
}: Props) {
  const displayNotes = transpositionSemitones !== 0
    ? transposeNotes(chord.notes, transpositionSemitones)
    : chord.notes;

  const frenchNotes = displayNotes.map(toFrench);
  const guitarShape = (instrumentId === 'guitar') ? getGuitarChord(chord.symbol) : null;

  return (
    <div
      className={`
        rounded-2xl border p-5 flex flex-col gap-4
        ${isMain
          ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 shadow-md'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
        }
      `}
    >
      {/* Chord name */}
      <div className="flex items-center justify-between">
        <div>
          <span
            className={`font-bold ${isMain ? 'text-4xl text-indigo-700 dark:text-indigo-300' : 'text-2xl text-gray-800 dark:text-gray-200'}`}
          >
            {chord.symbol}
          </span>
          <p className={`text-sm mt-0.5 ${isMain ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>
            {toFrench(chord.root)} {chord.quality}
          </p>
        </div>
        {isMain && transpositionSemitones !== 0 && (
          <div className="text-right text-xs text-indigo-500 dark:text-indigo-400">
            <p className="font-medium">Note concert</p>
            <p>{concertNote.replace(/\d/, '')}</p>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="flex flex-wrap gap-1.5">
        {frenchNotes.map((n, i) => (
          <span
            key={i}
            className={`
              px-2.5 py-0.5 rounded-full text-sm font-medium
              ${isMain
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }
            `}
          >
            {n}
          </span>
        ))}
      </div>

      {/* Diagram */}
      {instrumentId === 'guitar' && guitarShape && (
        <GuitarDiagram shape={guitarShape} chordName={chord.symbol} />
      )}
      {instrumentId === 'piano' && (
        <PianoDiagram notes={chord.notes} chordName={chord.symbol} />
      )}
    </div>
  );
}
