import type { Post } from '../api/wordpress'
import PostCard from './PostCard'

type PostListProps = {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
