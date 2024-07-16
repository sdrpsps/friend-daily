import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = event.context?.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid post id',
    })
  }

  const { userId } = await readBody<{ userId: number }>(event)
  const isGuest = userId === 2

  let like
  if (!isGuest) {
    like = await prisma.like.findFirst({
      where: {
        userId,
        postId: +id,
      },
    })
  }
  else {
    const likeRes = await prisma.like.findMany({
      where: {
        userId,
        postId: +id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    if (likeRes.length > 0) {
      like = likeRes[0]
    }
  }

  if (!like) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Like not found',
    })
  }

  await prisma.like.delete({
    where: {
      id: like.id,
      postId: +id,
    },
  })

  return {
    success: true,
    data: null,
  }
})
