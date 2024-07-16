/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  try {
    await prisma.user.createMany({
      data: [
        { name: '唔精神', email: 'sunny@bytespark.me', website: 'https://bytespark.me' },
        { name: '访客', email: '', website: '' },
        { name: '汪汪', email: 'dog@example.com', website: 'https://example.com' },
        { name: '呱呱', email: 'frog@example2.com', website: 'https://example2.com' },
        { name: '喵喵', email: 'cat@example3.com', website: 'https://example3.com' },
      ],
    })

    await prisma.post.createMany({
      data: [
        {
          id: 1,
          userId: 1,
          content: '今天的我排位输了好多把，我将这些事情分享给您，但是你一个字都没有讲，我在想你是不是在忙？我头痛欲裂，终于在我给你发了几十条消息之后，你终于回了我一个脑子是不是有病？原来你还是关心我的，看到这句话，我的脑子一下就不疼了，今天也是爱你的一天',
          createdAt: '2024-06-30T15:00:00Z',
          address: '芳村 · 精神病院',
        },
        {
          id: 2,
          userId: 1,
          content: '今天你终于都我说了“喜欢”这个词，我等了好久了。你对我说：“我喜欢的人不是你”。我知道你是在考验我，宝贝我会一直等你的。',
          createdAt: '2024-06-29T15:00:00Z',
          address: '芳村 · 精神病院',
        },
        {
          id: 3,
          userId: 1,
          content: '天上的月亮，亮也没用，没用也亮；我喜欢你，喜欢也没用，没用也喜欢。',
          createdAt: '2024-06-28T15:00:00Z',
          address: '芳村 · 精神病院',
        },
        {
          id: 4,
          userId: 1,
          content: '今天一个女孩子对我表白说喜欢我，可是我的心里只有你啊，我立马拒绝了她，她说她不会放弃的，我的心里只有你一个人啊，不会答应她的。',
          createdAt: '2024-06-27T15:00:00Z',
          address: '芳村 · 精神病院',
        },
        {
          id: 5,
          userId: 1,
          content: '今天一大早就去帮她海底捞排队，她男朋友想吃海底捞，我要是去晚了的话排不上队，她男朋友吃不上海底捞的话又该骂她，我怕她扛不住，她男朋友骂人很凶的.',
          createdAt: '2024-06-26T15:00:00Z',
          address: '芳村 · 精神病院',
        },
      ],
    })

    await prisma.like.createMany({
      data: [
        { userId: 2, postId: 1 },
        { userId: 3, postId: 1 },
        { userId: 4, postId: 2 },
      ],
    })

    await prisma.comment.createMany({
      data: [
        { content: '和他退房了吗？可以回我消息了吗？', postId: 1, userId: 2 },
        { content: '今天保安队长心情不好拿我撒气，因为他不会唱惊雷，他的女神很生气的骂他说他不懂潮流不懂时尚，所以队长冲我吼了一天惊雷，这通天修为天塌地陷紫金锤我委屈，我想你。', postId: 1, userId: 3 },
        { content: '鸡你太美', postId: 2, userId: 4 },
        { content: '小黑子，鸡毙你', postId: 2, userId: 3, parentId: 3 },
      ],
    })

    await prisma.asset.createMany({
      data: [
        { url: 'https://picsum.photos/900/900', postId: 1 },
        { url: 'https://picsum.photos/200/300', postId: 2 },
        { url: 'https://picsum.photos/900/900', postId: 2 },
        { url: 'https://picsum.photos/200/300', postId: 3 },
        { url: 'https://picsum.photos/900/900', postId: 3 },
        { url: 'https://picsum.photos/1920/1080', postId: 3 },
        { url: 'https://picsum.photos/200/300', postId: 4 },
        { url: 'https://picsum.photos/900/900', postId: 4 },
      ],
    })

    console.log('Data seeded successfully')
  }
  catch (error) {
    console.error('Error seeding data:', error)
  }
  finally {
    await prisma.$disconnect()
  }
}

seed()
