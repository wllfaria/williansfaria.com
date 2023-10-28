import Link from 'next/link'
import { ChevronLeft } from 'react-feather'
import { i18n } from '../i18n'

export function GoBack({ locale }: { locale: string }) {
	return (
		<Link href={locale === i18n.defaultLocale ? '/' : `/${locale}`} className="text-red-500 text-sm block">
			<div className="flex gap-1 items-center">
				<ChevronLeft />
				<span className="font-bold">history.pop()</span>
			</div>
		</Link>
	)
}
