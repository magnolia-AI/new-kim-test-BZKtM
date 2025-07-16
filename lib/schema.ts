import { pgTable, serial, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// Users table for social media platform
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  bio: text('bio'),
  avatar: varchar('avatar', { length: 500 }),
  verified: boolean('verified').default(false).notNull(),
  followersCount: integer('followers_count').default(0).notNull(),
  followingCount: integer('following_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Posts table for social media content
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id).notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  likesCount: integer('likes_count').default(0).notNull(),
  repliesCount: integer('replies_count').default(0).notNull(),
  repostsCount: integer('reposts_count').default(0).notNull(),
  parentId: integer('parent_id').references(() => posts.id), // For replies
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Likes table for post interactions
export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  postId: integer('post_id').references(() => posts.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Follows table for user relationships
export const follows = pgTable('follows', {
  id: serial('id').primaryKey(),
  followerId: integer('follower_id').references(() => users.id).notNull(),
  followingId: integer('following_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;
export type Follow = typeof follows.$inferSelect;
export type NewFollow = typeof follows.$inferInsert; 
