import { prisma } from '~/prisma/db'

export default async function isLikeExist(postId: string, userId: string, needExist = true) {
  const likes = await prisma.like.findMany({
    where: {
      postId,
      userId: userId || undefined,
    },
    orderBy: {
      createdAt: 'desc', // 按照 createdAt 字段降序排列
    },
    take: 1, // 只取一条记录
  })

  if (needExist && !likes[0]) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Like does not exist',
    })
  }

  return likes[0]
}
