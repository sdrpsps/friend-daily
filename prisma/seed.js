import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Sunny',
    email: 'sunny@bytespark.app',
    posts: [
      {
        title: 'Join the Prisma Slack',
        type: 'image',
        media: [
          { type: 'image', url: 'https://picsum.photos/200/200' },
        ],
        likes: [],
        comments: [],
      },
      {
        title: 'Ask a question about Prisma on GitHub',
        type: 'image',
        media: [
          { type: 'image', url: 'https://picsum.photos/200/200' },
          { type: 'image', url: 'https://picsum.photos/300/200' },
        ],
        likes: [],
        comments: [],
      },
      {
        title: 'Prisma on YouTube',
        type: 'image',
        media: [
          { type: 'image', url: 'https://picsum.photos/200/200' },
          { type: 'image', url: 'https://picsum.photos/300/200' },
          { type: 'image', url: 'https://picsum.photos/250/200' },
        ],
        likes: [],
        comments: [],
      },
    ],
  },
]

async function main() {
  console.log(`Clean collection ...`)
  await clearData()

  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
      },
    })
    console.log(`Created user with id: ${user.id}`)

    for (const p of u.posts) {
      const { media, likes, comments, ...postWithoutMediaLikesComments } = p
      const post = await prisma.post.create({
        data: {
          ...postWithoutMediaLikesComments,
          userId: user.id,
        },
      })
      console.log(`Created post with id: ${post.id} for user with id: ${user.id}`)

      for (const m of media) {
        const media = await prisma.media.create({
          data: { ...m, postId: post.id },
        })
        console.log(`Created media with id: ${media.id} for post with id: ${post.id}`)
      }

      for (const l of likes) {
        const like = await prisma.like.create({
          data: { ...l, postId: post.id },
        })
        console.log(`Created like with id: ${like.id} for post with id: ${post.id}`)
      }

      for (const c of comments) {
        const comment = await prisma.comment.create({
          data: { ...c, postId: post.id },
        })
        console.log(`Created comment with id: ${comment.id} for post with id: ${post.id}`)
      }
    }
  }
  console.log(`Seeding finished.`)
}

async function clearData() {
  // 删除所有现有数据
  await prisma.comment.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
