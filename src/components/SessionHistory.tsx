'use client';

import { useState } from 'react';

export interface HistoryEntry {
  note: string;
  chord: string;
  timestamp: number;
}

interface Props {
  history: HistoryEntry[];
  onClear: () => void;
}

export default function SessionHistory({ history, onClear }: Props) {
  const [copied, setCopied] = useState(false);

  if (history.length === 0) return null;

  const handleCopy = () => {
    const text = history.map((e) => e.chord).join(' — ');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="border-t border-border pt-5 animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono tracking-widest text-text-dim uppercase">
          Session
        </span>
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="text-xs font-mono tracking-wider text-text-dim hover:text-accent transition-colors duration-200 focus:outline-none"
          >
            {copied ? 'COPIÉ ✓' : 'COPIER'}
          </button>
          <button
            onClick={onClear}
            className="text-xs font-mono tracking-wider text-text-dim hover:text-text transition-colors duration-200 focus:outline-none"
          >
            EFFACER
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.slice(-24).map((entry, i) => (
          <div key={i} className="flex items-center gap-1.5 border border-border px-2.5 py-1">
            <span className="text-[10px] font-mono text-text-dim">{entry.note}</span>
            <span className="text-sm font-display text-text" style={{ letterSpacing: '-0.01em' }}>
              {entry.chord}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
