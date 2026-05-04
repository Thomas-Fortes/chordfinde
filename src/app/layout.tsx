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

export const metadata: Metadata = {
  title: 'ChordFinder — Reconnaissance musicale',
  description:
    'Fredonnez une mélodie et obtenez les accords compatibles en temps réel. Supporte la transposition pour trompette, saxophone, clarinette et plus.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
