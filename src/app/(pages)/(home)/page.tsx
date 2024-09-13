import Item from '@/components/Item'
import data from '@/data/output.json'

export default async function Home() {
	const items = Object.entries(data.items).sort(([, entry1], [, entry2]) => entry1.name.localeCompare(entry2.name))
	return (
		<div className="flex flex-col gap-3 py-2 w-full max-w-screen-md print:max-w-full bg-white">
			{items.map(([key, value]) => (
				<Item key={key} item={value} />
			))}
		</div>
	)
}
