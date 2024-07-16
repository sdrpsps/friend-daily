import prisma from '~/lib/prisma'

export async function registerUser(name: string, email: string, website?: string) {
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        website,
      },
    })
  }
  catch (e) {
    console.error(e)
    throw new Error('Register failed')
  }
}
