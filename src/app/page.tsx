'use client';

import { useState, useEffect, useRef } from 'react';
import { usePitchDetector } from '@/hooks/usePitchDetector';
import { getChordsForNote, noteToDisplay, toFrench } from '@/lib/musicTheory';
import { getInstrument, InstrumentId } from '@/lib/instruments';
import InstrumentSelector from '@/components/InstrumentSelector';
import MicButton from '@/components/MicButton';
import VuMeter from '@/components/VuMeter';
import ChordCard from '@/components/ChordCard';
import SessionHistory, { HistoryEntry } from '@/components/SessionHistory';

export default function Home() {
  const [instrumentId, setInstrumentId] = useState<InstrumentId>('guitar');
  const [advancedMode, setAdvancedMode] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const lastHistoryNote = useRef<string | null>(null);

  const { micState, pitchResult, start, stop, errorMessage } = usePitchDetector();
  const instrument = getInstrument(instrumentId);

  const chords = pitchResult.note ? getChordsForNote(pitchResult.note) : [];
  const mainChord = chords[0] ?? null;

  const displayNoteInfo = pitchResult.note
    ? noteToDisplay(pitchResult.note, instrument.transpositionSemitones)
    : null;

  useEffect(() => {
    if (micState === 'stable' && mainChord && pitchResult.note !== lastHistoryNote.current) {
      lastHistoryNote.current = pitchResult.note;
      setHistory((prev) => [
        ...prev,
        {
          note: displayNoteInfo?.instrument ?? pitchResult.note ?? '',
          chord: mainChord.symbol,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [micState, mainChord, pitchResult.note, displayNoteInfo]);

  const isActive = micState === 'listening' || micState === 'weak' || micState === 'stable';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🎵</span>
            <span className="font-bold text-xl text-indigo-700 dark:text-indigo-400">ChordFinder</span>
          </div>
          <button
            onClick={() => setAdvancedMode((v) => !v)}
            className={`
              text-sm px-3 py-1.5 rounded-full border transition-colors
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
              ${advancedMode
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-indigo-400'
              }
            `}
            aria-pressed={advancedMode}
          >
            {advancedMode ? 'Mode avancé ✓' : 'Mode avancé'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Instrument selector */}
        <InstrumentSelector selected={instrumentId} onChange={setInstrumentId} />

        {/* Mic controls */}
        <div className="flex flex-col items-center gap-4 py-4">
          <MicButton state={micState} onStart={start} onStop={stop} />

          {isActive && <VuMeter volume={pitchResult.volume} active={isActive} />}

          {micState === 'weak' && (
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium" role="status">
              ⚠️ Son trop faible ou bruité — rapprochez-vous du micro
            </p>
          )}

          {micState === 'error' && errorMessage && (
            <div
              className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3 max-w-sm text-center"
              role="alert"
            >
              <p className="font-medium mb-1">Erreur microphone</p>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>

        {/* Detection result */}
        {micState === 'stable' && pitchResult.note && displayNoteInfo && (
          <div className="flex flex-col gap-4">
            {/* Detected note banner */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Note détectée</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {toFrench(displayNoteInfo.instrument)}
                  {instrument.transpositionSemitones !== 0 && (
                    <span className="text-sm text-gray-400 font-normal ml-2">
                      (Do concert : {toFrench(displayNoteInfo.concert)})
                    </span>
                  )}
                </p>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            </div>

            {/* Main chord */}
            {mainChord && (
              <ChordCard
                chord={mainChord}
                instrumentId={instrumentId}
                transpositionSemitones={instrument.transpositionSemitones}
                concertNote={pitchResult.note}
                isMain
              />
            )}

            {/* Advanced chord list */}
            {advancedMode && chords.length > 1 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Tous les accords compatibles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {chords.slice(1).map((chord) => (
                    <ChordCard
                      key={chord.symbol}
                      chord={chord}
                      instrumentId={instrumentId}
                      transpositionSemitones={instrument.transpositionSemitones}
                      concertNote={pitchResult.note!}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Idle state */}
        {micState === 'idle' && (
          <div className="text-center py-8 text-gray-400 dark:text-gray-600">
            <p className="text-4xl mb-3" aria-hidden="true">🎵</p>
            <p className="text-lg font-medium">Prêt à détecter</p>
            <p className="text-sm mt-1">
              Choisissez votre instrument puis cliquez sur <strong>Écouter</strong>
            </p>
          </div>
        )}

        {/* Listening, no note yet */}
        {micState === 'listening' && !pitchResult.note && (
          <div className="text-center py-6 text-gray-400 dark:text-gray-600">
            <p className="text-3xl mb-2" aria-hidden="true">🎤</p>
            <p className="text-sm">Fredonnez, sifflez ou jouez une note…</p>
          </div>
        )}

        {/* Session history */}
        <SessionHistory history={history} onClear={() => { setHistory([]); lastHistoryNote.current = null; }} />
      </main>
    </div>
  );
}
