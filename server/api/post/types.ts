export interface PostsResponse {
  posts: PostItem[]
}

export interface PostItem {
  id: string
  title: string
  type: string
  createdAt: Date
  updatedAt: Date
  userId: string
  media: Media[]
  likes: any[]
  comments: any[]
  user: User
}

export interface Media {
  id: string
  name: null
  description: null
  url: string
  type: string
  postId: string
}

export interface User {
  id: string
  name: string
  email: string
}
