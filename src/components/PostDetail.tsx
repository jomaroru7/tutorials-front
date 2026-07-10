import type { Post } from '../api/wordpress'

type PostDetailProps = {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{new Date(post.date).toLocaleDateString('es-ES')}</p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{post.title.rendered}</h1>
      </div>
      <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  )
}
