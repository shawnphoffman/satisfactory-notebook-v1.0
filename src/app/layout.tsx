import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { CommandPalette } from '@/components/CommandPalette'
import Sidebar from '@/components/Sidebar/Sidebar'

import { siteDescription, siteTitle, siteUrl } from './metadata'

const openSans = Open_Sans({ subsets: ['latin'] })

type Props = Readonly<{
	children: React.ReactNode
}>

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body className={`flex flex-col md:flex-row ${openSans.className} antialiased bg-background print:bg-white use-decimals`}>
				<Sidebar />
				<div className="flex w-full flex-row" id="content">
					{children}
				</div>
				<CommandPalette />
			</body>
		</html>
	)
}

export const metadata: Metadata = {
	title: siteTitle,
	description: siteDescription,
	metadataBase: siteUrl,
	authors: [{ name: 'Shawn Hoffman' }],
}
