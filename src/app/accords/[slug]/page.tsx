import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import GuitarDiagram from '@/components/GuitarDiagram';
import PianoDiagram from '@/components/PianoDiagram';
import { CHORD_PAGES, getChordBySlug, getRelatedChords } from '@/lib/chordPages';
import { getGuitarChord } from '@/lib/guitarChords';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CHORD_PAGES.map((chord) => ({ slug: chord.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chord = getChordBySlug(slug);
  if (!chord) return {};
  return {
    title: `Accord de ${chord.frenchName} : notes, diagramme guitare et piano`,
    description: chord.description,
    alternates: { canonical: `/accords/${slug}` },
    openGraph: {
      title: `Accord de ${chord.frenchName} : notes et diagrammes`,
      description: chord.description,
      url: `/accords/${slug}`,
    },
  };
}

export default async function ChordPage({ params }: Props) {
  const { slug } = await params;
  const chord = getChordBySlug(slug);
  if (!chord) notFound();

  const relatedChords = getRelatedChords(chord);
  const guitarShape = getGuitarChord(chord.symbol);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MusicComposition',
      name: chord.frenchName,
      description: chord.description,
      url: `https://chordfinder.app/accords/${slug}`,
      inLanguage: 'fr',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: chord.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  const appUrl = `/?note=${chord.root}&instrument=${chord.quality === 'majeur' ? 'guitar' : 'guitar'}`;

  return (
    <ContentLayout
      breadcrumbs={[
        { label: 'Accords', href: '/accords' },
        { label: chord.frenchName, href: `/accords/${slug}` },
      ]}
    >
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Accord · {chord.quality === 'majeur' ? 'Majeur' : 'Mineur'}
          </p>
          <h1 className="font-display mb-4" style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: '-0.03em' }}>
            Accord de {chord.frenchName}
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            {chord.description}
          </p>
        </header>

        {/* Notes */}
        <section className="mb-10">
          <h2 className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: '#555' }}>
            Notes de l'accord
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            {chord.frenchNotes.map((note, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="px-4 py-2 border font-display text-xl"
                  style={{ borderColor: '#C8F562', color: '#C8F562', fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}
                >
                  {note}
                </span>
                {i < chord.frenchNotes.length - 1 && (
                  <span className="text-xs font-mono" style={{ color: '#333' }}>–</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs font-mono mt-3" style={{ color: '#555' }}>
            Notes internationales : {chord.notes.join(' – ')}
          </p>
        </section>

        {/* Diagrams */}
        <section className="mb-10">
          <h2 className="text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#555' }}>
            Diagrammes
          </h2>
          <div className="flex flex-wrap gap-6">
            {guitarShape && (
              <div className="border p-5 inline-block" style={{ borderColor: '#2A2A2A' }}>
                <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: '#555' }}>
                  Guitare
                </p>
                <GuitarDiagram shape={guitarShape} chordName={chord.symbol} />
              </div>
            )}
            <div className="border p-5 inline-block overflow-x-auto max-w-full" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: '#555' }}>
                Piano
              </p>
              <PianoDiagram notes={chord.notes} chordName={chord.symbol} />
            </div>
          </div>
        </section>

        {/* Chord description */}
        <section className="mb-10">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Caractéristiques de l'accord de {chord.frenchName}
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            L'accord de {chord.frenchName} est une triade {chord.quality === 'majeur' ? 'majeure' : 'mineure'} composée
            de {chord.frenchNotes.length} notes : {chord.frenchNotes.join(', ')}.
            {chord.quality === 'majeur'
              ? ` Il est formé d'une tierce majeure (${chord.frenchNotes[0]}–${chord.frenchNotes[1]}) et d'une quinte juste (${chord.frenchNotes[0]}–${chord.frenchNotes[2]}). Sa sonorité est lumineuse et stable.`
              : ` Il est formé d'une tierce mineure (${chord.frenchNotes[0]}–${chord.frenchNotes[1]}) et d'une quinte juste (${chord.frenchNotes[0]}–${chord.frenchNotes[2]}). Sa sonorité est plus sombre et mélancolique.`
            }
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            En notation anglaise, cet accord s'écrit <strong style={{ color: '#E8E8E8' }}>{chord.symbol}</strong>.
            On le retrouve comme accord tonique dans la tonalité de {chord.frenchName},
            et comme accord {chord.quality === 'majeur' ? 'relatif ou pivot' : 'relatif'} dans d'autres tonalités voisines.
          </p>
        </section>

        {/* CTA to app */}
        <section className="mb-10 border p-6" style={{ borderColor: '#C8F562', background: 'rgba(200,245,98,0.03)' }}>
          <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: '#C8F562' }}>
            Détecter en temps réel
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#999' }}>
            Fredonnez ou jouez {chord.frenchName} dans votre micro — ChordFinder détecte
            instantanément la note et affiche le diagramme de doigtés.
          </p>
          <Link
            href={appUrl}
            className="inline-block text-xs font-mono tracking-widest uppercase px-4 py-2 border transition-colors duration-300 hover:bg-[rgba(200,245,98,0.1)]"
            style={{ borderColor: '#C8F562', color: '#C8F562' }}
          >
            Ouvrir ChordFinder →
          </Link>
        </section>

        {/* Related chords */}
        {relatedChords.length > 0 && (
          <section className="mb-10">
            <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
              Accords proches et relatifs
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedChords.map((related) => (
                <Link
                  key={related.slug}
                  href={`/accords/${related.slug}`}
                  className="block border p-4 text-center hover:border-[#3A3A3A] transition-colors group"
                  style={{ borderColor: '#2A2A2A' }}
                >
                  <p
                    className="font-display text-2xl mb-1 group-hover:text-[#C8F562] transition-colors"
                    style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em', color: '#E8E8E8' }}
                  >
                    {related.symbol}
                  </p>
                  <p className="text-xs font-mono" style={{ color: '#555' }}>{related.frenchName}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {chord.faqItems.map((item, i) => (
              <details
                key={i}
                className="border group"
                style={{ borderColor: '#2A2A2A' }}
              >
                <summary
                  className="px-5 py-4 text-sm font-mono cursor-pointer select-none list-none flex items-center justify-between"
                  style={{ color: '#E8E8E8' }}
                >
                  {item.q}
                  <span className="text-xs font-mono ml-4 shrink-0" style={{ color: '#555' }}>+</span>
                </summary>
                <div className="px-5 pb-5 border-t" style={{ borderColor: '#2A2A2A' }}>
                  <p className="text-sm font-mono leading-relaxed pt-4" style={{ color: '#999' }}>
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom nav */}
        <div className="border-t pt-8 flex justify-between items-center" style={{ borderColor: '#2A2A2A' }}>
          <Link
            href="/accords"
            className="text-xs font-mono transition-colors hover:text-[#E8E8E8]"
            style={{ color: '#555' }}
          >
            ← Tous les accords
          </Link>
          <Link
            href="/guide"
            className="text-xs font-mono transition-colors hover:text-[#E8E8E8]"
            style={{ color: '#555' }}
          >
            Guides musicaux →
          </Link>
        </div>
      </article>
    </ContentLayout>
  );
}
