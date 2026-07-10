import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchPosts } from '../features/posts/postsSlice'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import PostList from '../components/PostList'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.posts.posts)
  const status = useAppSelector((state) => state.posts.status)
  const error = useAppSelector((state) => state.posts.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Headless WordPress</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Listado de posts</h1>
        <p className="mt-4 max-w-2xl text-slate-600">Conecta directamente con la API REST de WordPress y muestra los posts para navegación en el frontend.</p>
      </div>

      {status === 'loading' && <Loading />}
      {status === 'failed' && error && <ErrorMessage message={error} />}
      {status === 'succeeded' && <PostList posts={posts} />}
    </section>
  )
}
