import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const id = event.context?.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid post id',
    })
  }

  const post = await prisma.post.findUnique({
    where: {
      id: +id,
    },
    include: {
      comments: {
        select: {
          id: true,
          parentId: true,
          content: true,
          user: {
            select: {
              name: true,
              website: true,
            },
          },
          parent: {
            select: {
              user: {
                select: {
                  name: true,
                  website: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  return {
    data: post.comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      name: comment.user.name,
      website: comment.user.website,
      parentName: comment.parent?.user.name,
      parentWebsite: comment.parent?.user.website,
    })),
    success: true,
  }
})
