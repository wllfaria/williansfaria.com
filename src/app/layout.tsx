import { LiterataFont } from '@/app/styles/fonts'
import '@/app/styles/globals.css'

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={`${LiterataFont.className} dark`}>
			<body>{children}</body>
		</html>
	)
}
