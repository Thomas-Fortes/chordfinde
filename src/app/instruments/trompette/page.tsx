import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'ChordFinder pour trompette Si♭ — Transposition automatique',
  description: 'ChordFinder en mode trompette Si♭ : transposition automatique de 2 demi-tons. Fredonnez Do concert, obtenez Ré sur votre trompette. Clarinette et saxophone inclus.',
  alternates: { canonical: '/instruments/trompette' },
  openGraph: {
    title: 'ChordFinder pour trompette Si♭ — Transposition automatique',
    description: 'Transposition Si♭ automatique : détectez la note concert, obtenez la note trompette.',
    url: '/instruments/trompette',
  },
};

const EXAMPLES = [
  { concert: 'Do', trompette: 'Ré', concertSym: 'C', trompSym: 'D' },
  { concert: 'Ré', trompette: 'Mi', concertSym: 'D', trompSym: 'E' },
  { concert: 'Mi', trompette: 'Fa#', concertSym: 'E', trompSym: 'F#' },
  { concert: 'Fa', trompette: 'Sol', concertSym: 'F', trompSym: 'G' },
  { concert: 'Sol', trompette: 'La', concertSym: 'G', trompSym: 'A' },
  { concert: 'La', trompette: 'Si', concertSym: 'A', trompSym: 'B' },
];

export default function TrompettePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ChordFinder pour trompette Si♭ — Transposition automatique',
    description: 'Mode trompette dans ChordFinder : transposition Si♭ automatique.',
    author: { '@type': 'Organization', name: 'ChordFinder' },
    datePublished: '2026-01-01',
    url: 'https://chordfinder.app/instruments/trompette',
  };

  return (
    <ContentLayout
      breadcrumbs={[
        { label: 'Instruments', href: '/instruments' },
        { label: 'Trompette', href: '/instruments/trompette' },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Instrument · Trompette Si♭
          </p>
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
            ChordFinder pour trompette Si♭
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            Mode transposition automatique : fredonnez une note concert, ChordFinder affiche
            instantanément la note correspondante sur votre trompette et les accords compatibles.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Le problème de la transposition Si♭
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            La trompette est un instrument transpositeur en Si♭. Quand un trompettiste joue ce
            qu'il appelle « Do », son instrument produit physiquement un Si♭ concert. C'est un
            décalage constant de 2 demi-tons qui complique la communication avec les pianistes,
            guitaristes et autres musiciens non-transpositeurs.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Concrètement : si votre groupe joue en Do concert et que le guitariste vous dit « joue
            Do », vous devez en réalité jouer Ré sur votre trompette. ChordFinder fait ce calcul
            automatiquement — vous n'avez plus à transposer mentalement.
          </p>
          <div className="border p-5" style={{ borderColor: '#2A2A2A', background: '#111' }}>
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#C8F562' }}>
              Ce que fait ChordFinder
            </p>
            <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
              1. Vous fredonnez (ou votre instrument joue) une note concert<br />
              2. ChordFinder détecte la fréquence réelle<br />
              3. L'app affiche la note <strong style={{ color: '#E8E8E8' }}>transposée Si♭</strong> — ce que vous jouez sur la trompette<br />
              4. L'accord suggéré est aussi affiché en notation Si♭
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Correspondances rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {EXAMPLES.map((ex) => (
              <div key={ex.concertSym} className="border p-4 flex items-center justify-between" style={{ borderColor: '#2A2A2A' }}>
                <div>
                  <p className="text-xs font-mono mb-1" style={{ color: '#555' }}>Concert</p>
                  <p className="font-display text-xl" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>
                    {ex.concert}
                  </p>
                </div>
                <span className="text-xs font-mono" style={{ color: '#333' }}>→</span>
                <div className="text-right">
                  <p className="text-xs font-mono mb-1" style={{ color: '#555' }}>Trompette</p>
                  <p className="font-display text-xl" style={{ fontFamily: 'var(--font-syne)', color: '#C8F562' }}>
                    {ex.trompette}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono mt-4" style={{ color: '#555' }}>
            <Link href="/guide/transposition-trompette" className="hover:text-[#E8E8E8] transition-colors">
              Voir le tableau complet des 12 notes →
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Comment utiliser le mode Trompette
          </h2>
          <ol className="space-y-4 font-mono text-sm">
            {[
              'Ouvrez ChordFinder et sélectionnez "Trompette" dans le sélecteur d\'instrument en haut',
              'Cliquez sur le bouton micro pour activer l\'écoute',
              'Fredonnez, chantez ou jouez une note concert (par ex. Do concert)',
              'ChordFinder affiche la note correspondante sur la trompette (Ré) et l\'accord compatible',
              'En bas de la carte d\'accord, vous voyez aussi la note concert pour référence',
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 w-6 h-6 border text-xs flex items-center justify-center" style={{ borderColor: '#C8F562', color: '#C8F562' }}>
                  {i + 1}
                </span>
                <span style={{ color: '#C8C8C8' }}>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Autres instruments Si♭ supportés
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#C8C8C8' }}>
            Le même décalage de 2 demi-tons s'applique à tous ces instruments, disponibles dans
            le sélecteur de ChordFinder :
          </p>
          <div className="space-y-2">
            {['Clarinette Si♭', 'Saxophone ténor', 'Saxophone soprano'].map((name) => (
              <div key={name} className="flex items-center gap-3 border px-4 py-3" style={{ borderColor: '#2A2A2A' }}>
                <span className="text-xs font-mono flex-1" style={{ color: '#E8E8E8' }}>{name}</span>
                <span className="text-xs font-mono px-2 py-0.5 border" style={{ borderColor: '#2A2A2A', color: '#C8F562' }}>
                  +2 demi-tons
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm font-mono leading-relaxed mt-4" style={{ color: '#C8C8C8' }}>
            Le saxophone alto et baryton sont en Mi♭ (+9 demi-tons) — ils ont leur propre mode
            dans l'application.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Cas d'usage pratiques pour trompettistes
          </h2>
          <div className="space-y-4">
            {[
              { scenario: 'Répétition avec un groupe mixte', solution: 'Le guitariste joue un accord — fredonnez la basse dans ChordFinder en mode Trompette pour savoir quelle note jouer sur votre instrument.' },
              { scenario: 'Transposer une partition concert', solution: 'Jouez chaque note de la partition dans ChordFinder. La note affichée est celle à écrire sur votre partition Si♭.' },
              { scenario: 'Improvisation sur une grille d\'accords', solution: 'Le pianiste annonce "Do majeur" — utilisez ChordFinder pour vérifier les notes disponibles en notation Si♭ et improviser en conséquence.' },
              { scenario: 'Apprentissage du répertoire jazz', solution: 'Le jazz utilise souvent des tonalités de Si♭, Mi♭, Fa. ChordFinder vous aide à repérer rapidement les accords dans votre notation Si♭.' },
            ].map((item) => (
              <div key={item.scenario} className="border p-4" style={{ borderColor: '#2A2A2A' }}>
                <p className="text-sm font-mono mb-1" style={{ color: '#C8F562' }}>{item.scenario}</p>
                <p className="text-xs font-mono leading-relaxed" style={{ color: '#777' }}>{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t pt-8" style={{ borderColor: '#2A2A2A' }}>
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Ressources complémentaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/guide/transposition-trompette" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Guide transposition Si♭</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Tableau complet et explications détaillées</p>
            </Link>
            <Link href="/accords/sib-majeur" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Accord de Si♭ majeur</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>L'accord "Do" de la trompette</p>
            </Link>
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
