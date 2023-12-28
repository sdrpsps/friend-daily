import { prisma } from '~/prisma/db'
import isPostExist from '~/server/utils/isPostExist'
import isUserExist from '~/server/utils/isUserExist'

export default defineEventHandler(async (event) => {
  const { id, userId } = await readBody(event)

  let user = null
  if (userId)
    user = await isUserExist(userId)

  await isPostExist(id)
  await isLikeExist(id, userId, false)

  const like = await prisma.like.create({
    data: {
      name: user ? user.name : '访客',
      post: {
        connect: {
          id,
        },
      },
      user: userId
        ? {
            connect: {
              id: userId,
            },
          }
        : undefined, // Connect user only if userId exists
    },
  })

  return {
    success: true,
    message: 'ok',
    result: like,
  }
})
