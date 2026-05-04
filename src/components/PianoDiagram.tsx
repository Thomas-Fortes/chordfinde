'use client';

interface Props {
  notes: string[];
  chordName: string;
}

const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_POSITIONS: Record<string, number> = {
  'C#': 0, 'D#': 1, 'F#': 3, 'G#': 4, 'A#': 5,
};
const ENHARMONICS: Record<string, string> = {
  Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#',
};

const WW = 34;
const WH = 100;
const BW = 20;
const BH = 62;
const SVG_W = WW * 7;
const SVG_H = WH;

function norm(n: string) { return ENHARMONICS[n] ?? n; }

export default function PianoDiagram({ notes, chordName }: Props) {
  const active = notes.map(norm);

  return (
    <svg
      width={SVG_W}
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      aria-label={`Touches piano — ${chordName}`}
      className="mx-auto"
    >
      {/* White keys */}
      {WHITE_KEYS.map((key, i) => {
        const on = active.includes(key);
        return (
          <g key={key}>
            <rect
              x={i * WW} y={0}
              width={WW - 1} height={WH}
              fill={on ? '#C8F562' : '#161616'}
              stroke="#2A2A2A" strokeWidth={1}
            />
            {on && (
              <circle cx={i * WW + (WW - 1) / 2} cy={WH - 14} r={5} fill="#080808"/>
            )}
            <text
              x={i * WW + (WW - 1) / 2} y={WH - 4}
              textAnchor="middle" fontSize={8}
              fill={on ? '#080808' : '#333'}
              fontFamily="monospace"
            >
              {key}
            </text>
          </g>
        );
      })}

      {/* Black keys */}
      {Object.entries(BLACK_POSITIONS).map(([key, pos]) => {
        const on = active.includes(key);
        const x = pos * WW + WW - BW / 2;
        return (
          <g key={key}>
            <rect
              x={x} y={0}
              width={BW} height={BH}
              fill={on ? '#C8F562' : '#0A0A0A'}
              stroke={on ? '#C8F562' : '#2A2A2A'}
              strokeWidth={1}
            />
            {on && (
              <circle cx={x + BW / 2} cy={BH - 10} r={4} fill="#080808"/>
            )}
          </g>
        );
      })}
    </svg>
  );
}
