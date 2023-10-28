import { AlegreyaFont } from '@/app/styles/fonts'
import { Socials } from '@/domain/enums/socials'
import { GitHub, Linkedin, Twitter } from 'react-feather'

export function Footer() {
	const socialIcons = (iconName: string) => {
		const iconsMap: { [key: string]: JSX.Element } = {
			Github: <GitHub className="text-red-500" />,
			Twitter: <Twitter className="text-red-500" />,
			Linkedin: <Linkedin className="text-red-500" />,
		}
		return iconsMap[iconName]
	}

	return (
		<footer className="mt-6 pb-12">
			<hr />
			<h1 className={`${AlegreyaFont.className} font-black text-2xl text-red-500 mt-4`}>Catch me online</h1>
			<ul className="flex flex-col sm:flex-row gap-6 mt-4">
				{Object.entries(Socials).map(([name, url]) => (
					<li key={name}>
						<a href={url} target="_blank">
							<div className="flex items-center gap-2">
								{socialIcons(name)}
								{name}
							</div>
						</a>
					</li>
				))}
			</ul>
		</footer>
	)
}
