import Link from 'next/link'

import Item from '@/components/Item'
import data from '@/data/output.json'

export default async function Home() {
	const items = Object.entries(data.items).sort(([, entry1], [, entry2]) => entry1.name.localeCompare(entry2.name))
	return (
		<>
			<div className="flex w-fit flex-row" id="content">
				<div className="flex flex-col gap-3 py-2 w-full max-w-screen-md print:max-w-full bg-white">
					{items.map(([key, value]) => (
						<Item key={key} item={value} />
					))}
				</div>
			</div>
			<div className="sticky w-fit top-0 overflow-y-scroll pl-1 text-sm text-white h-dvh font-bold leading-none print:hidden">
				{items.map(([key, value]) => (
					<Link className="block px-1 py-1.5 hover:underline" key={key} href={`#${key}`}>
						{value.name}
					</Link>
				))}
			</div>
		</>
	)
}
