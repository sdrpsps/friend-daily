import process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // 创建用户
  const user1 = await prisma.user.create({
    data: {
      name: process.env.USERNAME,
      email: process.env.EMAIL,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
  })

  // 创建文章
  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      type: 'image',
      userId: user1.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      type: 'image',
      userId: user1.id,
    },
  })

  // 创建媒体
  await prisma.media.create({
    data: {
      type: 'image',
      url: 'https://picsum.photos/200/200',
      postId: post1.id,
    },
  })
  await prisma.media.create({
    data: {
      type: 'image',
      url: 'https://picsum.photos/250/250',
      postId: post2.id,
    },
  })
  await prisma.media.create({
    data: {
      type: 'image',
      url: 'https://picsum.photos/300/300',
      postId: post2.id,
    },
  })

  // 创建评论
  const comment1 = await prisma.comment.create({
    data: {
      name: 'Commenter 1',
      email: 'commenter1@example.com',
      content: 'This is a comment on the first post.',
      postId: post1.id,
      userId: user2.id,
    },
  })
  await prisma.comment.create({
    data: {
      name: 'Commenter 2',
      email: 'commenter2@example.com',
      content: 'This is a reply to the first comment.',
      postId: post1.id,
      userId: user1.id,
      parentId: comment1.id,
    },
  })
  await prisma.comment.create({
    data: {
      name: 'Commenter 3',
      email: 'commenter3@example.com',
      content: 'This is a comment on the second post.',
      postId: post2.id,
      userId: user1.id,
    },
  })
}

seed()
  .catch((error) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
