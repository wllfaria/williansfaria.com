import '@/app/styles/globals.css'
import { LiterataFont } from '@/app/styles/fonts'

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={`${LiterataFont.className}`}>
			<body className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
				<div className="max-w-2xl mx-auto">{children}</div>
			</body>
		</html>
	)
}
