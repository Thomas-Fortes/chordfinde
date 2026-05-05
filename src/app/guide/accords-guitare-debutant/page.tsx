import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import GuitarDiagram from '@/components/GuitarDiagram';
import { GUITAR_CHORDS } from '@/lib/guitarChords';

export const metadata: Metadata = {
  title: 'Les accords de guitare pour débutants — Les 10 essentiels',
  description: 'Apprenez les 10 accords de guitare indispensables pour débutants : Do, Sol, Ré, La, Mi, et leurs versions mineures. Diagrammes et conseils.',
  alternates: { canonical: '/guide/accords-guitare-debutant' },
  openGraph: {
    title: 'Les accords de guitare pour débutants — Les 10 essentiels',
    description: 'Apprenez les 10 premiers accords de guitare avec diagrammes et conseils pour les enchaîner.',
    url: '/guide/accords-guitare-debutant',
  },
};

const BEGINNER_CHORDS = [
  { symbol: 'E', frenchName: 'Mi majeur', tips: 'Toutes les 6 cordes sonnent. Renforcez d\'abord cet accord.' },
  { symbol: 'Em', frenchName: 'Mi mineur', tips: 'Seulement 2 doigts — le plus facile. Parfait pour commencer.' },
  { symbol: 'A', frenchName: 'La majeur', tips: '3 doigts côte à côte sur la 2e frette. La corde grave sonne aussi.' },
  { symbol: 'Am', frenchName: 'La mineur', tips: 'Même position que La majeur mais décalée d\'un demi-ton. Très mélancolique.' },
  { symbol: 'D', frenchName: 'Ré majeur', tips: '3 doigts sur les 3 cordes aiguës. La corde de Ré sonne à vide.' },
  { symbol: 'Dm', frenchName: 'Ré mineur', tips: 'L\'index descend d\'un demi-ton par rapport à Ré majeur. Doux et lyrique.' },
  { symbol: 'C', frenchName: 'Do majeur', tips: 'Attention à la corde Mi grave (muette). Écartez bien les doigts.' },
  { symbol: 'G', frenchName: 'Sol majeur', tips: 'Écartez les doigts sur 3 frettes. Sonne magnifiquement sur 6 cordes.' },
  { symbol: 'F', frenchName: 'Fa majeur', tips: 'Premier barré — l\'index barre toute la 1re frette. Prenez votre temps !' },
  { symbol: 'Bm', frenchName: 'Si mineur', tips: 'Barré partiel à la 2e frette. Moins dur que Fa, idéal pour débuter les barrés.' },
];

const PROGRESSIONS = [
  { name: 'La progression "pop universelle"', chords: ['Em', 'C', 'G', 'D'], genre: 'Pop, rock acoustique' },
  { name: 'Le blues à 3 accords', chords: ['E', 'A', 'B'], genre: 'Blues, rock\'n\'roll' },
  { name: 'Folk classique', chords: ['G', 'C', 'D', 'Em'], genre: 'Folk, country' },
  { name: 'Ballade mineure', chords: ['Am', 'F', 'C', 'G'], genre: 'Pop mélancolique, flamenco' },
];

export default function AccordsGuitareDebutant() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Les accords de guitare pour débutants — Les 10 essentiels',
    description: 'Les 10 premiers accords de guitare à maîtriser avec diagrammes et conseils.',
    author: { '@type': 'Organization', name: 'ChordFinder' },
    datePublished: '2026-01-01',
    dateModified: '2026-05-05',
    url: 'https://chordfinder.app/guide/accords-guitare-debutant',
  };

  return (
    <ContentLayout
      breadcrumbs={[
        { label: 'Guides', href: '/guide' },
        { label: 'Accords guitare débutant', href: '/guide/accords-guitare-debutant' },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Guide · Débutant · Guitare
          </p>
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
            Les accords de guitare<br />pour débutants
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            Ces 10 accords vous permettent de jouer des centaines de chansons. Maîtrisez-les dans
            cet ordre et vous aurez une base solide pour toute la suite de votre apprentissage.
          </p>
        </header>

        <section className="mb-14">
          <h2 className="font-display text-xl mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
            Par où commencer ?
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            L'ordre d'apprentissage compte. Commencez par les accords ouverts (sans barré) :
            Mi majeur, Mi mineur, La majeur, La mineur, Ré majeur, Ré mineur. Ces six accords
            utilisent des cordes à vide qui compensent les imperfections de la pression des doigts.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Ensuite, ajoutez Do majeur et Sol majeur, qui demandent plus d'écartement des doigts.
            Enfin, attaquez le premier barré : Fa majeur à la 1re frette, puis Si mineur à la 2e.
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            Consacrez 10-15 minutes par jour à la pratique. La régularité est plus efficace que
            des sessions longues espacées. Vos doigts développeront naturellement la mémoire musculaire.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-xl mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            Les 10 accords essentiels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BEGINNER_CHORDS.map(({ symbol, frenchName, tips }) => {
              const shape = GUITAR_CHORDS[symbol];
              return (
                <div key={symbol} className="border p-5" style={{ borderColor: '#2A2A2A' }}>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3
                      className="font-display text-2xl"
                      style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8', letterSpacing: '-0.02em' }}
                    >
                      {symbol}
                    </h3>
                    <span className="text-xs font-mono" style={{ color: '#555' }}>{frenchName}</span>
                  </div>
                  <p className="text-xs font-mono leading-relaxed mb-4" style={{ color: '#777' }}>
                    {tips}
                  </p>
                  {shape && (
                    <div className="flex justify-center">
                      <GuitarDiagram shape={shape} chordName={symbol} />
                    </div>
                  )}
                  <div className="mt-3 flex justify-end">
                    <Link
                      href={`/accords/${symbol === 'Em' ? 'mi-mineur' : symbol === 'Am' ? 'la-mineur' : symbol === 'Dm' ? 're-mineur' : symbol === 'Bm' ? 'si-mineur' : symbol === 'C' ? 'do-majeur' : symbol === 'D' ? 're-majeur' : symbol === 'E' ? 'mi-majeur' : symbol === 'F' ? 'fa-majeur' : symbol === 'G' ? 'sol-majeur' : 'la-majeur'}`}
                      className="text-xs font-mono transition-colors hover:text-[#C8F562]"
                      style={{ color: '#555' }}
                    >
                      Fiche complète →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Enchaîner les accords : 4 progressions indispensables
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#C8C8C8' }}>
            Connaître les accords ne suffit pas : il faut les enchaîner fluidement. Voici
            4 progressions classiques qui vous permettront de jouer des centaines de chansons
            dès que vous maîtrisez les accords ouverts.
          </p>
          <div className="space-y-4">
            {PROGRESSIONS.map((prog) => (
              <div key={prog.name} className="border p-5" style={{ borderColor: '#2A2A2A' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-mono" style={{ color: '#E8E8E8' }}>{prog.name}</h3>
                  <span className="text-xs font-mono shrink-0" style={{ color: '#555' }}>{prog.genre}</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {prog.chords.map((chord) => (
                    <span
                      key={chord}
                      className="px-3 py-1.5 border font-display text-lg"
                      style={{ borderColor: '#C8F562', color: '#C8F562', fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
                    >
                      {chord}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Conseils pour progresser plus vite
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Travaillez les transitions', text: 'L\'exercice le plus efficace : passer d\'un accord à un autre 20 fois de suite lentement, sans regarder vos doigts. La mémoire musculaire s\'installe progressivement.' },
              { title: 'Utilisez ChordFinder pour vérifier', text: 'Jouez votre accord et fredonnez la basse. ChordFinder confirmera si vous jouez la bonne note. Parfait pour vérifier des accords dont vous n\'êtes pas sûr.' },
              { title: 'Entraînez-vous sur de vraies chansons', text: 'Apprenez des chansons que vous aimez, pas des exercices abstraits. La motivation fait toute la différence dans la régularité de la pratique.' },
              { title: 'Ne négligez pas le tempo', text: 'Jouez lentement mais en rythme plutôt que vite avec des fautes. Un métronome numérique gratuit en ligne suffit pour débuter.' },
            ].map((tip) => (
              <div key={tip.title} className="border-l-2 pl-4 py-1" style={{ borderColor: '#C8F562' }}>
                <p className="text-sm font-mono mb-1" style={{ color: '#E8E8E8' }}>{tip.title}</p>
                <p className="text-xs font-mono leading-relaxed" style={{ color: '#777' }}>{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 border-t pt-10" style={{ borderColor: '#2A2A2A' }}>
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Articles liés
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/guide/trouver-accords-chanson" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>
                Trouver les accords d'une chanson
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Méthode complète pour identifier les accords à l'oreille</p>
            </Link>
            <Link href="/instruments/guitare" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>
                ChordFinder pour la guitare
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Utiliser l'app avec les diagrammes de doigtés</p>
            </Link>
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
