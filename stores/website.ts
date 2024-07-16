import { skipHydrate } from 'pinia'
import type { GetPostsResponse, Post } from '@/types/post'

export const useWebsiteStore = defineStore('websiteStore', () => {
  const postList = ref<Post[]>([])
  const pageNum = ref(1)
  const pageSize = ref(3)
  const postTotal = ref(0)
  const canLoadMore = computed(() => postList.value.length < postTotal.value)

  const currentPostId = ref<number | null>(null)
  const currentReplyId = ref<number | null>(null)

  async function onSearch() {
    const { data, total } = await $fetch<GetPostsResponse>('/api/post', {
      query: { pageNum: pageNum.value, pageSize: pageSize.value },
    })
    postList.value = [...postList.value, ...data]
    postTotal.value = total
  }

  function onLoadMore() {
    if (canLoadMore.value) {
      pageNum.value++
      onSearch()
    }
  }

  async function onUpdatePostComment(postId: number) {
    const { data } = await $fetch(`/api/comment/post/${postId}`)
    const post = postList.value.find(item => item.id === postId)
    if (post) {
      post.comments = data
    }
  }

  async function onUpdatePostLike(postId: number) {
    const { data } = await $fetch(`/api/like/post/${postId}`)
    const post = postList.value.find(item => item.id === postId)
    if (post) {
      post.likes = data
    }
  }

  return {
    postList: skipHydrate(postList),
    pageNum,
    pageSize,
    postTotal,
    canLoadMore,
    currentPostId,
    currentReplyId,
    onSearch,
    onLoadMore,
    onUpdatePostComment,
    onUpdatePostLike,
  }
})
