import { prisma } from '~/prisma/db'

export default defineEventHandler(async (_event) => {
  const posts = await prisma.post.findMany({
    include: {
      User: true,
      media: true,
      likes: true,
      comments: true,
    },
  })

  // 将返回的数据中的 'User' 重命名为 'user'
  const processedPosts = posts.map(post => ({
    ...post,
    user: post.User,
    User: undefined, // 移除原有的 'User' 字段
  }))

  return { posts: processedPosts }
})
