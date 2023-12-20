import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: [
      {
        title: 'Join the Prisma Slack',
        content: 'https://slack.prisma.io',
      },
      {
        title: 'Ask a question about Prisma on GitHub',
        content: 'https://www.github.com/prisma/prisma/discussions',
      },
      {
        title: 'Prisma on YouTube',
        content: 'https://pris.ly/youtube',
      },
      {
        title: 'Follow Prisma on Twitter',
        content: 'https://www.twitter.com/prisma',
      },
    ],
  },
]

async function main() {
  console.log(`Clean collection ...`)
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()

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
      const post = await prisma.post.create({
        data: {
          title: p.title,
          content: p.content,
          authorId: user.id,
        },
      })
      console.log(`Created post with id: ${post.id} for user with id: ${user.id}`)
    }
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
