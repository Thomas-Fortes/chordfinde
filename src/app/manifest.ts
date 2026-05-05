import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ChordFinder',
    short_name: 'ChordFinder',
    description: 'Trouvez les accords en temps réel — fredonnez, détectez, jouez.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080808',
    theme_color: '#C8F562',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    categories: ['music', 'utilities', 'education'],
    lang: 'fr',
  };
}
