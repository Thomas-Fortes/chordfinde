'use client';

import { INSTRUMENTS, Instrument, InstrumentId } from '@/lib/instruments';

interface Props {
  selected: InstrumentId;
  onChange: (id: InstrumentId) => void;
}

// Minimal SVG icons (custom, no emoji)
const ICONS: Record<string, React.ReactNode> = {
  guitar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="16" r="4"/>
      <path d="M12 12l7-7M17 5l2 2"/>
      <path d="M10 14l-2 2"/>
    </svg>
  ),
  piano: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="6" width="20" height="14" rx="1"/>
      <path d="M7 6v8M12 6v8M17 6v8"/>
      <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" stroke="none"/>
      <rect x="9.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" stroke="none"/>
      <rect x="14.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  voice: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="9" y="2" width="6" height="11" rx="3"/>
      <path d="M5 10a7 7 0 0014 0"/>
      <path d="M12 19v3M8 22h8"/>
    </svg>
  ),
  trumpet: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 17h4l3-9h7a2 2 0 010 4H10"/>
      <circle cx="20" cy="14" r="1.5"/>
      <path d="M3 17c0 1.5 1 2 2 2"/>
    </svg>
  ),
  clarinet: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2v18"/>
      <path d="M9 20c0 1.1.9 2 3 2s3-.9 3-2"/>
      <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  'tenor-sax': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M14 2c0 0-1 5-1 10s2 8 2 8"/>
      <path d="M13 12c-3 0-5 1-5 3s2 4 5 4"/>
      <circle cx="11" cy="7" r="1" fill="currentColor" stroke="none"/>
      <circle cx="11" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  'alto-sax': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M15 2c0 0-1 4-1 9s2 7 2 7"/>
      <path d="M14 11c-3 0-6 1-6 3s2 4 6 4"/>
      <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
};

export default function InstrumentSelector({ selected, onChange }: Props) {
  return (
    <nav aria-label="Sélection de l'instrument">
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {INSTRUMENTS.map((inst: Instrument) => {
          const isSelected = inst.id === selected;
          return (
            <button
              key={inst.id}
              onClick={() => onChange(inst.id)}
              aria-pressed={isSelected}
              title={inst.description !== 'Do concert' ? `${inst.label} — ${inst.description}` : inst.label}
              className={`
                flex flex-col items-center gap-1.5 px-4 py-3
                border text-xs font-mono tracking-widest uppercase whitespace-nowrap
                transition-all duration-300 transition-spring
                focus:outline-none focus-visible:ring-1 focus-visible:ring-accent
                flex-shrink-0
                ${isSelected
                  ? 'border-accent text-accent bg-accent/5'
                  : 'border-border text-text-dim hover:border-[#444] hover:text-text hover:translate-y-[-2px]'
                }
              `}
            >
              <span className={isSelected ? 'text-accent' : 'text-text-dim'}>
                {ICONS[inst.id]}
              </span>
              <span>{inst.label}</span>
              {inst.transpositionSemitones !== 0 && (
                <span className="text-[9px] opacity-50">{inst.description}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
