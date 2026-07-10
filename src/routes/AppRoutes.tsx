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
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Página no encontrada</h2>
            <p className="mt-3 text-slate-600">Vuelve a la página principal para ver el listado de posts.</p>
          </div>
        }
      />
    </Routes>
  )
}
