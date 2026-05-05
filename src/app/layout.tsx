import type { Metadata } from 'next';
import { Syne, Space_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chordfinder.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ChordFinder — Trouvez les accords en temps réel',
    template: '%s — ChordFinder',
  },
  description:
    'Fredonnez une mélodie, obtenez les accords instantanément. Guitare, piano, trompette. Transposition automatique incluse. Gratuit, sans compte.',
  keywords: ['accords', 'guitare', 'piano', 'transposition', 'trompette', 'reconnaissance musicale'],
  authors: [{ name: 'ChordFinder' }],
  creator: 'ChordFinder',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'ChordFinder',
    title: 'ChordFinder — Trouvez les accords en temps réel',
    description:
      'Fredonnez une mélodie, obtenez les accords instantanément. Guitare, piano, trompette. Transposition automatique incluse.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ChordFinder — Reconnaissance musicale en temps réel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChordFinder — Trouvez les accords en temps réel',
    description:
      'Fredonnez une mélodie, obtenez les accords instantanément. Guitare, piano, trompette.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
