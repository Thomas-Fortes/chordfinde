'use client';

interface Props {
  notes: string[]; // pitch classes to highlight, e.g. ["C", "E", "G"]
  chordName: string;
}

// One octave: C to B, 12 keys
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEY_POSITIONS: Record<string, number> = {
  'C#': 0, 'D#': 1, 'F#': 3, 'G#': 4, 'A#': 5,
};
const BLACK_ENHARMONICS: Record<string, string> = {
  'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
};

const WHITE_W = 36;
const WHITE_H = 120;
const BLACK_W = 22;
const BLACK_H = 72;
const SVG_WIDTH = WHITE_W * 7;
const SVG_HEIGHT = WHITE_H + 4;

function normalize(note: string): string {
  return BLACK_ENHARMONICS[note] ?? note;
}

export default function PianoDiagram({ notes, chordName }: Props) {
  const normalizedNotes = notes.map(normalize);

  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      aria-label={`Touches piano pour l'accord ${chordName}`}
    >
      {/* White keys */}
      {WHITE_KEYS.map((key, i) => {
        const highlighted = normalizedNotes.includes(key);
        return (
          <g key={key}>
            <rect
              x={i * WHITE_W}
              y={0}
              width={WHITE_W - 2}
              height={WHITE_H}
              rx={3}
              fill={highlighted ? '#818cf8' : 'white'}
              stroke="#d1d5db"
              strokeWidth={1.5}
            />
            {highlighted && (
              <circle
                cx={i * WHITE_W + (WHITE_W - 2) / 2}
                cy={WHITE_H - 18}
                r={8}
                fill="#4f46e5"
              />
            )}
            <text
              x={i * WHITE_W + (WHITE_W - 2) / 2}
              y={WHITE_H - 4}
              textAnchor="middle"
              fontSize={9}
              fill={highlighted ? '#312e81' : '#9ca3af'}
              fontWeight={highlighted ? 'bold' : 'normal'}
            >
              {key}
            </text>
          </g>
        );
      })}

      {/* Black keys */}
      {Object.entries(BLACK_KEY_POSITIONS).map(([key, pos]) => {
        const highlighted = normalizedNotes.includes(key);
        const x = pos * WHITE_W + WHITE_W - BLACK_W / 2;
        return (
          <g key={key}>
            <rect
              x={x}
              y={0}
              width={BLACK_W}
              height={BLACK_H}
              rx={2}
              fill={highlighted ? '#818cf8' : '#1e1b4b'}
            />
            {highlighted && (
              <circle
                cx={x + BLACK_W / 2}
                cy={BLACK_H - 14}
                r={6}
                fill="#4f46e5"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
