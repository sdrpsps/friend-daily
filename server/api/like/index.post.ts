import { prisma } from '~/prisma/db'
import isPostExist from '~/server/utils/isPostExist'
import { isUserExistById } from '~/server/utils/isUserExist'

export default defineEventHandler(async (event) => {
  const { postId, userId } = await readBody(event)

  let user = null
  if (userId)
    user = await isUserExistById(userId)

  await isPostExist(postId)
  await isLikeExist(postId, userId, false)

  const like = await prisma.like.create({
    data: {
      name: user ? user.name : '访客',
      post: {
        connect: {
          id: postId,
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
    message: '点赞成功',
    result: like,
  }
})
