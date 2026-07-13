import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PostPage from '../pages/PostPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:slug" element={<PostPage />} />
      <Route
        path="*"
        element={
          <div
            className="rounded-3xl border bg-white/90 p-8 text-center shadow-sm"
            style={{ borderColor: 'var(--jm-line)', boxShadow: '0 14px 35px rgb(25 20 45 / 0.06)' }}
          >
            <h2 className="text-2xl font-extrabold text-[var(--jm-text)]">Página no encontrada</h2>
            <p className="mt-3 text-[var(--jm-muted)]">Vuelve a la página principal para ver el listado de posts.</p>
          </div>
        }
      />
    </Routes>
  )
}
