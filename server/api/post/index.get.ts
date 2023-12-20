import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (_event) => {
  const posts = await prisma.post.findMany()
  return { posts }
})
