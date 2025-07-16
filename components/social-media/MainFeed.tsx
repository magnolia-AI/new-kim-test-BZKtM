'use client';

import { NewPost } from './NewPost';
import { PostList } from './PostList';
import { Separator } from '@/components/ui/separator';

export function MainFeed() {
  return (
    <div className="h-full">
      {/* Feed Header */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
      </div>

      {/* New Post */}
      <div className="border-b border-border">
        <NewPost />
      </div>

      {/* Posts Feed */}
      <PostList />
    </div>
  );
}
