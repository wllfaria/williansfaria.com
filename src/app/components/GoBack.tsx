import Link from 'next/link'
import { ChevronLeft } from 'react-feather'

export function GoBack() {
	return (
		<Link href="/" className="text-red-500 text-sm block">
			<div className="flex gap-1 items-center">
				<ChevronLeft />
				<span className="font-bold">history.pop()</span>
			</div>
		</Link>
	)
}
