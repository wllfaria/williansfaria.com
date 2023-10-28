import { RequestClient } from '@/domain/contracts/requestClient'
import { Post } from '@/domain/entities/post'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_POST } from './graphql/getPost'
import { GET_POST_SLUGS } from './graphql/getPostSlugs'
import { GET_POSTS } from './graphql/getPosts'

export class ApolloRequestClient implements RequestClient {
	private client = new ApolloClient({
		uri: process.env.API_URL,
		cache: new InMemoryCache(),
	})

	public async getPosts(): Promise<Post[]> {
		const { data } = await this.client.query({
			query: GET_POSTS,
		})
		return data.posts.data
	}
	public async getPost(postSlug: string): Promise<Post> {
		const { data } = await this.client.query({
			query: GET_POST,
			variables: {
				slug: postSlug,
			},
		})
		return data.posts.data[0]
	}

	public async getPostSlugs(): Promise<Post[]> {
		const { data } = await this.client.query({
			query: GET_POST_SLUGS,
		})
		return data.posts.data
	}
}
