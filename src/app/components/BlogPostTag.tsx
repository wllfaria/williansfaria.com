import { Tag } from '@/domain/entities/tag'

interface BlogPostTagProps {
	tag: Tag
}

export function BlogPostTag({ tag }: BlogPostTagProps) {
	return (
		<span
			className={`${
				tag.attributes.color ? '' : 'bg-red-500'
			} inline-block rounded-full px-4 py-1 text-xs text-gray-100 mr-2`}
			style={{ backgroundColor: tag.attributes.color }}
		>
			{tag.attributes.name}
		</span>
	)
}
