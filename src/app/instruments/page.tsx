import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'ChordFinder par instrument — Guitare, Piano, Trompette',
  description: 'ChordFinder adapté à chaque instrument : guitare (diagrammes), piano (touches), trompette Si♭ (transposition automatique), saxophone, clarinette.',
  alternates: { canonical: '/instruments' },
  openGraph: {
    title: 'ChordFinder par instrument',
    description: 'Guitare, piano, trompette Si♭, saxophone, clarinette — transposition automatique incluse.',
    url: '/instruments',
  },
};

const INSTRUMENTS = [
  {
    href: '/instruments/guitare',
    symbol: '🎸',
    name: 'Guitare',
    description: 'Diagrammes de doigtés en temps réel, accords ouverts et barrés. Idéal pour apprendre à jouer sur n\'importe quelle tonalité.',
    features: ['Diagrammes de doigtés', 'Accords ouverts et barrés', 'Do concert'],
  },
  {
    href: '/instruments/piano',
    symbol: '🎹',
    name: 'Piano',
    description: 'Visualisation des touches du piano pour chaque accord détecté. Parfait pour les pianistes débutants et les compositeurs.',
    features: ['Touches piano surlignées', 'Accord complet sur une octave', 'Do concert'],
  },
  {
    href: '/instruments/trompette',
    symbol: '🎺',
    name: 'Trompette Si♭',
    description: 'Transposition automatique de 2 demi-tons. Fredonnez un Do concert, obtenez le Ré que vous devez jouer sur votre trompette.',
    features: ['Transposition Si♭ automatique', 'Notes en nomenclature instrument', 'Concert ↔ instrument affiché'],
  },
];

const OTHER_INSTRUMENTS = [
  { name: 'Clarinette Si♭', transposition: '+2 demi-tons', note: 'Si♭' },
  { name: 'Saxophone ténor', transposition: '+2 demi-tons', note: 'Si♭' },
  { name: 'Saxophone soprano', transposition: '+2 demi-tons', note: 'Si♭' },
  { name: 'Saxophone alto', transposition: '+9 demi-tons', note: 'Mi♭' },
  { name: 'Saxophone baryton', transposition: '+9 demi-tons', note: 'Mi♭' },
  { name: 'Voix', transposition: 'Aucune', note: 'Do concert' },
];

export default function InstrumentsPage() {
  return (
    <ContentLayout breadcrumbs={[{ label: 'Instruments', href: '/instruments' }]}>
      <header className="mb-12">
        <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
          Instruments supportés
        </p>
        <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
          ChordFinder par instrument
        </h1>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#999', maxWidth: '36rem' }}>
          ChordFinder s'adapte à votre instrument. Chaque mode affiche les notes et accords dans
          votre tonalité native, avec la transposition automatique pour les instruments Si♭ et Mi♭.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
          Instruments avec guide dédié
        </h2>
        <div className="flex flex-col gap-4">
          {INSTRUMENTS.map((inst) => (
            <Link
              key={inst.href}
              href={inst.href}
              className="block border p-6 transition-colors duration-300 group"
              style={{ borderColor: '#2A2A2A' }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{inst.symbol}</span>
                <div className="flex-1">
                  <h2
                    className="text-base font-display mb-2 group-hover:text-[#C8F562] transition-colors"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {inst.name}
                  </h2>
                  <p className="text-xs font-mono leading-relaxed mb-3" style={{ color: '#777' }}>
                    {inst.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {inst.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 border"
                        style={{ borderColor: '#2A2A2A', color: '#555' }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs font-mono mt-4" style={{ color: '#C8F562' }}>
                Voir le guide →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
          Autres instruments supportés dans l'app
        </h2>
        <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#C8C8C8' }}>
          Ces instruments sont disponibles dans le sélecteur de l'application avec la transposition correcte :
        </p>
        <div className="border overflow-hidden" style={{ borderColor: '#2A2A2A' }}>
          <div className="grid grid-cols-3 text-xs font-mono border-b px-4 py-2" style={{ borderColor: '#2A2A2A', background: '#111', color: '#C8F562' }}>
            <span>Instrument</span>
            <span>Transposition</span>
            <span>Tonalité</span>
          </div>
          {OTHER_INSTRUMENTS.map((inst, i) => (
            <div
              key={inst.name}
              className="grid grid-cols-3 text-xs font-mono border-b px-4 py-3"
              style={{ borderColor: '#2A2A2A', background: i % 2 === 0 ? '#0C0C0C' : '#0E0E0E', color: '#C8C8C8' }}
            >
              <span>{inst.name}</span>
              <span style={{ color: '#555' }}>{inst.transposition}</span>
              <span style={{ color: '#C8F562' }}>{inst.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-10" style={{ borderColor: '#2A2A2A' }}>
        <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
          Comment fonctionne la transposition ?
        </h2>
        <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
          ChordFinder détecte toujours la note concert (la vraie fréquence du son). Ensuite,
          selon l'instrument sélectionné, il affiche la note transposée correspondante — c'est-à-dire
          la note que vous devez voir sur votre partition ou jouer sur votre instrument.
        </p>
        <Link
          href="/guide/transposition-trompette"
          className="inline-block text-xs font-mono tracking-widest uppercase px-4 py-2 border transition-colors duration-300 hover:border-[#C8F562] hover:text-[#C8F562]"
          style={{ borderColor: '#2A2A2A', color: '#999' }}
        >
          Guide complet sur la transposition →
        </Link>
      </section>
    </ContentLayout>
  );
}
