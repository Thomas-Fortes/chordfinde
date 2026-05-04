'use client';

import { GuitarChordShape } from '@/lib/guitarChords';

interface Props {
  shape: GuitarChordShape;
  chordName: string;
}

const STRING_COUNT = 6;
const FRET_COUNT = 4;
const FRET_H = 36;
const STRING_GAP = 30;
const PAD_X = 28;
const PAD_Y = 34;
const W = PAD_X + STRING_GAP * (STRING_COUNT - 1) + PAD_X;
const H = PAD_Y + FRET_H * FRET_COUNT + 16;

export default function GuitarDiagram({ shape, chordName }: Props) {
  const base = shape.baseFret ?? 1;
  const normalized = shape.frets.map((f) => (f <= 0 ? f : f - base + 1));

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-label={`Diagramme ${chordName}`}
      className="mx-auto"
    >
      {/* Nut */}
      {base === 1 ? (
        <rect x={PAD_X} y={PAD_Y - 5} width={STRING_GAP * (STRING_COUNT - 1)} height={4} fill="#E8E8E8" opacity={0.6}/>
      ) : (
        <text x={PAD_X - 6} y={PAD_Y + FRET_H / 2 + 4} textAnchor="end" fontSize={10} fill="#555" fontFamily="monospace">
          {base}fr
        </text>
      )}

      {/* Fret lines */}
      {Array.from({ length: FRET_COUNT + 1 }).map((_, i) => (
        <line key={i}
          x1={PAD_X} y1={PAD_Y + FRET_H * i}
          x2={PAD_X + STRING_GAP * (STRING_COUNT - 1)} y2={PAD_Y + FRET_H * i}
          stroke="#2A2A2A" strokeWidth={1}
        />
      ))}

      {/* Strings */}
      {Array.from({ length: STRING_COUNT }).map((_, i) => (
        <line key={i}
          x1={PAD_X + STRING_GAP * i} y1={PAD_Y}
          x2={PAD_X + STRING_GAP * i} y2={PAD_Y + FRET_H * FRET_COUNT}
          stroke="#444" strokeWidth={1}
        />
      ))}

      {/* Barre */}
      {shape.barre !== undefined && (
        <rect
          x={PAD_X - 4}
          y={PAD_Y + FRET_H * (shape.barre - base) + 6}
          width={STRING_GAP * (STRING_COUNT - 1) + 8}
          height={FRET_H - 12}
          rx={(FRET_H - 12) / 2}
          fill="#C8F562"
          opacity={0.85}
        />
      )}

      {/* Dots */}
      {normalized.map((fret, si) => {
        if (fret <= 0) return null;
        const x = PAD_X + STRING_GAP * si;
        const y = PAD_Y + FRET_H * (fret - 1) + FRET_H / 2;
        return (
          <circle key={si} cx={x} cy={y} r={9} fill="#C8F562" opacity={0.9}/>
        );
      })}

      {/* Open / muted */}
      {normalized.map((fret, si) => {
        const x = PAD_X + STRING_GAP * si;
        const y = PAD_Y - 15;
        if (fret === 0) {
          return <circle key={si} cx={x} cy={y} r={5} fill="none" stroke="#E8E8E8" strokeWidth={1} opacity={0.5}/>;
        }
        if (fret === -1) {
          return (
            <g key={si}>
              <line x1={x-4} y1={y-4} x2={x+4} y2={y+4} stroke="#444" strokeWidth={1.5}/>
              <line x1={x+4} y1={y-4} x2={x-4} y2={y+4} stroke="#444" strokeWidth={1.5}/>
            </g>
          );
        }
        return null;
      })}
    </svg>
  );
}
