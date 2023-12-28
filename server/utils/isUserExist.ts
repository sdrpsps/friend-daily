import { prisma } from '~/prisma/db'

export default async function isUserExist(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
  catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }
}
