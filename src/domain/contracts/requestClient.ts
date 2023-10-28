import { Post } from '@/domain/entities/post'

export interface RequestClient {
	getPosts(): Promise<Post[]>
	getPost(postSlug: string): Promise<Post>
	getPostSlugs(): Promise<Post[]>
}
