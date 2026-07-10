import { Link } from 'react-router-dom'
import type { Post } from '../api/wordpress'

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 transition group-hover:text-slate-700">
          <Link to={`/post/${post.slug}`} className="inline-flex w-full">
            {post.title.rendered}
          </Link>
        </h2>
        <div className="prose prose-sm max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </div>
      <Link
        to={`/post/${post.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
      >
        Leer post
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
