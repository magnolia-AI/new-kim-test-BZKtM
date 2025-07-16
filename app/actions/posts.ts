'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import db from '@/lib/db'
import { posts, users, likes } from '@/lib/schema'
import { eq, desc, and } from 'drizzle-orm'

export type ActionResult<T = any> = {
  success: true
  data: T
} | {
  success: false
  error: string
}

export async function createPost(content: string): Promise<ActionResult<any>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Authentication required' }
    }

    if (!content.trim()) {
      return { success: false, error: 'Content is required' }
    }

    if (content.length > 280) {
      return { success: false, error: 'Content must be 280 characters or less' }
    }

    // Get or create user in our database
    let user = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    
    if (user.length === 0) {
      // Create user if doesn't exist
      const { user: clerkUser } = await auth()
      if (!clerkUser) {
        return { success: false, error: 'User not found' }
      }

      const newUser = await db.insert(users).values({
        clerkId: userId,
        username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] || 'user',
        displayName: clerkUser.fullName || clerkUser.emailAddresses[0]?.emailAddress || 'User',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        avatar: clerkUser.imageUrl,
      }).returning()
      
      user = newUser
    }

    // Create the post
    const newPost = await db.insert(posts).values({
      content: content.trim(),
      authorId: user[0].id,
    }).returning()

    revalidatePath('/')
    return { success: true, data: newPost[0] }
  } catch (error) {
    console.error('Error creating post:', error)
    return { success: false, error: 'Failed to create post' }
  }
}

export async function getPosts(): Promise<ActionResult<any[]>> {
  try {
    const postsWithAuthors = await db
      .select({
        id: posts.id,
        content: posts.content,
        authorId: posts.authorId,
        imageUrl: posts.imageUrl,
        likesCount: posts.likesCount,
        repliesCount: posts.repliesCount,
        repostsCount: posts.repostsCount,
        parentId: posts.parentId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        author: {
          id: users.id,
          clerkId: users.clerkId,
          username: users.username,
          displayName: users.displayName,
          email: users.email,
          bio: users.bio,
          avatar: users.avatar,
          verified: users.verified,
          followersCount: users.followersCount,
          followingCount: users.followingCount,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        }
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt))
      .limit(50)

    return { success: true, data: postsWithAuthors }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { success: false, error: 'Failed to fetch posts' }
  }
}

export async function toggleLike(postId: number): Promise<ActionResult<{ liked: boolean; likesCount: number }>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Authentication required' }
    }

    // Get user from our database
    const user = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
    if (user.length === 0) {
      return { success: false, error: 'User not found' }
    }

    // Check if user already liked this post
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, user[0].id), eq(likes.postId, postId)))
      .limit(1)

    let liked = false
    
    if (existingLike.length > 0) {
      // Unlike the post
      await db.delete(likes).where(and(eq(likes.userId, user[0].id), eq(likes.postId, postId)))
      await db.update(posts).set({
        likesCount: db.select({ count: likes.id }).from(likes).where(eq(likes.postId, postId))
      }).where(eq(posts.id, postId))
      liked = false
    } else {
      // Like the post
      await db.insert(likes).values({
        userId: user[0].id,
        postId: postId,
      })
      liked = true
    }

    // Get updated likes count
    const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1)
    const likesCount = await db.select().from(likes).where(eq(likes.postId, postId))

    // Update the post's likes count
    await db.update(posts).set({
      likesCount: likesCount.length
    }).where(eq(posts.id, postId))

    revalidatePath('/')
    return { 
      success: true, 
      data: { 
        liked, 
        likesCount: likesCount.length 
      } 
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return { success: false, error: 'Failed to toggle like' }
  }
}
