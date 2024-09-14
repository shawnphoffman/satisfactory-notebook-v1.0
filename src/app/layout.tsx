import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { CommandPalette } from '@/components/CommandPalette'
import Sidebar from '@/components/Sidebar/Sidebar'

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

const siteTitle = 'Satisfactory Notebook'
export const metadata: Metadata = {
	title: siteTitle,
	description: 'A Satisfactory companion for those that prefer to print things out.',
}
