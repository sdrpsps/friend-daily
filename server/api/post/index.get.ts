import { prisma } from '~/prisma/db'

export default defineEventHandler(async (_event) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      media: true,
      likes: true,
      comments: true,
    },
  })

  return { posts }
})
