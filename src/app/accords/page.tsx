import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import { CHORD_PAGES } from '@/lib/chordPages';

export const metadata: Metadata = {
  title: 'Tous les accords — Fiches complètes guitare et piano',
  description: 'Fiches complètes des 24 accords majeurs et mineurs : notes, diagrammes guitare, touches piano, doigtés et FAQ. Do, Ré, Mi, Fa, Sol, La, Si.',
  alternates: { canonical: '/accords' },
  openGraph: {
    title: 'Tous les accords — Fiches complètes guitare et piano',
    description: '24 fiches accords avec notes, diagrammes guitare et piano, et FAQ.',
    url: '/accords',
  },
};

const majeurs = CHORD_PAGES.filter((c) => c.quality === 'majeur');
const mineurs = CHORD_PAGES.filter((c) => c.quality === 'mineur');

export default function AccordsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Fiches accords — ChordFinder',
    description: '24 fiches accords majeurs et mineurs avec diagrammes guitare et piano.',
    url: 'https://chordfinder.app/accords',
    hasPart: CHORD_PAGES.map((c) => ({
      '@type': 'MusicComposition',
      name: c.frenchName,
      url: `https://chordfinder.app/accords/${c.slug}`,
    })),
  };

  return (
    <ContentLayout breadcrumbs={[{ label: 'Accords', href: '/accords' }]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-12">
        <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
          Référence
        </p>
        <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
          Fiches d'accords guitare et piano
        </h1>
        <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#999', maxWidth: '36rem' }}>
          24 fiches complètes — les 12 accords majeurs et 12 mineurs fondamentaux. Pour chaque accord :
          notes composantes, diagramme de doigtés guitare, visualisation piano, accords proches et FAQ.
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#777', maxWidth: '40rem' }}>
          Un accord est une combinaison d'au moins trois notes jouées simultanément. Les accords majeurs
          (Do, Ré, Mi, Fa, Sol, La, Si) sonnent lumineux et stables. Les accords mineurs (Do mineur,
          Ré mineur, etc.) ont une couleur plus sombre et mélancolique. La seule différence entre un
          accord majeur et son homologue mineur est la tierce : majeure (2 tons) ou mineure (1 ton et demi).
          Maîtriser ces 24 accords de base vous permet de jouer l'immense majorité des chansons pop,
          rock, folk et jazz.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
          Accords majeurs
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {majeurs.map((chord) => (
            <Link
              key={chord.slug}
              href={`/accords/${chord.slug}`}
              className="block border p-4 transition-colors duration-200 group hover:border-[#3A3A3A]"
              style={{ borderColor: '#2A2A2A' }}
            >
              <p
                className="font-display text-2xl mb-1 group-hover:text-[#C8F562] transition-colors"
                style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em', color: '#E8E8E8' }}
              >
                {chord.symbol}
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>{chord.frenchName}</p>
              <p className="text-xs font-mono mt-2" style={{ color: '#333' }}>
                {chord.frenchNotes.join(' – ')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
          Accords mineurs
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mineurs.map((chord) => (
            <Link
              key={chord.slug}
              href={`/accords/${chord.slug}`}
              className="block border p-4 transition-colors duration-200 group hover:border-[#3A3A3A]"
              style={{ borderColor: '#2A2A2A' }}
            >
              <p
                className="font-display text-2xl mb-1 group-hover:text-[#C8F562] transition-colors"
                style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em', color: '#E8E8E8' }}
              >
                {chord.symbol}
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>{chord.frenchName}</p>
              <p className="text-xs font-mono mt-2" style={{ color: '#333' }}>
                {chord.frenchNotes.join(' – ')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t pt-10 space-y-6" style={{ borderColor: '#2A2A2A' }}>
        <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
          Comment lire une fiche d'accord
        </h2>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          Chaque fiche présente les notes qui composent l'accord (fondamentale, tierce, quinte),
          un diagramme de doigtés SVG pour la guitare avec indication des cordes à vide, muettes
          et du barré éventuel, les touches correspondantes sur le clavier de piano, les accords
          proches pour progresser harmoniquement, et une FAQ avec les questions les plus fréquentes.
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          Pour les guitaristes débutants, commencez par les accords ouverts : Mi majeur, La majeur,
          Ré majeur et leurs versions mineures. Ces accords utilisent des cordes à vide qui
          compensent les imperfections de doigté et sonnent naturellement plein. Passez aux barrés
          (Fa majeur, Si mineur) une fois ces bases maîtrisées.
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          Pour les pianistes, chaque fiche montre les touches exactes à appuyer sur une octave.
          Les notes blanches et noires sont surlignées pour visualiser immédiatement la position
          de la main. Les accords majeurs et mineurs partagent souvent deux notes sur trois — ce
          qui facilite le passage de l'un à l'autre sur un clavier.
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          Pour détecter un accord en temps réel à partir de votre instrument ou de votre voix,
          utilisez l'application interactive — elle identifie la note et vous propose l'accord
          instantanément, avec diagramme inclus et transposition automatique pour les instruments
          Si♭ (trompette, clarinette, saxophone ténor) et Mi♭ (saxophone alto).
        </p>
      </section>
    </ContentLayout>
  );
}
