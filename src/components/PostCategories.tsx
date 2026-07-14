import type { Post } from '../api/wordpress'

type PostCategoriesProps = {
  post: Post
  className?: string
}

function extractCategoryNames(post: Post): string[] {
  const embeddedTerms = post._embedded?.['wp:term'] ?? []

  const fromEmbedded = embeddedTerms
    .flat()
    .filter((term) => term.taxonomy === 'category')
    .map((term) => term.name.trim())
    .filter((name) => name.length > 0)

  if (fromEmbedded.length > 0) {
    return Array.from(new Set(fromEmbedded))
  }

  if (Array.isArray(post.categories) && post.categories.every((item) => typeof item === 'string')) {
    return Array.from(new Set(post.categories.map((name) => name.trim()).filter((name) => name.length > 0)))
  }

  return []
}

export default function PostCategories({ post, className = '' }: PostCategoriesProps) {
  const categories = extractCategoryNames(post)

  if (categories.length === 0) {
    return null
  }

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`.trim()} aria-label="Categorias del post">
      {categories.map((category) => (
        <li
          key={category}
          className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]"
          style={{
            borderColor: 'var(--jm-line)',
            background: 'linear-gradient(115deg, rgb(207 0 255 / 0.11), rgb(127 0 255 / 0.09))',
            color: 'var(--jm-text)',
          }}
        >
          {category}
        </li>
      ))}
    </ul>
  )
}
