'use client';

import { INSTRUMENTS, Instrument, InstrumentId } from '@/lib/instruments';

interface Props {
  selected: InstrumentId;
  onChange: (id: InstrumentId) => void;
}

export default function InstrumentSelector({ selected, onChange }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
        Instrument
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {INSTRUMENTS.map((inst: Instrument) => {
          const isSelected = inst.id === selected;
          return (
            <button
              key={inst.id}
              onClick={() => onChange(inst.id)}
              aria-pressed={isSelected}
              className={`
                flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all
                text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                ${isSelected
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50'
                }
              `}
            >
              <span className="text-2xl" role="img" aria-label={inst.label}>{inst.emoji}</span>
              <span>{inst.label}</span>
              {inst.transpositionSemitones !== 0 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">{inst.description}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
