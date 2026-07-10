import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="text-2xl font-semibold tracking-tight text-slate-900">
              Headless WP Front
            </Link>
            <p className="text-sm text-slate-500">Listado de posts y detalle usando la API de WordPress</p>
          </div>
          <nav className="flex gap-3 text-sm text-slate-600">
            <Link to="/" className="rounded-full border border-slate-200 px-4 py-2 transition hover:border-slate-300 hover:bg-slate-50">
              Posts
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
