import { prisma } from '~/prisma/db'

export async function createUserLogic(name: string, email: string) {
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  })
}

export default defineEventHandler(async (event) => {
  const { name, email } = await readBody(event)
  const user = await createUserLogic(name, email)

  return {
    success: true,
    message: '创建用户成功',
    result: user,
  }
})
