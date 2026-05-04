'use client';

import { MicState } from '@/hooks/usePitchDetector';

interface Props {
  state: MicState;
  onStart: () => void;
  onStop: () => void;
}

const STATE_CONFIG: Record<MicState, { label: string; color: string; pulse: boolean }> = {
  idle:       { label: 'Écouter',       color: 'bg-indigo-600 hover:bg-indigo-700', pulse: false },
  requesting: { label: 'Connexion…',    color: 'bg-gray-400',                       pulse: true  },
  listening:  { label: 'En écoute…',   color: 'bg-emerald-500 hover:bg-emerald-600', pulse: true },
  weak:       { label: 'Son faible…',  color: 'bg-amber-500 hover:bg-amber-600',    pulse: true  },
  stable:     { label: 'Détecté !',    color: 'bg-emerald-600 hover:bg-emerald-700', pulse: false },
  unknown:    { label: 'En écoute…',   color: 'bg-indigo-500 hover:bg-indigo-600',  pulse: true  },
  error:      { label: 'Réessayer',    color: 'bg-red-500 hover:bg-red-600',         pulse: false },
};

export default function MicButton({ state, onStart, onStop }: Props) {
  const cfg = STATE_CONFIG[state];
  const isActive = state === 'listening' || state === 'weak' || state === 'stable';

  const handleClick = () => {
    if (state === 'requesting') return;
    if (isActive) onStop();
    else onStart();
  };

  return (
    <button
      onClick={handleClick}
      disabled={state === 'requesting'}
      aria-label={cfg.label}
      className={`
        relative flex items-center justify-center gap-3
        px-8 py-4 rounded-full text-white font-semibold text-lg
        transition-all shadow-lg active:scale-95
        focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300
        ${cfg.color}
        ${state === 'requesting' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
      `}
    >
      {/* Pulse ring */}
      {cfg.pulse && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current" />
      )}

      {/* Mic icon */}
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        {isActive ? (
          // Stop icon
          <rect x={6} y={6} width={12} height={12} rx={2} />
        ) : (
          // Mic icon
          <>
            <rect x={9} y={2} width={6} height={11} rx={3} />
            <path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" />
          </>
        )}
      </svg>

      <span>{cfg.label}</span>
    </button>
  );
}
