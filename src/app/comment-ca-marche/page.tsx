import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'Comment ça marche — Technologie de ChordFinder',
  description: 'La technologie derrière ChordFinder : Web Audio API, détection de pitch, algorithme AMDF, Tonal.js. Tout fonctionne dans le navigateur, sans serveur.',
  alternates: { canonical: '/comment-ca-marche' },
  openGraph: {
    title: 'Comment fonctionne ChordFinder — Technologie',
    description: 'Web Audio API, détection de pitch AMDF, Tonal.js — tout dans le navigateur.',
    url: '/comment-ca-marche',
  },
};

export default function CommentCaMarchePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Comment fonctionne ChordFinder — Technologie',
    description: 'Explication technique de la détection de pitch et de l\'identification d\'accords dans ChordFinder.',
    author: { '@type': 'Organization', name: 'ChordFinder' },
    datePublished: '2026-01-01',
    dateModified: '2026-05-05',
    url: 'https://chordfinder.app/comment-ca-marche',
  };

  return (
    <ContentLayout breadcrumbs={[{ label: 'Comment ça marche', href: '/comment-ca-marche' }]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#555' }}>
            Technique
          </p>
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.02em' }}>
            Comment ça marche
          </h1>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#999' }}>
            ChordFinder est entièrement client-side : aucune donnée audio n'est envoyée sur un
            serveur. Voici la technologie derrière la détection de pitch en temps réel.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Architecture globale
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            ChordFinder est une application web construite avec Next.js et React. Toute l'analyse
            audio se fait directement dans le navigateur via la Web Audio API — aucune donnée
            audio ne quitte votre appareil.
          </p>
          <div className="border p-5 font-mono text-xs" style={{ borderColor: '#2A2A2A', background: '#111' }}>
            <p className="mb-3" style={{ color: '#C8F562' }}>Stack technique :</p>
            <div className="space-y-1.5" style={{ color: '#999' }}>
              <p><span style={{ color: '#E8E8E8' }}>Next.js 16</span> — framework React avec rendu serveur</p>
              <p><span style={{ color: '#E8E8E8' }}>Web Audio API</span> — analyse audio native du navigateur</p>
              <p><span style={{ color: '#E8E8E8' }}>pitchy.js</span> — algorithme de détection de pitch (McLeod)</p>
              <p><span style={{ color: '#E8E8E8' }}>Tonal.js</span> — théorie musicale et identification d'accords</p>
              <p><span style={{ color: '#E8E8E8' }}>Tailwind CSS 4</span> — styles utilitaires</p>
              <p><span style={{ color: '#E8E8E8' }}>TypeScript</span> — typage statique</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Étape 1 : Capture audio via Web Audio API
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Quand vous appuyez sur le bouton micro, l'application demande l'accès au microphone
            via <code style={{ color: '#C8F562' }}>navigator.mediaDevices.getUserMedia()</code>.
            Une fois accordée, un flux audio est créé et connecté à un
            <code style={{ color: '#C8F562' }}> AnalyserNode</code> de la Web Audio API.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            L'analyseur échantillonne le signal audio à une fréquence élevée (généralement 44 100 Hz)
            et expose les données brutes sous forme de tableau de flottants (Float32Array) représentant
            la forme d'onde dans le domaine temporel.
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            La visualisation en forme d'onde dans l'interface est générée en temps réel depuis ce
            même AnalyserNode, via un canvas HTML5 mis à jour à chaque frame d'animation
            (requestAnimationFrame).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Étape 2 : Détection de pitch avec pitchy.js
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            La détection de pitch (hauteur tonale) est l'étape la plus délicate. ChordFinder utilise
            <strong style={{ color: '#E8E8E8' }}> pitchy.js</strong>, qui implémente l'algorithme
            de McLeod Pitch Method (MPM). C'est un algorithme basé sur l'autocorrélation normalisée
            qui offre un bon compromis entre précision et performance.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            L'algorithme analyse la périodicité du signal audio pour estimer la fréquence
            fondamentale. Par exemple, un La concert (A4) oscillant à 440 Hz sera identifié à
            ±5 cents (1 cent = 1/100e de demi-ton), une précision largement suffisante pour
            identifier la note.
          </p>
          <div className="border p-5" style={{ borderColor: '#2A2A2A', background: '#111' }}>
            <p className="text-xs font-mono mb-2" style={{ color: '#C8F562' }}>Filtres de qualité :</p>
            <div className="space-y-1 text-xs font-mono" style={{ color: '#999' }}>
              <p>• Volume minimum : évite les faux positifs sur le bruit de fond</p>
              <p>• Clarté minimum : rejette les sons bruités ou polyphoniques</p>
              <p>• Plage de fréquences : 60 Hz – 1 100 Hz (du Mi grave au Do 5)</p>
              <p>• Stabilisation : lisse les détections successives pour éviter le papillotement</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Étape 3 : Conversion fréquence → note → accord
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Une fois la fréquence fondamentale obtenue, la conversion en note musicale se fait
            par la formule mathématique :
          </p>
          <div className="border p-4 font-mono text-xs" style={{ borderColor: '#2A2A2A', background: '#111' }}>
            <p style={{ color: '#C8F562' }}>n = 69 + 12 × log₂(f / 440)</p>
            <p className="mt-2" style={{ color: '#555' }}>où n = numéro MIDI de la note (La4 = 69), f = fréquence en Hz</p>
          </div>
          <p className="text-sm font-mono leading-relaxed mt-4 mb-4" style={{ color: '#C8C8C8' }}>
            Le numéro MIDI est ensuite converti en nom de note (C, C#, D, D#, etc.) via
            <strong style={{ color: '#E8E8E8' }}> Tonal.js</strong>, la bibliothèque de théorie
            musicale utilisée par l'application.
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            Tonal.js identifie ensuite tous les accords qui contiennent cette note, triés par
            complexité (majeur en premier, puis mineur, dominante 7e, etc.). C'est cette liste
            qui apparaît dans l'interface, avec le premier accord comme suggestion principale.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Étape 4 : Transposition pour instruments Si♭ / Mi♭
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            Si un instrument transpositeur est sélectionné (trompette, saxophone alto, etc.),
            la note concert détectée est transposée de N demi-tons avant affichage. La transposition
            est une simple addition d'intervalle sur le numéro MIDI :
          </p>
          <div className="border p-4 font-mono text-xs" style={{ borderColor: '#2A2A2A', background: '#111' }}>
            <p style={{ color: '#C8F562' }}>note_instrument = Note.transpose(note_concert, interval)</p>
            <p className="mt-2" style={{ color: '#555' }}>Trompette Si♭ : interval = "2M" (+2 demi-tons)</p>
            <p style={{ color: '#555' }}>Saxophone alto : interval = "6M" (+9 demi-tons)</p>
          </div>
          <p className="text-sm font-mono leading-relaxed mt-4" style={{ color: '#C8C8C8' }}>
            L'interface affiche les deux informations : la note concert (pour communiquer avec
            d'autres musiciens) et la note instrument (ce que le musicien joue sur son propre
            instrument).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Vie privée et données audio
          </h2>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: '#C8C8C8' }}>
            ChordFinder n'enregistre, ne stocke et ne transmet aucune donnée audio. L'analyse
            se fait entièrement dans votre navigateur, en mémoire, sans aucune persistance.
            Les données audio ne quittent jamais votre appareil.
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: '#C8C8C8' }}>
            Il n'y a aucun compte utilisateur, aucun cookie de traçage, et aucun appel réseau
            pendant l'utilisation de l'application (seulement le chargement initial des assets).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-xl mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Limitations connues
          </h2>
          <div className="space-y-3">
            {[
              { title: 'Monophonie uniquement', text: 'ChordFinder détecte une seule note à la fois (fréquence fondamentale). Il ne peut pas analyser un accord joué simultanément — il faut jouer la basse séparément.' },
              { title: 'Bruits de fond', text: 'Dans un environnement bruyant, les détections peuvent être moins précises. Utilisez un casque avec micro intégré pour de meilleurs résultats.' },
              { title: 'Instruments à attaque rapide', text: 'Les percussions et certains instruments à attaque très rapide peuvent produire des faux positifs. L\'outil est optimisé pour les sons tenus (voix, vents, cordes).' },
              { title: 'Navigateurs supportés', text: 'Web Audio API requiert un navigateur moderne : Chrome 66+, Firefox 76+, Safari 14.1+, Edge 79+. iOS Safari fonctionne mais peut nécessiter une interaction utilisateur préalable.' },
            ].map((item) => (
              <div key={item.title} className="border p-4" style={{ borderColor: '#2A2A2A' }}>
                <p className="text-sm font-mono mb-1" style={{ color: '#E8E8E8' }}>{item.title}</p>
                <p className="text-xs font-mono leading-relaxed" style={{ color: '#777' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t pt-8" style={{ borderColor: '#2A2A2A' }}>
          <h2 className="font-display text-xl mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Aller plus loin
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/guide/trouver-accords-chanson" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Trouver les accords</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Guide pratique pour utiliser ChordFinder</p>
            </Link>
            <Link href="/instruments" className="block border p-4 hover:border-[#3A3A3A] transition-colors" style={{ borderColor: '#2A2A2A' }}>
              <p className="text-sm font-display mb-1" style={{ fontFamily: 'var(--font-syne)', color: '#E8E8E8' }}>Tous les instruments</p>
              <p className="text-xs font-mono" style={{ color: '#555' }}>Guitare, piano, trompette, saxophone</p>
            </Link>
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
