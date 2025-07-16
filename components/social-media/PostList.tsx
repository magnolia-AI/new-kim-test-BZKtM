'use client'

import { useEffect, useState } from 'react'
import { Post } from './Post'
import { type Post as PostType, type User } from '@/lib/schema'
import { getPosts } from '@/app/actions/posts'

type PostWithAuthor = PostType & {
  author: User
}

export function PostList() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const result = await getPosts()
        if (result.success) {
          setPosts(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError('Failed to load posts')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-b border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">Failed to load posts</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-500 hover:text-blue-600"
        >
          Try again
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 text-lg">No posts yet</p>
        <p className="text-gray-400 text-sm mt-2">Be the first to share something!</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
