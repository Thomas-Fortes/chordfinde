'use client';

import { GuitarChordShape } from '@/lib/guitarChords';

interface Props {
  shape: GuitarChordShape;
  chordName: string;
}

const STRING_COUNT = 6;
const FRET_COUNT = 4;
const FRET_WIDTH = 38;
const STRING_SPACING = 32;
const TOP_PADDING = 36;
const LEFT_PADDING = 28;
const SVG_WIDTH = LEFT_PADDING + STRING_SPACING * (STRING_COUNT - 1) + LEFT_PADDING;
const SVG_HEIGHT = TOP_PADDING + FRET_WIDTH * FRET_COUNT + 20;

const FINGER_COLORS = ['', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function GuitarDiagram({ shape, chordName }: Props) {
  const baseFret = shape.baseFret ?? 1;
  const normalizedFrets = shape.frets.map((f) => (f <= 0 ? f : f - baseFret + 1));

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        aria-label={`Diagramme d'accord ${chordName}`}
      >
        {/* Nut or base fret indicator */}
        {baseFret === 1 ? (
          <rect
            x={LEFT_PADDING}
            y={TOP_PADDING - 5}
            width={STRING_SPACING * (STRING_COUNT - 1)}
            height={6}
            fill="#1e1b4b"
            rx={2}
          />
        ) : (
          <text
            x={LEFT_PADDING - 6}
            y={TOP_PADDING + FRET_WIDTH / 2}
            textAnchor="end"
            fontSize={11}
            fill="#6b7280"
          >
            {baseFret}fr
          </text>
        )}

        {/* Fret lines */}
        {Array.from({ length: FRET_COUNT }).map((_, fi) => (
          <line
            key={fi}
            x1={LEFT_PADDING}
            y1={TOP_PADDING + FRET_WIDTH * fi}
            x2={LEFT_PADDING + STRING_SPACING * (STRING_COUNT - 1)}
            y2={TOP_PADDING + FRET_WIDTH * fi}
            stroke="#d1d5db"
            strokeWidth={1}
          />
        ))}
        <line
          x1={LEFT_PADDING}
          y1={TOP_PADDING + FRET_WIDTH * FRET_COUNT}
          x2={LEFT_PADDING + STRING_SPACING * (STRING_COUNT - 1)}
          y2={TOP_PADDING + FRET_WIDTH * FRET_COUNT}
          stroke="#d1d5db"
          strokeWidth={1}
        />

        {/* String lines */}
        {Array.from({ length: STRING_COUNT }).map((_, si) => (
          <line
            key={si}
            x1={LEFT_PADDING + STRING_SPACING * si}
            y1={TOP_PADDING}
            x2={LEFT_PADDING + STRING_SPACING * si}
            y2={TOP_PADDING + FRET_WIDTH * FRET_COUNT}
            stroke="#9ca3af"
            strokeWidth={1.5}
          />
        ))}

        {/* Barre */}
        {shape.barre !== undefined && (
          <rect
            x={LEFT_PADDING - 6}
            y={TOP_PADDING + FRET_WIDTH * (shape.barre - baseFret) + 6}
            width={STRING_SPACING * (STRING_COUNT - 1) + 12}
            height={FRET_WIDTH - 12}
            rx={(FRET_WIDTH - 12) / 2}
            fill="#6366f1"
            opacity={0.85}
          />
        )}

        {/* Finger dots */}
        {normalizedFrets.map((fret, si) => {
          const x = LEFT_PADDING + STRING_SPACING * si;
          if (fret <= 0) return null;
          const y = TOP_PADDING + FRET_WIDTH * (fret - 1) + FRET_WIDTH / 2;
          const finger = shape.fingers?.[si] ?? 0;
          const color = FINGER_COLORS[finger] || '#6366f1';
          return (
            <g key={si}>
              <circle cx={x} cy={y} r={10} fill={color} />
              {finger > 0 && (
                <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fill="white" fontWeight="bold">
                  {finger}
                </text>
              )}
            </g>
          );
        })}

        {/* Open / muted indicators above nut */}
        {normalizedFrets.map((fret, si) => {
          const x = LEFT_PADDING + STRING_SPACING * si;
          const y = TOP_PADDING - 15;
          if (fret === 0) {
            return (
              <circle key={si} cx={x} cy={y} r={6} fill="none" stroke="#6366f1" strokeWidth={2} />
            );
          }
          if (fret === -1) {
            return (
              <g key={si}>
                <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} stroke="#ef4444" strokeWidth={2} />
                <line x1={x + 5} y1={y - 5} x2={x - 5} y2={y + 5} stroke="#ef4444" strokeWidth={2} />
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}
