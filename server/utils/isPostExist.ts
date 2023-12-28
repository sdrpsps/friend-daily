import { prisma } from '~/prisma/db'

export default async function isPostExist(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    })

    return post
  }
  catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }
}
