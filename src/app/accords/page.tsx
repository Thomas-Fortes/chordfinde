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
          Tous les accords
        </h1>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#999', maxWidth: '36rem' }}>
          24 fiches complètes — les 12 accords majeurs et 12 mineurs fondamentaux. Notes, diagrammes
          guitare, touches piano, accords proches et FAQ.
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

      <section className="border-t pt-10" style={{ borderColor: '#2A2A2A' }}>
        <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
          Comment utiliser ces fiches
        </h2>
        <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
          Chaque fiche présente les notes qui composent l'accord, un diagramme de doigtés pour
          la guitare, les touches correspondantes sur le piano, les accords proches (pour progresser
          harmoniquement), et une FAQ avec les questions les plus fréquentes.
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
          Pour détecter un accord en temps réel à partir de votre instrument ou de votre voix,
          utilisez l'application interactive — elle identifie la note et vous propose l'accord
          instantanément, avec diagramme inclus.
        </p>
      </section>
    </ContentLayout>
  );
}
