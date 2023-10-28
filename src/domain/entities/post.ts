import { RemoteImage } from '@/domain/entities/remoteImage'
import { Tag } from '@/domain/entities/tag'

export interface Post {
	attributes: {
		title: string
		slug: string
		cover: {
			data: RemoteImage
		}
		excerpt: string
		tags: {
			data: Tag[]
		}
	}
}
