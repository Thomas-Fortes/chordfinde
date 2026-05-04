'use client';

import { MicState } from '@/hooks/usePitchDetector';

interface Props {
  state: MicState;
  onStart: () => void;
  onStop: () => void;
}

const MIC_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="11" rx="3"/>
    <path d="M5 10a7 7 0 0014 0"/>
    <path d="M12 19v3"/>
    <path d="M8 22h8"/>
  </svg>
);

const STOP_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="1"/>
  </svg>
);

export default function MicButton({ state, onStart, onStop }: Props) {
  const isActive = state === 'listening' || state === 'weak' || state === 'stable';
  const isLoading = state === 'requesting';

  const handleClick = () => {
    if (isLoading) return;
    if (isActive) onStop(); else onStart();
  };

  const label = {
    idle: 'ÉCOUTER',
    requesting: 'CONNEXION',
    listening: 'EN ÉCOUTE',
    weak: 'EN ÉCOUTE',
    stable: 'EN ÉCOUTE',
    unknown: 'EN ÉCOUTE',
    error: 'RÉESSAYER',
  }[state];

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={isLoading}
        aria-label={label}
        className={`
          relative w-20 h-20 border flex items-center justify-center
          transition-all duration-300 transition-spring
          focus:outline-none focus-visible:ring-1 focus-visible:ring-accent
          group
          ${isActive
            ? 'border-accent text-accent bg-accent/5 hover:bg-accent/10'
            : state === 'error'
            ? 'border-red-500/60 text-red-400 hover:border-red-400'
            : 'border-border text-text-dim hover:border-[#666] hover:text-text'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-none hover:-translate-y-1'}
        `}
      >
        {/* Active pulse rings */}
        {isActive && (
          <>
            <span
              className="absolute inset-0 border border-accent/40"
              style={{ animation: 'pulse-ring 1.8s ease-out infinite' }}
            />
            <span
              className="absolute inset-0 border border-accent/20"
              style={{ animation: 'pulse-ring 1.8s ease-out 0.6s infinite' }}
            />
          </>
        )}

        {/* Icon */}
        <span className="transition-transform duration-200 group-hover:scale-110">
          {isActive ? STOP_ICON : MIC_ICON}
        </span>
      </button>

      {/* Label */}
      <span className={`
        text-xs font-mono tracking-widest
        ${isActive ? 'text-accent' : 'text-text-dim'}
      `}>
        {label}
      </span>
    </div>
  );
}
