export type Post = {
  id: number
  slug: string
  date: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>
    author?: Array<{ name: string }>
  }
}

function normalizeApiBase(rawValue: string) {
  const value = rawValue.trim()

  if (!value) {
    return ''
  }

  if (/^https?:\/\//i.test(value)) {
    return value.replace(/\/$/, '')
  }

  return `http://${value.replace(/^\/+/, '').replace(/\/$/, '')}`
}

const apiBase = normalizeApiBase(import.meta.env.VITE_WP_API_BASE_URL || '')
const defaultHeaders = {
  'Content-Type': 'application/json',
}

function buildUrl(path: string, params: Record<string, string | number | boolean> = {}) {
  const base = apiBase.endsWith('/') ? apiBase : `${apiBase}/`
  const url = new URL(path.replace(/^\/+/, ''), base)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  return url.toString()
}

async function request<T>(url: string) {
  const response = await fetch(url, { headers: defaultHeaders })

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}

export async function getPosts(): Promise<Post[]> {
  if (!apiBase) {
    throw new Error('VITE_WP_API_BASE_URL no está definido en el entorno')
  }

  return request<Post[]>(
    buildUrl('/wp-json/wp/v2/posts', {
      per_page: 12,
      _embed: true,
    }),
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!apiBase) {
    throw new Error('VITE_WP_API_BASE_URL no está definido en el entorno')
  }

  const results = await request<Post[]>(
    buildUrl('/wp-json/wp/v2/posts', {
      slug,
      _embed: true,
    }),
  )

  return results.length > 0 ? results[0] : null
}
