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
    return value
      .replace(/\/wp-json\/wp\/v2\/posts\/?$/i, '')
      .replace(/\/wp-json\/wp\/v2\/?$/i, '')
      .replace(/\/$/, '')
  }

  return `http://${value
    .replace(/^\/+/, '')
    .replace(/\/$/, '')
    .replace(/\/wp-json\/wp\/v2\/posts\/?$/i, '')
    .replace(/\/wp-json\/wp\/v2\/?$/i, '')}`
}

const apiBase = normalizeApiBase(import.meta.env.VITE_WP_API_BASE_URL || '')
const defaultHeaders = {
  Accept: 'application/json',
}

function buildUrl(path: string, params: Record<string, string | number | boolean> = {}) {
  const base = apiBase.endsWith('/') ? apiBase : `${apiBase}/`
  const url = new URL(path.replace(/^\/+/, ''), base)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  return url.toString()
}

function buildPostsUrls(params: Record<string, string | number | boolean> = {}) {
  return [
    buildUrl('/wp-json/wp/v2/posts', params),
    buildUrl('/index.php', { rest_route: '/wp/v2/posts', ...params }),
  ]
}

async function request<T>(urls: string[]) {
  let lastError: Error | null = null

  for (const url of urls) {
    let response: Response

    try {
      response = await fetch(url, { headers: defaultHeaders })
    } catch {
      lastError = new Error('No se pudo conectar con la API de WordPress (CORS o red)')
      continue
    }

    if (!response.ok) {
      lastError = new Error(`WordPress API error: ${response.status} ${response.statusText}`)
      continue
    }

    const body = await response.text()

    if (!body.trim()) {
      lastError = new Error('La API de WordPress respondió sin contenido JSON')
      continue
    }

    try {
      return JSON.parse(body) as T
    } catch {
      lastError = new Error('La API de WordPress respondió con un formato no válido')
    }
  }

  throw lastError ?? new Error('No se pudo cargar la respuesta de WordPress')
}

export async function getPosts(): Promise<Post[]> {
  if (!apiBase) {
    throw new Error('VITE_WP_API_BASE_URL no está definido en el entorno')
  }

  return request<Post[]>(buildPostsUrls({ per_page: 12, _embed: true }))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!apiBase) {
    throw new Error('VITE_WP_API_BASE_URL no está definido en el entorno')
  }

  const results = await request<Post[]>(buildPostsUrls({ slug, _embed: true }))

  return results.length > 0 ? results[0] : null
}
