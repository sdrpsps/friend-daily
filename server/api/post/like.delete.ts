import { prisma } from '~/prisma/db'
import isLikeExist from '~/server/utils/isLikeExist'
import isPostExist from '~/server/utils/isPostExist'

export default defineEventHandler(async (event) => {
  const { id, userId } = await readBody(event)

  await isPostExist(id)

  const existingLike = await isLikeExist(id, userId)

  // 如果点赞记录存在，表示用户已经点赞过，进行取消点赞
  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    })

    return {
      success: true,
      message: '取消点赞成功',
      result: existingLike,
    }
  }
})
