'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SearchIcon, TrendingUpIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

const trendingTopics = [
  { topic: '#NextJS', posts: '125K posts' },
  { topic: '#WebDevelopment', posts: '89K posts' },
  { topic: '#TypeScript', posts: '67K posts' },
  { topic: '#React', posts: '234K posts' },
  { topic: '#TailwindCSS', posts: '45K posts' },
]

const suggestedUsers = [
  {
    id: 1,
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: false,
    bio: 'Frontend Developer'
  },
  {
    id: 2,
    username: 'sarahsmith',
    displayName: 'Sarah Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=150&h=150&fit=crop&crop=face',
    verified: true,
    bio: 'UI/UX Designer'
  },
  {
    id: 3,
    username: 'mikejohnson',
    displayName: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: false,
    bio: 'Full Stack Engineer'
  },
]

export function RightSidebar() {
  return (
    <div className="w-80 p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search"
          className="pl-12 bg-gray-100 border-none rounded-full focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Trending */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold flex items-center">
            <TrendingUpIcon className="w-5 h-5 mr-2" />
            What's happening
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingTopics.map((trend, index) => (
              <div
                key={index}
                className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{trend.topic}</p>
                    <p className="text-sm text-gray-500">{trend.posts}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full justify-start text-blue-500 p-2">
              Show more
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Who to follow */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold">Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} alt={user.displayName} />
                    <AvatarFallback>
                      {user.displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {user.displayName}
                      </p>
                      {user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                    <p className="text-xs text-gray-400 truncate">{user.bio}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-full px-4">
                  Follow
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="w-full justify-start text-blue-500 p-2">
              Show more
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-gray-500 space-y-2">
        <div className="flex flex-wrap gap-2">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Ads info</a>
          <a href="#" className="hover:underline">More</a>
        </div>
        <p>© 2024 Social Media Platform</p>
      </div>
    </div>
  )
}
