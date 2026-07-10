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
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-700">No se encontró el post solicitado.</p>
      </div>
    )
  }

  return <PostDetail post={selectedPost} />
}
