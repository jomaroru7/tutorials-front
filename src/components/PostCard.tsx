import { Link } from 'react-router-dom'
import type { Post } from '../api/wordpress'

type PostCardProps = {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article
      className="group rounded-3xl border bg-white/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1"
      style={{
        borderColor: 'var(--jm-line)',
        boxShadow: '0 14px 35px rgb(25 20 45 / 0.08)',
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--jm-muted)]">
          <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h2 className="text-xl font-extrabold text-[var(--jm-text)] transition group-hover:text-[var(--jm-accent-2)]">
          <Link to={`/post/${post.slug}`} className="inline-flex w-full">
            {post.title.rendered}
          </Link>
        </h2>
        <div className="prose prose-sm max-w-none text-[var(--jm-muted)] prose-p:my-0" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </div>
      <Link
        to={`/post/${post.slug}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-[var(--jm-text)] transition"
        style={{ background: 'linear-gradient(115deg, rgb(207 0 255 / 0.13), rgb(127 0 255 / 0.11))' }}
      >
        Leer post
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
