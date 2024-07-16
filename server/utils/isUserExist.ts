import prisma from '~/lib/prisma'

export async function isUserExist(name: string, email: string) {
  return await prisma.user.findFirst({
    where: {
      name,
      email,
    },
  })
}
