import { prisma } from '~/prisma/db'

export default defineEventHandler(async (_event) => {
  const posts = await prisma.post.findMany({
    include: {
      media: true,
      likes: true,
      comments: true,
    },
  })
  return { posts }
})
