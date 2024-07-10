export interface GetPostsResponse {
  data: Post[]
  total: number
}

export interface Post {
  id: number
  content: string
  address: string | null
  userId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  assets: string[]
  likes: string[]
  comments: Comment[]
}

export interface Comment {
  id: number
  content: string
  name: string
  website: string | null
  parentName?: string
  parentWebsite?: string | null
}
