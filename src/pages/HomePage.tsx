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
      <div
        className="rounded-3xl border bg-white/90 p-6 shadow-sm sm:p-8"
        style={{
          borderColor: 'var(--jm-line)',
          boxShadow: '0 14px 35px rgb(25 20 45 / 0.06)',
        }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--jm-accent-2)]">Jomaroru</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[var(--jm-text)] sm:text-5xl">Tutoriales</h1>
        <p className="mt-4 text-[var(--jm-muted)]">Este blog será una colección de tutoriales sobre desarrollo web o configuración y despliegue en la nube.</p>
      </div>

      {status === 'loading' && <Loading />}
      {status === 'failed' && error && <ErrorMessage message={error} />}
      {status === 'succeeded' && <PostList posts={posts} />}
    </section>
  )
}
