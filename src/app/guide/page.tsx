import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'Guides musicaux — Apprendre les accords et la transposition',
  description: 'Guides pratiques pour musiciens : trouver les accords d\'une chanson, apprendre la guitare, comprendre la transposition des instruments Si♭.',
  alternates: { canonical: '/guide' },
  openGraph: {
    title: 'Guides musicaux ChordFinder',
    description: 'Guides pratiques pour musiciens : accords, transposition, guitare débutant.',
    url: '/guide',
  },
};

const GUIDES = [
  {
    href: '/guide/trouver-accords-chanson',
    title: 'Comment trouver les accords d\'une chanson',
    description: 'Méthode pas-à-pas pour identifier les accords à l\'oreille, avec ou sans logiciel. De l\'analyse mélodique à ChordFinder.',
    badge: 'Débutant',
  },
  {
    href: '/guide/accords-guitare-debutant',
    title: 'Les accords de guitare pour débutants',
    description: 'Les 10 accords essentiels à maîtriser en premier : Do, Sol, Ré, La, Mi et leurs versions mineures. Doigtés et conseils.',
    badge: 'Débutant',
  },
  {
    href: '/guide/transposition-trompette',
    title: 'Transposition trompette Si♭ — Guide pratique',
    description: 'Comprendre le décalage de 2 demi-tons, tableau de correspondance Do concert ↔ Si♭, exemples avec ChordFinder.',
    badge: 'Intermédiaire',
  },
];

export default function GuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guides musicaux — ChordFinder',
    description: 'Guides pratiques pour musiciens francophones : accords, transposition, guitare.',
    url: 'https://chordfinder.app/guide',
    hasPart: GUIDES.map((g) => ({
      '@type': 'Article',
      headline: g.title,
      url: `https://chordfinder.app${g.href}`,
    })),
  };

  return (
    <ContentLayout breadcrumbs={[{ label: 'Guides', href: '/guide' }]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-12">
        <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
          Ressources
        </p>
        <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
          Guides musicaux
        </h1>
        <p className="text-sm font-mono leading-relaxed" style={{ color: '#999', maxWidth: '36rem' }}>
          Des ressources pratiques pour progresser en musique, comprendre les accords et tirer
          le meilleur parti de ChordFinder.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {GUIDES.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block border p-6 transition-colors duration-300 group"
            style={{ borderColor: '#2A2A2A' }}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2
                className="text-base font-display group-hover:text-[#C8F562] transition-colors"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {guide.title}
              </h2>
              <span
                className="shrink-0 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border"
                style={{ borderColor: '#2A2A2A', color: '#555' }}
              >
                {guide.badge}
              </span>
            </div>
            <p className="text-xs font-mono leading-relaxed" style={{ color: '#777' }}>
              {guide.description}
            </p>
            <p className="text-xs font-mono mt-4" style={{ color: '#C8F562' }}>
              Lire le guide →
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-16 border-t pt-12" style={{ borderColor: '#2A2A2A' }}>
        <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
          Explorer par accord
        </h2>
        <p className="text-sm font-mono mb-6" style={{ color: '#777' }}>
          Consultez nos fiches détaillées pour chaque accord : notes, diagrammes guitare et piano,
          doigtés et FAQ.
        </p>
        <Link
          href="/accords"
          className="inline-block text-xs font-mono tracking-widest uppercase px-4 py-2 border transition-colors duration-300 hover:border-[#C8F562] hover:text-[#C8F562]"
          style={{ borderColor: '#2A2A2A', color: '#999' }}
        >
          Voir tous les accords →
        </Link>
      </section>
    </ContentLayout>
  );
}
