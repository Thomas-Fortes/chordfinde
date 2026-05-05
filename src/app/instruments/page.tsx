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
          Guitare, piano, trompette — ChordFinder pour chaque instrument
        </h1>
        <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#999', maxWidth: '38rem' }}>
          ChordFinder s'adapte à votre instrument. Chaque mode affiche les notes et accords dans
          votre tonalité native, avec la transposition automatique pour les instruments Si♭ et Mi♭.
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#777', maxWidth: '40rem' }}>
          La guitare bénéficie de diagrammes de doigtés SVG générés en temps réel — position
          des doigts, cordes à vide, barrés. Le piano affiche les touches exactes à appuyer sur
          une octave. Les instruments transpositeurs (trompette, clarinette, saxophone) voient
          leurs notes affichées directement dans leur tonalité : un trompettiste Si♭ n'a pas
          besoin de transposer mentalement, ChordFinder fait le calcul automatiquement.
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

      <section className="border-t pt-10 space-y-5" style={{ borderColor: '#2A2A2A' }}>
        <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
          Comment fonctionne la transposition dans ChordFinder ?
        </h2>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          ChordFinder détecte toujours la note concert — la vraie fréquence physique du son capté
          par le micro. Ensuite, selon l'instrument sélectionné, il applique un décalage d'intervalle
          pour afficher la note dans la tonalité de cet instrument. Pour une trompette Si♭, ce
          décalage est de +2 demi-tons (une seconde majeure). Pour un saxophone alto Mi♭, il est
          de +9 demi-tons (une sixte majeure).
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          Concrètement : vous fredonnez Do concert. Si vous êtes en mode Guitare ou Piano (Do
          concert), l'app affiche Do. Si vous êtes en mode Trompette (Si♭), l'app affiche Ré —
          la note que le trompettiste doit jouer pour sonner Do concert. Si vous êtes en mode
          Saxophone Alto (Mi♭), l'app affiche La. L'accord suggéré est également transposé
          dans la même tonalité.
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          Cette fonctionnalité est particulièrement utile lors des répétitions en groupe mixte :
          le guitariste joue un accord en Do concert, le trompettiste peut immédiatement savoir
          quelle note jouer sans calcul mental, et le saxophoniste alto a aussi sa réponse.
          ChordFinder devient un traducteur musical en temps réel entre les différentes tonalités
          d'instruments.
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
