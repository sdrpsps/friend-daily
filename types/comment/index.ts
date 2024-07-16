export interface PostCommentResponse {
  data: {
    userId: number
    name: string
    email: string
    website: string
  }
  success: boolean
}
