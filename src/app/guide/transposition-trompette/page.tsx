import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'Transposition trompette Si♭ — Guide pratique',
  description: 'Comprendre la transposition Si♭ : décalage de 2 demi-tons, tableau de correspondance Do concert ↔ Si♭, saxophone, clarinette. ChordFinder gère tout automatiquement.',
  alternates: { canonical: '/guide/transposition-trompette' },
  openGraph: {
    title: 'Transposition trompette Si♭ — Guide pratique',
    description: 'Comprendre le décalage de 2 demi-tons, tableau de correspondance complet Do concert ↔ Si♭.',
    url: '/guide/transposition-trompette',
  },
};

const TRANSPOSITION_TABLE = [
  { concert: 'Do', sib: 'Ré', concertSym: 'C', sibSym: 'D' },
  { concert: 'Ré♭', sib: 'Mi♭', concertSym: 'Db', sibSym: 'Eb' },
  { concert: 'Ré', sib: 'Mi', concertSym: 'D', sibSym: 'E' },
  { concert: 'Mi♭', sib: 'Fa', concertSym: 'Eb', sibSym: 'F' },
  { concert: 'Mi', sib: 'Fa#', concertSym: 'E', sibSym: 'F#' },
  { concert: 'Fa', sib: 'Sol', concertSym: 'F', sibSym: 'G' },
  { concert: 'Sol♭', sib: 'La♭', concertSym: 'Gb', sibSym: 'Ab' },
  { concert: 'Sol', sib: 'La', concertSym: 'G', sibSym: 'A' },
  { concert: 'La♭', sib: 'Si♭', concertSym: 'Ab', sibSym: 'Bb' },
  { concert: 'La', sib: 'Si', concertSym: 'A', sibSym: 'B' },
  { concert: 'Si♭', sib: 'Do', concertSym: 'Bb', sibSym: 'C' },
  { concert: 'Si', sib: 'Do#', concertSym: 'B', sibSym: 'C#' },
];

const INSTRUMENTS_SIB = [
  { name: 'Trompette', offset: 2, note: 'Si♭', example: 'Joue Ré pour sonner Do concert' },
  { name: 'Clarinette Si♭', offset: 2, note: 'Si♭', example: 'Joue Ré pour sonner Do concert' },
  { name: 'Saxophone ténor', offset: 2, note: 'Si♭', example: 'Joue Ré pour sonner Do concert' },
  { name: 'Saxophone soprano', offset: 2, note: 'Si♭', example: 'Joue Ré pour sonner Do concert' },
  { name: 'Cor (en Fa)', offset: -7, note: 'Fa', example: 'Joue Sol pour sonner Do concert' },
];

const INSTRUMENTS_MIB = [
  { name: 'Saxophone alto', offset: 9, note: 'Mi♭', example: 'Joue La pour sonner Do concert' },
  { name: 'Saxophone baryton', offset: 9, note: 'Mi♭', example: 'Joue La pour sonner Do concert' },
];

export default function TranspositionTrompette() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Transposition trompette Si♭ — Guide pratique',
    description: 'Comprendre la transposition des instruments Si♭ : trompette, clarinette, saxophone.',
    author: { '@type': 'Organization', name: 'ChordFinder' },
    datePublished: '2026-01-01',
    dateModified: '2026-05-05',
    url: 'https://chordfinder.app/guide/transposition-trompette',
  };

  return (
    <ContentLayout
      breadcrumbs={[
        { label: 'Guides', href: '/guide' },
        { label: 'Transposition trompette Si♭', href: '/guide/transposition-trompette' },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Guide · Intermédiaire · Cuivres & Bois
          </p>
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
            Transposition trompette Si♭<br />— Guide pratique
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            La trompette est un instrument transpositeur en Si♭. Cela signifie qu'il y a un décalage
            de 2 demi-tons entre ce que lit/joue le trompettiste et ce qu'entend le reste de l'orchestre.
            Ce guide explique tout, avec un tableau de correspondance complet.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Pourquoi la trompette est-elle un instrument transpositeur ?
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Historiquement, les cuivres étaient construits en différentes tonalités selon leur
            tessiture et leur usage. La trompette moderne est accordée en Si♭ : quand le trompettiste
            joue ce qu'il appelle « Do » (en lisant un Do sur sa partition), l'instrument produit
            physiquement un Si♭ concert.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Dit autrement : la trompette sonne 2 demi-tons (1 ton) plus bas que la note écrite.
            Pour qu'un trompettiste joue la même note qu'un pianiste, il doit jouer 2 demi-tons plus
            haut que ce que joue le pianiste.
          </p>
          <div className="border p-5" style={{ borderColor: '#2A2A2A', background: '#111' }}>
            <p className="text-xs font-mono mb-3" style={{ color: '#C8F562' }}>Exemple concret :</p>
            <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
              Le pianiste joue <strong style={{ color: '#E8E8E8' }}>Do concert</strong>.<br />
              Pour jouer la même note, le trompettiste lit et joue <strong style={{ color: '#E8E8E8' }}>Ré</strong> sur sa partition.<br />
              → Décalage : +2 demi-tons (une seconde majeure vers le haut).
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Tableau de correspondance complet
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#C8C8C8' }}>
            Ce tableau montre, pour chaque note du concert (piano, flûte, violon…),
            quelle note doit jouer le trompettiste pour sonner à l'unisson.
          </p>
          <div className="border overflow-hidden" style={{ borderColor: '#2A2A2A' }}>
            <div className="grid grid-cols-2 text-xs font-mono" style={{ background: '#111' }}>
              <div className="px-4 py-2 border-b border-r" style={{ borderColor: '#2A2A2A', color: '#C8F562' }}>
                Note concert (piano, flûte…)
              </div>
              <div className="px-4 py-2 border-b" style={{ borderColor: '#2A2A2A', color: '#C8F562' }}>
                Note trompette Si♭ (ce qu'il joue)
              </div>
            </div>
            {TRANSPOSITION_TABLE.map((row, i) => (
              <div
                key={row.concertSym}
                className="grid grid-cols-2 text-sm font-mono border-b"
                style={{ borderColor: '#2A2A2A', background: i % 2 === 0 ? '#0C0C0C' : '#0E0E0E' }}
              >
                <div className="px-4 py-3 border-r" style={{ borderColor: '#2A2A2A', color: '#E8E8E8' }}>
                  <strong>{row.concert}</strong> <span style={{ color: '#555' }}>({row.concertSym})</span>
                </div>
                <div className="px-4 py-3" style={{ color: '#C8F562' }}>
                  <strong>{row.sib}</strong> <span style={{ color: '#555' }}>({row.sibSym})</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Les instruments transpositeurs en Si♭
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: '#C8C8C8' }}>
            La trompette n'est pas seule dans ce cas. Ces instruments partagent le même décalage
            de 2 demi-tons :
          </p>
          <div className="space-y-3 mb-8">
            {INSTRUMENTS_SIB.map((inst) => (
              <div key={inst.name} className="flex items-center gap-4 border p-4" style={{ borderColor: '#2A2A2A' }}>
                <div className="flex-1">
                  <p className="text-sm font-mono" style={{ color: '#E8E8E8' }}>{inst.name}</p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: '#555' }}>{inst.example}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 border" style={{ borderColor: '#2A2A2A', color: '#C8F562' }}>
                  +{inst.offset} demi-tons
                </span>
              </div>
            ))}
          </div>

          <h3 className="font-display text-lg mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Les instruments transpositeurs en Mi♭
          </h3>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Le saxophone alto et baryton sont en Mi♭ : décalage de 9 demi-tons (une sixte mineure).
          </p>
          <div className="space-y-3">
            {INSTRUMENTS_MIB.map((inst) => (
              <div key={inst.name} className="flex items-center gap-4 border p-4" style={{ borderColor: '#2A2A2A' }}>
                <div className="flex-1">
                  <p className="text-sm font-mono" style={{ color: '#E8E8E8' }}>{inst.name}</p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: '#555' }}>{inst.example}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 border" style={{ borderColor: '#2A2A2A', color: '#C8F562' }}>
                  +{inst.offset} demi-tons
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            ChordFinder et la transposition automatique
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            ChordFinder gère entièrement cette transposition. Sélectionnez votre instrument dans
            le sélecteur en haut de l'application, et l'app affichera automatiquement les notes
            et accords dans votre tonalité d'instrument.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Exemple : vous fredonnez un Mi♭ concert dans le micro. ChordFinder détecte Mi♭ concert,
            mais si vous êtes en mode "Trompette", il affiche Fa (la note que vous devez jouer
            sur votre trompette pour sonner Mi♭ concert). L'accord affiché est aussi transposé.
          </p>
          <div className="border p-5" style={{ borderColor: '#C8F562', background: 'rgba(200,245,98,0.03)' }}>
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: '#C8F562' }}>
              Mode trompette dans ChordFinder
            </p>
            <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
              Micro détecte → Mi♭ concert<br />
              ChordFinder affiche → <strong style={{ color: '#E8E8E8' }}>Fa</strong> (note à jouer sur la trompette)<br />
              Accord suggéré → <strong style={{ color: '#E8E8E8' }}>Fa majeur</strong> (transposé Si♭)
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Conseils pratiques pour les répétitions
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Communiquer avec les autres musiciens', text: 'Quand vous parlez d\'accords avec un pianiste ou un guitariste, précisez si vous parlez en concert ou en Si♭. "Je joue Ré" peut signifier deux choses différentes.' },
              { title: 'Lire une partition de concert', text: 'Si on vous donne une partition écrite en Do concert (partition en clé de Sol non transposée), ajoutez mentalement 2 demi-tons à chaque note pour trouver ce que vous devez jouer.' },
              { title: 'Jouer à l\'oreille avec un groupe', text: 'Utilisez ChordFinder en mode Trompette : fredonnez une note du morceau, et l\'app vous dira quel accord joue votre groupe et quelle note jouer sur votre instrument.' },
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
            <Link href="/instruments/trompette" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>
                ChordFinder pour trompette
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Mode trompette Si♭ — transposition automatique</p>
            </Link>
            <Link href="/guide/trouver-accords-chanson" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>
                Trouver les accords d'une chanson
              </p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Méthode pour identifier les accords à l'oreille</p>
            </Link>
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
