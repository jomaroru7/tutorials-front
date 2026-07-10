import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPostBySlug, getPosts } from '../../api/wordpress'
import type { Post } from '../../api/wordpress'

export type PostsState = {
  posts: Post[]
  selectedPost: Post | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return getPosts()
})

export const fetchPostBySlug = createAsyncThunk('posts/fetchPostBySlug', async (slug: string) => {
  const post = await getPostBySlug(slug)
  if (!post) {
    throw new Error(`No se encontró el post con slug: ${slug}`)
  }
  return post
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null
      state.error = null
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al cargar posts'
      })
      .addCase(fetchPostBySlug.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedPost = action.payload
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al cargar el post'
      })
  },
})

export const { clearSelectedPost } = postsSlice.actions
export default postsSlice.reducer
