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
  likes: Like[]
  comments: Comment[]
  user: User
}

export interface Comment {
  id: string
  name: string
  email: string
  content: string
  website: null | string
  replyToId: null | string
  createdAt: Date
  updatedAt: Date
  postId: string
}

export interface Like {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  postId: string
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
