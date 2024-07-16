import prisma from '~/lib/prisma'
import type { GetPostsResponse } from '~/types/post'

export default defineEventHandler(async (event): Promise<GetPostsResponse> => {
  const { pageNum, pageSize } = getQuery<{ pageNum: string, pageSize: string }>(event)

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: 1,
      },
      include: {
        assets: {
          select: {
            url: true,
          },
        },
        likes: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
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
      take: +pageSize,
      skip: (+pageNum - 1) * +pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.post.count()
    const data = posts.map(post => ({
      ...post,
      likes: post.likes.map(like => like.user.name),
      assets: post.assets.map(asset => asset.url),
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        name: comment.user.name,
        website: comment.user.website,
        parentName: comment.parent?.user.name,
        parentWebsite: comment.parent?.user.website,
      })),
    }))

    return {
      data,
      total,
      success: true,
    }
  }
  catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: 'Something bad happened on the server',
    })
  }
})
