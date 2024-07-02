<script setup lang="ts">
import Post from '@/components/Post/Post.vue'

defineOptions({
  name: 'FriendDaily',
})

const currentState = ref({
  post: null,
  reply: null,
})

const postList = ref([
  {
    id: 1,
    name: '狗中狗',
    content: '今天的我排位输了好多把，我将这些事情分享给您，但是你一个字都没有讲，我在想你是不是在忙？我头痛欲裂，终于在我给你发了几十条消息之后，你终于回了我一个脑子是不是有病？原来你还是关心我的，看到这句话，我的脑子一下就不疼了，今天也是爱你的一天',
    date: '2024-06-30 15:00:00',
    address: '蔡徐村 · 村口',
    likes: [
      {
        id: 1,
        name: '汪汪',
      },
      {
        id: 2,
        name: '汪汪2',
      },
    ],
    comments: [
      {
        id: 1,
        name: '汪汪',
        website: 'https://baidu.com',
        content: '和他退房了吗？可以回我消息了吗？',
      },
      {
        id: 2,
        name: '汪汪2',
        website: 'https://baidu.com',
        content: '今天保安队长心情不好拿我撒气，因为他不会唱惊雷，他的女神很生气的骂他说他不懂潮流不懂时尚，所以队长冲我吼了一天惊雷，这通天修为天塌地陷紫金锤我委屈，我想你。',
      },
    ],
  },
  {
    id: 2,
    name: '狗中狗',
    content: '今天你终于都我说了“喜欢”这个词，我等了好久了。你对我说：“我喜欢的人不是你”。我知道你是在考验我，宝贝我会一直等你的。',
    date: '2024-06-29 15:00:00',
    address: '蔡徐村 · 村口',
    likes: [
      {
        id: 1,
        name: '汪汪',
      },
      {
        id: 2,
        name: '汪汪2',
      },
    ],
  },
  {
    id: 3,
    name: '狗中狗',
    content: '天上的月亮，亮也没用，没用也亮；我喜欢你，喜欢也没用，没用也喜欢。',
    date: '2024-06-28 15:00:00',
    address: '蔡徐村 · 村口',
  },
  {
    id: 4,
    name: '狗中狗',
    content: '今天一个女孩子对我表白说喜欢我，可是我的心里只有你啊，我立马拒绝了她，她说她不会放弃的，我的心里只有你一个人啊，不会答应她的。',
    date: '2024-06-27 15:00:00',
    address: '蔡徐村 · 村口',
  },
  {
    id: 5,
    name: '狗中狗',
    content: '今天一大早就去帮她海底捞排队，她男朋友想吃海底捞，我要是去晚了的话排不上队，她男朋友吃不上海底捞的话又该骂她，我怕她扛不住，她男朋友骂人很凶的.',
    date: '2024-06-26 15:00:00',
    address: '蔡徐村 · 村口',
  },
])
</script>

<template>
  <Post
    v-for="item in postList"
    :key="item.id"
    v-model:current-post="currentState.post"
    v-model:current-reply="currentState.reply"
    :data="item"
  />
</template>
