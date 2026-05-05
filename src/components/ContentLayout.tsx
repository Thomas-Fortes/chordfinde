import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
}

interface Props {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

export default function ContentLayout({ children, breadcrumbs }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#080808', color: '#E8E8E8' }}>
      {/* Top nav */}
      <nav
        className="border-b"
        style={{ borderColor: '#2A2A2A' }}
        aria-label="Navigation principale"
      >
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/"
            className="font-display text-sm uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-syne)', letterSpacing: '0.15em', color: '#C8F562' }}
          >
            ChordFinder
          </Link>
          <div className="flex gap-6 text-xs font-mono tracking-wider" style={{ color: '#555' }}>
            <Link href="/guide" className="hover:text-[#E8E8E8] transition-colors">Guides</Link>
            <Link href="/accords" className="hover:text-[#E8E8E8] transition-colors">Accords</Link>
            <Link href="/instruments" className="hover:text-[#E8E8E8] transition-colors">Instruments</Link>
            <Link href="/comment-ca-marche" className="hover:text-[#E8E8E8] transition-colors">Comment ça marche</Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="max-w-3xl mx-auto px-5 pt-4">
          <ol className="flex items-center gap-2 text-xs font-mono" style={{ color: '#555' }} aria-label="Fil d'Ariane">
            <li>
              <Link href="/" className="hover:text-[#E8E8E8] transition-colors">Accueil</Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {i === breadcrumbs.length - 1 ? (
                  <span style={{ color: '#E8E8E8' }}>{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-[#E8E8E8] transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-5 py-10">
        {children}
      </main>

      {/* Footer CTA */}
      <footer className="border-t mt-16" style={{ borderColor: '#2A2A2A' }}>
        <div className="max-w-3xl mx-auto px-5 py-12 text-center">
          <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: '#555' }}>
            Essayez l'application
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 border text-sm font-mono tracking-widest uppercase transition-all duration-300 hover:-translate-y-px"
            style={{ borderColor: '#C8F562', color: '#C8F562' }}
          >
            Détecter un accord en temps réel →
          </Link>
          <p className="text-xs font-mono mt-6" style={{ color: '#555' }}>
            Gratuit · Sans compte · Fonctionne sur tous les navigateurs modernes
          </p>
          <nav className="flex justify-center gap-6 mt-8 text-xs font-mono" style={{ color: '#555' }} aria-label="Navigation secondaire">
            <Link href="/guide" className="hover:text-[#E8E8E8] transition-colors">Guides</Link>
            <Link href="/accords" className="hover:text-[#E8E8E8] transition-colors">Accords</Link>
            <Link href="/instruments" className="hover:text-[#E8E8E8] transition-colors">Instruments</Link>
            <Link href="/comment-ca-marche" className="hover:text-[#E8E8E8] transition-colors">Comment ça marche</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
