import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearSelectedPost, fetchPostBySlug } from '../features/posts/postsSlice'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import PostDetail from '../components/PostDetail'

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const selectedPost = useAppSelector((state) => state.posts.selectedPost)
  const status = useAppSelector((state) => state.posts.status)
  const error = useAppSelector((state) => state.posts.error)

  useEffect(() => {
    if (!slug) return
    dispatch(fetchPostBySlug(slug))
    return () => {
      dispatch(clearSelectedPost())
    }
  }, [dispatch, slug])

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'failed' && error) {
    return <ErrorMessage message={error} />
  }

  if (!selectedPost) {
    return (
      <div
        className="rounded-3xl border bg-white/90 p-8 shadow-sm"
        style={{ borderColor: 'var(--jm-line)', boxShadow: '0 14px 35px rgb(25 20 45 / 0.06)' }}
      >
        <p className="font-medium text-[var(--jm-text)]">No se encontró el post solicitado.</p>
      </div>
    )
  }

  return <PostDetail post={selectedPost} />
}
