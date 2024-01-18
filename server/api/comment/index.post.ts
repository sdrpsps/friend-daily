import { prisma } from '~/prisma/db'
import { createUserLogic } from '~/server/api/user/create.post'
import isPostExist from '~/server/utils/isPostExist'
import { isUserExistByEmail } from '~/server/utils/isUserExist'

export default defineEventHandler(async (event) => {
  const { postId, name, email, website, content, parentId } = await readBody(event)

  await isPostExist(postId)
  let user = await isUserExistByEmail(email, false)

  // 如果发表评论的用户不存在，则创建用户
  if (!user)
    user = await createUserLogic(name, email)

  const comment = await prisma.comment.create({
    data: {
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
      parent: parentId
        ? {
            connect: {
              id: parentId,
            },
          }
        : undefined,
      name,
      email,
      website,
      content,
    },
  })

  return {
    success: true,
    message: '评论成功',
    result: comment,
  }
})
