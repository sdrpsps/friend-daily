import { prisma } from '~/prisma/db'

export async function isUserExistById(id: string, needThrow = true) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user && needThrow) {
    throw createError({
      statusCode: 404,
      statusMessage: '用户不存在',
    })
  }

  return user
}

export async function isUserExistByEmail(email: string, needThrow = true) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user && needThrow) {
    throw createError({
      statusCode: 404,
      statusMessage: '用户不存在',
    })
  }

  return user
}
