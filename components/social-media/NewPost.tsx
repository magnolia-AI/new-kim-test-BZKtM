'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { ImageIcon, SmileIcon, CalendarIcon, MapPinIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { createPost } from '@/app/actions/posts'

export function NewPost() {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const result = await createPost(content.trim())
      if (result.success) {
        setContent('')
      } else {
        console.error('Failed to create post:', result.error)
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const characterLimit = 280
  const remainingChars = characterLimit - content.length
  const isOverLimit = remainingChars < 0

  return (
    <Card className="border-b border-gray-200 rounded-none">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
              <AvatarFallback>
                {user?.fullName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] text-xl placeholder:text-gray-500 border-none resize-none focus:ring-0 focus:outline-none p-0"
                maxLength={characterLimit + 50} // Allow slight overflow for UI feedback
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4 text-blue-500">
                  <button
                    type="button"
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                    disabled={isSubmitting}
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                    disabled={isSubmitting}
                  >
                    <SmileIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                    disabled={isSubmitting}
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                    disabled={isSubmitting}
                  >
                    <MapPinIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  {content.length > 0 && (
                    <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                      {remainingChars}
                    </span>
                  )}
                  <Button
                    type="submit"
                    disabled={!content.trim() || isSubmitting || isOverLimit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
