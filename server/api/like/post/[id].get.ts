import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = event.context?.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid post id',
    })
  }

  const post = await prisma.post.findUnique({
    where: {
      id: +id,
    },
    include: {
      likes: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  return {
    data: post.likes.map(like => like.user.name),
    success: true,
  }
})
