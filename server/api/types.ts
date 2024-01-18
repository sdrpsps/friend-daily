export interface PostResponse {
  posts: PostItem[]
}

export interface PostItem {
  comments: Comment[]
  createdAt: string
  id: string
  likes: Like[]
  media: Media[]
  title: string
  type: string
  updatedAt: string
  user: User
  userId: string
}

export interface Comment {
  content: string
  createdAt: string
  email: string
  id: string
  name: string
  postId: string
  parentId: null | string
  updatedAt: string
  website: null | string
}

export interface Like {
  createdAt: string
  id: string
  name: string
  postId: string
  updatedAt: string
  userId: null | string
}

export interface Media {
  description: null
  id: string
  name: null
  postId: string
  type: string
  url: string
}

export interface User {
  email: string
  id: string
  name: string
}
