'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  HeartIcon, 
  MessageCircleIcon, 
  RepeatIcon, 
  ShareIcon, 
  MoreHorizontalIcon,
  CheckIcon
} from 'lucide-react'
import { type Post as PostType, type User } from '@/lib/schema'
import { formatDistanceToNow } from 'date-fns'
import { useUser } from '@clerk/nextjs'
import { toggleLike } from '@/app/actions/posts'

type PostWithAuthor = PostType & {
  author: User
}

interface PostProps {
  post: PostWithAuthor
}

export function Post({ post }: PostProps) {
  const { user } = useUser()
  const [isLiked, setIsLiked] = useState(false) // TODO: Get actual like status
  const [likesCount, setLikesCount] = useState(post.likesCount)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (!user || isLiking) return

    setIsLiking(true)
    try {
      const result = await toggleLike(post.id)
      if (result.success) {
        setIsLiked(result.data.liked)
        setLikesCount(result.data.likesCount)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const formatTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }

  return (
    <Card className="border-0 border-b border-gray-200 rounded-none hover:bg-gray-50/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.author.avatar || undefined} alt={post.author.displayName} />
            <AvatarFallback>
              {post.author.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">
                {post.author.displayName}
              </h3>
              {post.author.verified && (
                <CheckIcon className="w-4 h-4 text-blue-500" />
              )}
              <span className="text-gray-500">@{post.author.username}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">
                {formatTimeAgo(post.createdAt)}
              </span>
              <div className="ml-auto">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontalIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-gray-900 whitespace-pre-wrap break-words">
                {post.content}
              </p>
              {post.imageUrl && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200">
                  <img
                    src={post.imageUrl}
                    alt="Post image"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between max-w-md">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-full"
              >
                <MessageCircleIcon className="w-5 h-5" />
                <span className="text-sm">{post.repliesCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-green-500 hover:bg-green-50 p-2 rounded-full"
              >
                <RepeatIcon className="w-5 h-5" />
                <span className="text-sm">{post.repostsCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center space-x-2 p-2 rounded-full ${
                  isLiked
                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                    : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{likesCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-full"
              >
                <ShareIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
