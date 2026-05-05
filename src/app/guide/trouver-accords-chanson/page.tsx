import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'Comment trouver les accords d\'une chanson — Guide complet',
  description: 'Méthode pas-à-pas pour identifier les accords d\'une chanson à l\'oreille ou avec un outil. Transposition, oreille musicale, ChordFinder.',
  alternates: { canonical: '/guide/trouver-accords-chanson' },
  openGraph: {
    title: 'Comment trouver les accords d\'une chanson — Guide complet',
    description: 'Méthode pas-à-pas pour identifier les accords à l\'oreille ou avec un outil comme ChordFinder.',
    url: '/guide/trouver-accords-chanson',
  },
};

export default function TrouverAccordsChanson() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Comment trouver les accords d\'une chanson — Guide complet',
    description: 'Méthode pour identifier les accords d\'une chanson à l\'oreille ou avec un outil.',
    author: { '@type': 'Organization', name: 'ChordFinder' },
    datePublished: '2026-01-01',
    dateModified: '2026-05-05',
    url: 'https://chordfinder.app/guide/trouver-accords-chanson',
  };

  return (
    <ContentLayout
      breadcrumbs={[
        { label: 'Guides', href: '/guide' },
        { label: 'Trouver les accords d\'une chanson', href: '/guide/trouver-accords-chanson' },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Guide · Débutant
          </p>
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
            Comment trouver les accords<br />d'une chanson
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            Que vous ayez une mélodie en tête ou une chanson à la radio, cette méthode vous guide
            étape par étape pour identifier les accords — même sans formation musicale avancée.
          </p>
        </header>

        <div className="prose-content space-y-10" style={{ color: '#C8C8C8' }}>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Comprendre la relation entre mélodie et accords
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4">
              Chaque accord est un ensemble de notes jouées simultanément. La mélodie d'une chanson
              est construite sur les notes de ces accords. En identifiant la note dominante d'une
              phrase mélodique, vous avez souvent la fondamentale (ou la tonique) de l'accord qui
              l'accompagne.
            </p>
            <p className="text-sm font-mono leading-relaxed mb-4">
              Par exemple, si la mélodie tourne autour du Do, il y a de fortes chances que l'accord
              soit Do majeur, Do mineur, ou un accord qui contient Do (comme La mineur ou Fa majeur).
            </p>
            <p className="text-sm font-mono leading-relaxed">
              La plupart des chansons pop, rock et folk utilisent seulement 3 à 4 accords issus
              de la même tonalité. Cela réduit considérablement le nombre de possibilités à explorer.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Méthode 1 : Trouver la tonalité de la chanson
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4">
              La première étape est d'identifier dans quelle tonalité est jouée la chanson.
              Fredonner la fin de la chanson — la note sur laquelle elle "repose" — vous donne
              généralement la tonique.
            </p>
            <p className="text-sm font-mono leading-relaxed mb-4">
              Une fois la tonique trouvée (disons Sol), les accords les plus probables sont ceux
              de la gamme de Sol majeur :
            </p>
            <div className="border p-4 font-mono text-xs leading-relaxed" style={{ borderColor: '#2A2A2A', background: '#111' }}>
              <p className="mb-1" style={{ color: '#C8F562' }}>Tonalité de Sol majeur :</p>
              <p>I — Sol majeur (accord principal)</p>
              <p>II — La mineur</p>
              <p>III — Si mineur</p>
              <p>IV — Do majeur</p>
              <p>V — Ré majeur</p>
              <p>VI — Mi mineur (relatif mineur)</p>
              <p>VII — Fa# diminué (rare en pop)</p>
            </div>
            <p className="text-sm font-mono leading-relaxed mt-4">
              La majorité des chansons utilise les accords I, IV, V et parfois VI. En Sol : Sol, Do,
              Ré et Mi mineur. Essayez ces quatre accords et vous couvrirez des centaines de chansons.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Méthode 2 : Fredonner pour identifier la note
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4">
              C'est exactement ce que fait ChordFinder. En fredonnant ou en jouant une note dans
              votre micro, l'application détecte la fréquence et vous affiche immédiatement :
            </p>
            <ul className="text-sm font-mono leading-relaxed space-y-2 list-none">
              {[
                'La note exacte détectée (ex : Sol)',
                'L\'accord principal compatible (ex : Sol majeur)',
                'Tous les accords qui contiennent cette note (mode avancé)',
                'Le diagramme guitare ou les touches piano correspondantes',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: '#C8F562' }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm font-mono leading-relaxed mt-4">
              Cette approche est particulièrement efficace pour les musiciens d'oreille qui savent
              chanter la mélodie mais ne maîtrisent pas encore le solfège.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Méthode 3 : Analyser la basse
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4">
              La note de basse (la note la plus grave d'un accord) est presque toujours la
              fondamentale. En isolant la ligne de basse d'une chanson et en identifiant ses notes,
              vous obtenez directement le nom des accords.
            </p>
            <p className="text-sm font-mono leading-relaxed mb-4">
              Exercice pratique : écoutez une chanson et essayez de chanter uniquement la basse.
              Fredonnez ensuite chaque note tenue dans ChordFinder pour obtenir son nom.
            </p>
            <p className="text-sm font-mono leading-relaxed">
              Cette technique fonctionne pour tous les genres : pop, rock, jazz, reggae. La basse
              "balisise" la progression harmonique de façon très lisible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Reconnaître les accords majeurs et mineurs à l'oreille
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4">
              Un accord majeur sonne "joyeux" ou "stable". Un accord mineur sonne "mélancolique"
              ou "sombre". Cette distinction est souvent instinctive, même pour les non-musiciens.
            </p>
            <p className="text-sm font-mono leading-relaxed mb-4">
              Techniquement, la différence vient d'une seule note : la tierce. Un accord majeur
              a une tierce majeure (2 tons au-dessus de la fondamentale) ; un accord mineur a une
              tierce mineure (1 ton et demi).
            </p>
            <p className="text-sm font-mono leading-relaxed">
              Entraînez-vous à reconnaître ce caractère émotionnel sur les chansons que vous
              connaissez. Avec le temps, vous développerez une oreille harmonique fiable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Les progressions d'accords les plus courantes
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4">
              Voici les progressions que vous retrouverez dans la majorité des chansons populaires.
              Les numéros correspondent aux degrés de la gamme (I, IV, V, VI) :
            </p>
            <div className="space-y-3">
              {[
                { name: 'I – V – VI – IV', example: 'Ex en Do : Do – Sol – La min – Fa', note: 'La progression la plus jouée au monde' },
                { name: 'I – IV – V', example: 'Ex en Sol : Sol – Do – Ré', note: 'Blues et rock classique' },
                { name: 'VI – IV – I – V', example: 'Ex en Do : La min – Fa – Do – Sol', note: 'Pop mélancolique' },
                { name: 'I – VI – IV – V', example: 'Ex en Do : Do – La min – Fa – Sol', note: '50s, rock\'n\'roll' },
              ].map((prog) => (
                <div key={prog.name} className="border p-4" style={{ borderColor: '#2A2A2A', background: '#0E0E0E' }}>
                  <p className="text-sm font-mono mb-1" style={{ color: '#C8F562' }}>{prog.name}</p>
                  <p className="text-xs font-mono mb-1" style={{ color: '#999' }}>{prog.example}</p>
                  <p className="text-xs font-mono" style={{ color: '#555' }}>{prog.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Utiliser ChordFinder dans votre processus
            </h2>
            <p className="text-sm font-mono leading-relaxed mb-4">
              ChordFinder est conçu pour accélérer cette recherche. Voici comment l'intégrer dans
              votre flux de travail :
            </p>
            <ol className="space-y-3 font-mono text-sm">
              {[
                'Écoutez la chanson et fredonnez mentalement la note de basse de chaque accord',
                'Ouvrez ChordFinder et fredonnez cette note dans le micro',
                'Notez l\'accord suggéré et testez-le sur votre instrument',
                'Passez à l\'accord suivant de la progression',
                'En mode Avancé, voyez tous les accords qui contiennent cette note pour explorer des alternatives',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 border text-xs flex items-center justify-center font-mono" style={{ borderColor: '#C8F562', color: '#C8F562' }}>
                    {i + 1}
                  </span>
                  <span style={{ color: '#C8C8C8' }}>{step}</span>
                </li>
              ))}
            </ol>
          </section>

        </div>

        <div className="mt-16 border-t pt-10" style={{ borderColor: '#2A2A2A' }}>
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Articles liés
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/guide/accords-guitare-debutant" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>
                Accords de guitare pour débutants
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Les 10 accords à apprendre en premier</p>
            </Link>
            <Link href="/accords" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>
                Fiches accords
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>24 accords majeurs et mineurs avec diagrammes</p>
            </Link>
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
