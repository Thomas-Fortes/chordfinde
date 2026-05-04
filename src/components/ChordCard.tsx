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
  concertNote: string;
  isMain?: boolean;
  animKey?: string;
}

export default function ChordCard({
  chord,
  instrumentId,
  transpositionSemitones,
  concertNote,
  isMain = false,
  animKey,
}: Props) {
  const displayNotes = transpositionSemitones !== 0
    ? transposeNotes(chord.notes, transpositionSemitones)
    : chord.notes;

  const frenchNotes = displayNotes.map(toFrench);
  const guitarShape = instrumentId === 'guitar' ? getGuitarChord(chord.symbol) : null;

  if (isMain) {
    return (
      <div key={animKey} className="animate-clip-reveal">
        {/* Big chord name — the "waouh" moment */}
        <div className="flex items-end gap-6 mb-6">
          <div>
            <p className="text-xs font-mono tracking-widest text-text-dim mb-1">ACCORD</p>
            <h2
              className="font-display leading-none tracking-tight text-text"
              style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', letterSpacing: '-0.03em' }}
            >
              {chord.symbol}
            </h2>
          </div>
          <div className="pb-3">
            <p className="text-xs font-mono tracking-widest text-accent uppercase">
              {chord.quality}
            </p>
            {transpositionSemitones !== 0 && (
              <p className="text-xs font-mono text-text-dim mt-1">
                concert : {toFrench(concertNote.replace(/\d/, ''))}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-wrap gap-2 mb-6">
          {frenchNotes.map((n, i) => (
            <span
              key={i}
              className="px-3 py-1 border border-border text-xs font-mono tracking-wider text-text-dim"
            >
              {n}
            </span>
          ))}
        </div>

        {/* Diagram */}
        {instrumentId === 'guitar' && guitarShape && (
          <div className="border border-border p-6 inline-block">
            <GuitarDiagram shape={guitarShape} chordName={chord.symbol} />
          </div>
        )}
        {instrumentId === 'piano' && (
          <div className="border border-border p-4 inline-block overflow-x-auto max-w-full">
            <PianoDiagram notes={chord.notes} chordName={chord.symbol} />
          </div>
        )}
      </div>
    );
  }

  // Secondary card (advanced mode)
  return (
    <div className="border border-border p-4 hover:border-[#3A3A3A] transition-colors duration-300 animate-fade-up">
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-display text-2xl text-text" style={{ letterSpacing: '-0.02em' }}>
          {chord.symbol}
        </span>
        <span className="text-xs font-mono text-text-dim uppercase tracking-wider">
          {chord.quality}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {frenchNotes.map((n, i) => (
          <span key={i} className="text-xs font-mono text-text-dim border border-border px-2 py-0.5">
            {n}
          </span>
        ))}
      </div>
      {instrumentId === 'guitar' && guitarShape && (
        <div className="mt-4">
          <GuitarDiagram shape={guitarShape} chordName={chord.symbol} />
        </div>
      )}
      {instrumentId === 'piano' && (
        <div className="mt-4 overflow-x-auto">
          <PianoDiagram notes={chord.notes} chordName={chord.symbol} />
        </div>
      )}
    </div>
  );
}
