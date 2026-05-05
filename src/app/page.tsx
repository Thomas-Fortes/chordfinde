'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePitchDetector } from '@/hooks/usePitchDetector';
import { getChordsForNote, noteToDisplay, toFrench } from '@/lib/musicTheory';
import { getInstrument, InstrumentId, INSTRUMENTS } from '@/lib/instruments';
import CustomCursor from '@/components/CustomCursor';
import Waveform from '@/components/Waveform';
import InstrumentSelector from '@/components/InstrumentSelector';
import MicButton from '@/components/MicButton';
import ChordCard from '@/components/ChordCard';
import SessionHistory, { HistoryEntry } from '@/components/SessionHistory';

function HomeContent() {
  const searchParams = useSearchParams();
  const initialInstrument = (searchParams.get('instrument') as InstrumentId | null) ?? 'guitar';
  const validInstrument = INSTRUMENTS.some((i) => i.id === initialInstrument) ? initialInstrument : 'guitar';

  const [instrumentId, setInstrumentId] = useState<InstrumentId>(validInstrument);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [flash, setFlash] = useState(false);
  const [copied, setCopied] = useState(false);

  // "Frozen" result — keeps last detected note visible while fading out
  const [frozenNote, setFrozenNote] = useState<string | null>(null);
  const [resultOpacity, setResultOpacity] = useState(0);

  const lastHistoryNote = useRef<string | null>(null);
  const lastFlashNote = useRef<string | null>(null);

  const { micState, pitchResult, analyserRef, start, stop, errorMessage } = usePitchDetector();
  const instrument = getInstrument(instrumentId);

  // Use frozenNote for display so chord stays visible during fade-out
  const displayNote = pitchResult.note ?? frozenNote;
  const chords = displayNote ? getChordsForNote(displayNote) : [];
  const mainChord = chords[0] ?? null;
  const displayNoteInfo = displayNote
    ? noteToDisplay(displayNote, instrument.transpositionSemitones)
    : null;

  const isActive = micState === 'listening' || micState === 'weak' || micState === 'stable';

  function shareCurrentResult() {
    if (!displayNote || !mainChord) return;
    const note = displayNote.replace(/\d/, '');
    const url = `${window.location.origin}/?note=${encodeURIComponent(note)}&instrument=${instrumentId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Note stable → show result immediately
  useEffect(() => {
    if (micState === 'stable' && pitchResult.note) {
      setFrozenNote(pitchResult.note);
      setResultOpacity(1);
    }
  }, [micState, pitchResult.note]);

  // Mic stopped → hide immediately
  useEffect(() => {
    if (micState === 'idle') {
      setResultOpacity(0);
      const t = setTimeout(() => setFrozenNote(null), 500);
      return () => clearTimeout(t);
    }
  }, [micState]);

  // Sound stops but mic still on → linger 1.5s then fade
  useEffect(() => {
    if (!pitchResult.note && micState !== 'idle' && micState !== 'requesting') {
      const t1 = setTimeout(() => {
        setResultOpacity(0);
        const t2 = setTimeout(() => setFrozenNote(null), 500);
        return () => clearTimeout(t2);
      }, 1500);
      return () => clearTimeout(t1);
    }
  }, [pitchResult.note, micState]);

  // Flash on new note — no cleanup so the timeout always fires
  useEffect(() => {
    if (micState === 'stable' && pitchResult.note && pitchResult.note !== lastFlashNote.current) {
      lastFlashNote.current = pitchResult.note;
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }
  }, [micState, pitchResult.note]);

  // History
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ChordFinder',
    description: 'Application de reconnaissance d\'accords musicaux en temps réel',
    applicationCategory: 'MusicApplication',
    operatingSystem: 'Web Browser',
    inLanguage: 'fr',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    featureList: [
      'Détection d\'accords en temps réel',
      'Transposition automatique trompette Si♭',
      'Diagrammes guitare et piano',
      'Saxophone alto, ténor, clarinette',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomCursor />

      {/* Accent flash on new detection */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] bg-accent"
        style={{
          opacity: flash ? 0.1 : 0,
          transition: flash ? 'opacity 0ms' : 'opacity 400ms ease-out',
        }}
        aria-hidden="true"
      />

      {/* Page */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-3xl mx-auto px-5 py-6 gap-8">

        {/* ── Header ────────────────────────────────────── */}
        <header className="flex items-center justify-between">
          <h1
            className="font-display text-text uppercase"
            style={{ fontSize: '1.1rem', letterSpacing: '0.15em' }}
          >
            ChordFinder
            <span className="sr-only"> — Reconnaissance d'accords musicaux en temps réel</span>
          </h1>
          <button
            onClick={() => setAdvancedMode((v) => !v)}
            aria-pressed={advancedMode}
            className={`
              text-xs font-mono tracking-widest uppercase px-3 py-1.5 border
              transition-all duration-300
              focus:outline-none focus-visible:ring-1 focus-visible:ring-accent
              hover:-translate-y-px
              ${advancedMode
                ? 'border-accent text-accent bg-accent/5'
                : 'border-border text-text-dim hover:border-[#444] hover:text-text'
              }
            `}
          >
            {advancedMode ? '— Avancé' : '+ Avancé'}
          </button>
        </header>

        {/* ── Instrument selector ───────────────────────── */}
        <InstrumentSelector selected={instrumentId} onChange={setInstrumentId} />

        {/* ── Waveform hero ─────────────────────────────── */}
        <div className="flex flex-col items-center gap-6">
          {/* Waveform */}
          <div className="w-full border border-border relative overflow-hidden" style={{ height: '5rem' }}>
            <Waveform analyserRef={analyserRef} active={isActive} />
            {/* Corner label */}
            <span className="absolute top-2 left-3 text-[9px] font-mono text-text-dim tracking-widest uppercase opacity-50">
              AUDIO
            </span>
            {/* Volume bar — debug feedback that mic is capturing */}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border">
                <div
                  className="h-full bg-accent transition-all duration-75"
                  style={{ width: `${Math.min(pitchResult.volume * 800, 100)}%` }}
                />
              </div>
            )}
          </div>

          {/* Mic button */}
          <MicButton state={micState} onStart={start} onStop={stop} />

          {/* Status text */}
          {micState === 'weak' && (
            <p className="text-xs font-mono tracking-wider text-amber-400 text-center" role="status">
              Son trop faible — rapprochez-vous du micro
            </p>
          )}
          {micState === 'error' && errorMessage && (
            <p className="text-xs font-mono text-red-400 text-center max-w-xs border border-red-900/50 px-4 py-3" role="alert">
              {errorMessage}
            </p>
          )}
          {micState === 'idle' && (
            <p className="text-xs font-mono tracking-wider text-text-dim text-center">
              Fredonnez ou jouez une note
            </p>
          )}
          {(micState === 'listening') && !pitchResult.note && (
            <p className="text-xs font-mono tracking-wider text-text-dim text-center">
              En attente d'une note…
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* ── Result ────────────────────────────────────── */}
        <div className="relative" style={{ minHeight: '12rem' }}>
          {/* Empty state — always rendered behind */}
          <div
            className="absolute inset-0 flex items-start justify-center pt-4"
            style={{
              opacity: resultOpacity > 0 ? 0 : 1,
              transition: 'opacity 500ms ease-out',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            <p
              className="font-display text-border"
              style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              —
            </p>
          </div>

          {/* Result — fades in on note, lingers then fades out */}
          <div
            className="flex flex-col gap-8"
            style={{
              opacity: resultOpacity,
              transition: 'opacity 500ms ease-out',
              pointerEvents: resultOpacity > 0 ? 'auto' : 'none',
            }}
          >
            {displayNoteInfo && (
              <div className="flex items-end gap-8">
                <div>
                  <p className="text-xs font-mono tracking-widest text-text-dim mb-1">NOTE</p>
                  <p
                    className="font-display text-text leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', letterSpacing: '-0.02em' }}
                  >
                    {toFrench(displayNoteInfo.instrument)}
                  </p>
                  {instrument.transpositionSemitones !== 0 && (
                    <p className="text-xs font-mono text-text-dim mt-1">
                      concert : {toFrench(displayNoteInfo.concert)}
                    </p>
                  )}
                </div>

                {/* Live dot — only visible when actively stable */}
                <div
                  className="mb-2 w-2 h-2 rounded-full bg-accent"
                  style={{
                    boxShadow: '0 0 8px 2px #C8F562',
                    opacity: micState === 'stable' ? 1 : 0,
                    transition: 'opacity 600ms ease-out',
                  }}
                  aria-hidden="true"
                />
              </div>
            )}

            {mainChord && (
              <ChordCard
                chord={mainChord}
                instrumentId={instrumentId}
                transpositionSemitones={instrument.transpositionSemitones}
                concertNote={displayNote ?? ''}
                isMain
                animKey={displayNote ?? undefined}
              />
            )}

            {advancedMode && chords.length > 1 && (
              <div>
                <p className="text-xs font-mono tracking-widest text-text-dim uppercase mb-4">
                  Accords compatibles
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {chords.slice(1).map((chord, i) => (
                    <ChordCard
                      key={chord.symbol}
                      chord={chord}
                      instrumentId={instrumentId}
                      transpositionSemitones={instrument.transpositionSemitones}
                      concertNote={displayNote ?? ''}
                      animKey={`${displayNote}-${i}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Share button — visible when a result is shown */}
            {mainChord && (
              <div className="flex justify-end">
                <button
                  onClick={shareCurrentResult}
                  className="text-xs font-mono tracking-wider px-3 py-1.5 border transition-all duration-200 hover:-translate-y-px focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  style={{
                    borderColor: copied ? '#C8F562' : '#2A2A2A',
                    color: copied ? '#C8F562' : '#555',
                  }}
                >
                  {copied ? '✓ Lien copié' : 'Partager cet accord'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Session history ───────────────────────────── */}
        <SessionHistory
          history={history}
          onClear={() => {
            setHistory([]);
            lastHistoryNote.current = null;
          }}
        />

        {/* ── Content nav ───────────────────────────────── */}
        <nav
          className="border-t pt-6 flex flex-wrap gap-x-6 gap-y-2"
          style={{ borderColor: '#1A1A1A' }}
          aria-label="Ressources"
        >
          {[
            { href: '/guide', label: 'Guides' },
            { href: '/accords', label: 'Fiches accords' },
            { href: '/instruments', label: 'Instruments' },
            { href: '/comment-ca-marche', label: 'Comment ça marche' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs font-mono tracking-wider transition-colors hover:text-text"
              style={{ color: '#333' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── SEO content ───────────────────────────────── */}
        <section className="border-t pt-10 space-y-8" style={{ borderColor: '#1A1A1A' }}>
          <div>
            <h2 className="font-display text-lg mb-3" style={{ fontFamily: 'var(--font-syne)', color: '#444' }}>
              Trouvez les accords en temps réel
            </h2>
            <p className="text-xs font-mono leading-relaxed" style={{ color: '#3A3A3A' }}>
              ChordFinder est un outil de reconnaissance d'accords musicaux qui fonctionne
              directement dans votre navigateur. Fredonnez une mélodie ou jouez une note sur
              votre instrument devant le micro, et l'application identifie instantanément la
              note et affiche les accords compatibles — avec diagramme de doigtés guitare ou
              touches piano selon votre instrument.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg mb-3" style={{ fontFamily: 'var(--font-syne)', color: '#444' }}>
              Transposition automatique pour trompette, saxophone et clarinette
            </h2>
            <p className="text-xs font-mono leading-relaxed" style={{ color: '#3A3A3A' }}>
              Les instruments transpositeurs (trompette Si♭, saxophone alto Mi♭, saxophone ténor,
              clarinette Si♭) sont pris en charge nativement. Sélectionnez votre instrument dans
              le menu et ChordFinder affiche directement la note dans votre tonalité — plus besoin
              de transposer mentalement. Un trompettiste qui fredonne Do concert verra s'afficher
              Ré, la note à jouer sur son instrument.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg mb-3" style={{ fontFamily: 'var(--font-syne)', color: '#444' }}>
              Comment utiliser ChordFinder
            </h2>
            <p className="text-xs font-mono leading-relaxed" style={{ color: '#3A3A3A' }}>
              Appuyez sur le bouton micro, accordez les permissions, puis fredonnez ou jouez une
              note. L'algorithme de détection de pitch analyse la fréquence en temps réel et
              affiche l'accord principal ainsi que le diagramme de doigtés. En mode Avancé,
              tous les accords contenant cette note sont listés — utile pour explorer les
              substitutions harmoniques ou identifier des accords de passage dans une progression.
              Aucune installation, aucun compte, aucune donnée envoyée sur Internet.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg mb-3" style={{ fontFamily: 'var(--font-syne)', color: '#444' }}>
              Pour guitaristes, pianistes et musiciens de tous niveaux
            </h2>
            <p className="text-xs font-mono leading-relaxed" style={{ color: '#3A3A3A' }}>
              Que vous débutiez la guitare et cherchiez à identifier les accords d'une chanson,
              ou que vous soyez musicien avancé cherchant à transposer rapidement une grille
              d'accords pour un instrument Si♭, ChordFinder s'adapte à votre usage. Les
              diagrammes SVG guitare couvrent les accords ouverts et barrés. Les visualisations
              piano surlignent les touches exactes à appuyer. Consultez aussi nos{' '}
              <a href="/guide" style={{ color: '#555' }}>guides musicaux</a> et les{' '}
              <a href="/accords" style={{ color: '#555' }}>fiches d'accords</a> pour approfondir
              votre théorie musicale.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
