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

  await prisma.like.create({
    data: {
      postId: +id,
      userId: isGuest ? 2 : userId,
    },
  })

  return {
    success: true,
    data: null,
  }
})
