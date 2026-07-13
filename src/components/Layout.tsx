import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-[var(--jm-text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-white/60 to-transparent" />

      <header className="sticky top-0 z-10 border-b bg-[rgb(231_231_234_/_0.8)] backdrop-blur-md" style={{ borderColor: 'var(--jm-line)' }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-[var(--jm-accent-2)]">
              Jomaroru Tutoriales
            </Link>
            <p className="text-sm text-[var(--jm-muted)]">Tutoriales sobre desarrollo web o configuración y despliegue en la nube</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">{children}</main>
    </div>
  )
}
