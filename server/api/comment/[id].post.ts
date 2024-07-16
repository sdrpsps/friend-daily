import { z } from 'zod'
import prisma from '~/lib/prisma'
import { registerUser } from '~/server/utils/registerUser'
import type { PostCommentResponse } from '~/types/comment'

const commentSchema = z.object({
  content: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  website: z.string().url().optional(),
  parentId: z.number().optional(),
})

export default defineEventHandler(async (event): Promise<PostCommentResponse> => {
  const id = event.context?.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid post id',
    })
  }

  const validate = await readValidatedBody(event, commentSchema.safeParse)
  if (!validate.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validate.error.errors.map(err => `${err.path.join('.')} is ${err.message}`).join(),
    })
  }

  const { name, email, website, content, parentId } = validate.data

  let user = await isUserExist(name, email)

  if (!user) {
    try {
      user = await registerUser(name, email, website)
    }
    catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Register failed',
      })
    }
  }

  try {
    await prisma.comment.create({
      data: {
        postId: +id,
        content,
        userId: user.id,
        parentId,
      },
    })

    return {
      success: true,
      data: {
        userId: user.id,
        name: user.name,
        email: user.email ? user.email : '',
        website: user.website ? user.website : '',
      },
    }
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Comment failed',
    })
  }
})
