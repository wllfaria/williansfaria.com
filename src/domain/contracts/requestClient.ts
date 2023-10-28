import { Post } from '@/domain/entities/post'

export interface RequestClient {
	getPosts(locale: string): Promise<Post[]>
	getPost(postSlug: string, locale: string): Promise<Post>
	getPostSlugs(locale: string): Promise<Post[]>
}
