import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import GuitarDiagram from '@/components/GuitarDiagram';
import { GUITAR_CHORDS } from '@/lib/guitarChords';

export const metadata: Metadata = {
  title: 'Trouver les accords à la guitare avec ChordFinder',
  description: 'ChordFinder pour guitaristes : détectez votre note, obtenez le diagramme de doigtés en temps réel. Accords ouverts, barrés, Do concert. Gratuit.',
  alternates: { canonical: '/instruments/guitare' },
  openGraph: {
    title: 'Trouver les accords à la guitare avec ChordFinder',
    description: 'Détectez votre note, obtenez le diagramme de doigtés guitare instantanément.',
    url: '/instruments/guitare',
  },
};

const SHOWCASE_CHORDS = ['C', 'G', 'Am', 'F', 'D', 'Em'];

export default function GuitarePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ChordFinder pour guitaristes — Diagrammes de doigtés en temps réel',
    description: 'Comment utiliser ChordFinder pour trouver les accords à la guitare.',
    author: { '@type': 'Organization', name: 'ChordFinder' },
    datePublished: '2026-01-01',
    url: 'https://chordfinder.app/instruments/guitare',
  };

  return (
    <ContentLayout
      breadcrumbs={[
        { label: 'Instruments', href: '/instruments' },
        { label: 'Guitare', href: '/instruments/guitare' },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Instrument · Guitare
          </p>
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
            ChordFinder pour la guitare
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            Détectez instantanément quelle note vous jouez et obtenez le diagramme de doigtés
            correspondant — accords ouverts, barrés, et toutes les tonalités.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Comment ça marche pour la guitare
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            ChordFinder utilise le microphone de votre appareil pour analyser le son de votre
            guitare en temps réel. Il détecte la fréquence fondamentale de la note jouée grâce
            à un algorithme de détection de pitch (AMDF), puis identifie tous les accords qui
            contiennent cette note.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Pour la guitare, l'application affiche automatiquement un diagramme de doigtés
            SVG — la position exacte des doigts sur le manche, avec indication du barré si
            nécessaire. La guitare fonctionne en Do concert (pas de transposition).
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            En mode Avancé, vous voyez tous les accords compatibles avec la note détectée,
            ce qui est utile pour explorer des substitutions harmoniques ou trouver l'accord
            exact d'une progression.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Exemples de diagrammes
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#C8C8C8' }}>
            Voici quelques exemples des diagrammes que ChordFinder affiche en temps réel pour
            les accords les plus courants de la guitare :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SHOWCASE_CHORDS.map((symbol) => {
              const shape = GUITAR_CHORDS[symbol];
              if (!shape) return null;
              const slug = symbol === 'Am' ? 'la-mineur' : symbol === 'Em' ? 'mi-mineur' : symbol === 'C' ? 'do-majeur' : symbol === 'G' ? 'sol-majeur' : symbol === 'F' ? 'fa-majeur' : 're-majeur';
              return (
                <Link
                  key={symbol}
                  href={`/accords/${slug}`}
                  className="block border p-4 text-center hover:border-[#3A3A3A] transition-colors"
                  style={{ borderColor: '#2A2A2A' }}
                >
                  <p
                    className="font-display text-xl mb-3"
                    style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em', color: '#E8E8E8' }}
                  >
                    {symbol}
                  </p>
                  <GuitarDiagram shape={shape} chordName={symbol} />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Conseils d'utilisation avec la guitare
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Rapprochez le micro de la guitare', text: 'Pour une détection optimale, jouez la note clairement à 30–50 cm du micro de votre ordinateur ou téléphone. Évitez les fonds sonores.' },
              { title: 'Jouez une seule note à la fois', text: 'ChordFinder détecte la fréquence fondamentale d\'une note. Pour identifier un accord inconnu, jouez la basse de l\'accord (corde grave) et l\'app vous suggère le nom.' },
              { title: 'Utilisez le mode Avancé pour l\'harmonie', text: 'Activez le mode Avancé pour voir tous les accords qui contiennent votre note. Utile pour comprendre les substitutions ou trouver un accord de passage.' },
              { title: 'Indicateur de volume', text: 'La barre verte en bas de la forme d\'onde indique le volume capté. Si elle est absente, rapprochez-vous du micro ou jouez plus fort.' },
            ].map((tip) => (
              <div key={tip.title} className="border-l-2 pl-4 py-1" style={{ borderColor: '#C8F562' }}>
                <p className="text-sm font-mono mb-1" style={{ color: '#E8E8E8' }}>{tip.title}</p>
                <p className="text-xs font-mono leading-relaxed" style={{ color: '#777' }}>{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Cas d'usage pratiques
          </h2>
          <div className="space-y-3">
            {[
              { scenario: 'Vous apprenez une chanson', solution: 'Jouez les notes de basse une par une dans le micro. ChordFinder vous donne le nom de l\'accord et le diagramme de doigtés à reproduire.' },
              { scenario: 'Vous cherchez un accord oublié', solution: 'Fredonnez la note que vous entendez — l\'app vous rappelle immédiatement le nom et le doigté.' },
              { scenario: 'Vous composez', solution: 'En mode Avancé, explorez tous les accords compatibles avec une note pour créer des progressions originales.' },
              { scenario: 'Vous enseignez la guitare', solution: 'Montrez à vos élèves en temps réel quel accord correspond à chaque note, avec le diagramme sur l\'écran.' },
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
            <Link href="/guide/accords-guitare-debutant" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Accords pour débutants</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Les 10 accords essentiels avec diagrammes</p>
            </Link>
            <Link href="/accords" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Fiches accords complètes</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>24 accords majeurs et mineurs</p>
            </Link>
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
