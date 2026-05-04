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
    const text = history.map((e) => e.chord).join(' - ');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Historique de session
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1 rounded-full border border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {copied ? 'Copié ✓' : 'Copier'}
          </button>
          <button
            onClick={onClear}
            className="text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            Effacer
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.slice(-20).map((entry, i) => (
          <div
            key={i}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900"
          >
            <span className="text-xs text-gray-400">{entry.note}</span>
            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{entry.chord}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
