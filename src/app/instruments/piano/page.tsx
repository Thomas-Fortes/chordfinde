import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import PianoDiagram from '@/components/PianoDiagram';

export const metadata: Metadata = {
  title: 'Identifier les accords au piano en temps réel — ChordFinder',
  description: 'ChordFinder pour pianistes : détectez votre note et visualisez instantanément les touches correspondantes sur le piano. Gratuit, sans installation.',
  alternates: { canonical: '/instruments/piano' },
  openGraph: {
    title: 'Identifier les accords au piano en temps réel',
    description: 'Fredonnez ou jouez, ChordFinder affiche les touches piano de l\'accord instantanément.',
    url: '/instruments/piano',
  },
};

const SHOWCASE = [
  { symbol: 'C', notes: ['C', 'E', 'G'], frenchName: 'Do majeur' },
  { symbol: 'Am', notes: ['A', 'C', 'E'], frenchName: 'La mineur' },
  { symbol: 'F', notes: ['F', 'A', 'C'], frenchName: 'Fa majeur' },
  { symbol: 'G', notes: ['G', 'B', 'D'], frenchName: 'Sol majeur' },
];

export default function PianoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Identifier les accords au piano avec ChordFinder',
    description: 'Utiliser ChordFinder pour visualiser les accords sur le piano en temps réel.',
    author: { '@type': 'Organization', name: 'ChordFinder' },
    datePublished: '2026-01-01',
    url: 'https://chordfinder.app/instruments/piano',
  };

  return (
    <ContentLayout
      breadcrumbs={[
        { label: 'Instruments', href: '/instruments' },
        { label: 'Piano', href: '/instruments/piano' },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Instrument · Piano
          </p>
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
            ChordFinder pour le piano
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            Visualisez instantanément quelles touches appuyer pour chaque accord détecté.
            Idéal pour les débutants au piano, les compositeurs et les arrangeurs.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Visualisation des touches en temps réel
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Quand ChordFinder détecte une note en mode Piano, il affiche un mini-clavier avec
            les touches de l'accord surligné en vert. Cela permet de visualiser immédiatement
            où poser les doigts sur le clavier.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Le piano est un instrument non-transpositeur : il joue en Do concert. Il n'y a
            donc aucun décalage entre la note fredonnée et la note affichée. Ce que vous
            entendez correspond exactement aux touches montrées.
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            Le mode Avancé permet de voir tous les accords compatibles avec votre note,
            ce qui est utile pour les compositeurs cherchant des alternatives harmoniques
            ou pour les pianistes d'accompagnement voulant varier leur jeu.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Exemples de visualisations piano
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SHOWCASE.map(({ symbol, notes, frenchName }) => {
              const slug = symbol === 'Am' ? 'la-mineur' : symbol === 'C' ? 'do-majeur' : symbol === 'F' ? 'fa-majeur' : 'sol-majeur';
              return (
                <Link
                  key={symbol}
                  href={`/accords/${slug}`}
                  className="block border p-5 hover:border-[#3A3A3A] transition-colors"
                  style={{ borderColor: '#2A2A2A' }}
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-display text-2xl" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8', letterSpacing: '-0.02em' }}>{symbol}</span>
                    <span className="text-xs font-mono" style={{ color: '#555' }}>{frenchName}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <PianoDiagram notes={notes} chordName={symbol} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Pour quel pianiste ?
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Pianiste débutant', text: 'Vous apprenez une chanson mais ne connaissez pas encore tous les accords ? Chantez la mélodie dans ChordFinder et visualisez immédiatement les touches à appuyer.' },
              { title: 'Compositeur', text: 'Vous cherchez l\'accord exact d\'une progression que vous entendez dans votre tête ? Fredonnez la note de basse et explorez tous les accords possibles en mode Avancé.' },
              { title: 'Pianiste d\'accompagnement', text: 'Vous accompagnez un chanteur ou un instrumentiste ? Fredonnez la tonique de sa mélodie pour vérifier l\'accord et les doigtés correspondants.' },
              { title: 'Enseignant', text: 'Montrez à vos élèves la correspondance entre une note entendue et les touches du piano. Outil pédagogique visuel et interactif.' },
            ].map((item) => (
              <div key={item.title} className="border-l-2 pl-4 py-1" style={{ borderColor: '#C8F562' }}>
                <p className="text-sm font-mono mb-1" style={{ color: '#E8E8E8' }}>{item.title}</p>
                <p className="text-xs font-mono leading-relaxed" style={{ color: '#777' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Le piano, instrument de référence
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Le piano est l'instrument de référence en harmonie musicale. Contrairement aux
            instruments à cordes ou aux cuivres, les touches du piano représentent visuellement
            la gamme chromatique de façon linéaire et intuitive.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Cette disposition facilite la compréhension des intervalles : une seconde = 1 ou 2 touches,
            une tierce = sauter une touche, etc. C'est pourquoi apprendre l'harmonie au piano,
            même sans en faire son instrument principal, est un avantage considérable.
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            Les diagrammes piano de ChordFinder couvrent une octave (Do central à Si), ce qui
            suffit pour la plupart des voicings d'accords de base. Pour les accords étendus (7e,
            9e), les modes concert et avancé affichent toutes les notes.
          </p>
        </section>

        <div className="border-t pt-8" style={{ borderColor: '#2A2A2A' }}>
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Ressources complémentaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/accords/do-majeur" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Accord de Do majeur</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Notes, piano et guitare — le premier accord</p>
            </Link>
            <Link href="/guide/trouver-accords-chanson" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Trouver les accords d'une chanson</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Méthode complète pour identifier les accords</p>
            </Link>
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
