import { Link } from 'react-router-dom'
import type { Post } from '../api/wordpress'

type PostDetailProps = {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <article
      className="space-y-6 rounded-3xl border bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8"
      style={{
        borderColor: 'var(--jm-line)',
        boxShadow: '0 18px 40px rgb(25 20 45 / 0.08)',
      }}
    >
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-[var(--jm-text)] transition hover:-translate-y-0.5"
          style={{
            borderColor: 'var(--jm-line)',
            background: 'linear-gradient(120deg, rgb(207 0 255 / 0.12), rgb(127 0 255 / 0.08))',
          }}
        >
          <span aria-hidden="true">←</span>
          Volver al inicio
        </Link>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--jm-accent-2)]">{new Date(post.date).toLocaleDateString('es-ES')}</p>
        <h1 className="text-3xl font-extrabold leading-tight text-[var(--jm-text)] sm:text-4xl">{post.title.rendered}</h1>
      </div>
      <div
        className="post-content max-w-none text-[var(--jm-text)]"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  )
}
