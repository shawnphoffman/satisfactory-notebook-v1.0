'use client'

import './CommandPalette.css'

import { useCallback, useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'

import data from '@/data/output.json'

import ItemImage from './ItemImage'

export function CommandPalette() {
	const router = useRouter()

	const items = Object.entries(data.items).sort(([, entry1], [, entry2]) => entry1.name.localeCompare(entry2.name))

	const [open, setOpen] = useState(false)

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e: any) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	const handleSelect = useCallback(
		(item: string) => {
			setOpen(false)
			router.push(`#${item}`)
		},
		[router]
	)

	return (
		<Command.Dialog open={open} onOpenChange={setOpen} className="vercel">
			<Command.Input />

			<Command.List>
				{items.map(([key, value]) => (
					<Command.Item key={key} keywords={[value.name]} value={key} onSelect={handleSelect}>
						<span>{value.name}</span>
						<ItemImage itemClass={value.className} alt={value.name} width={36} height={36} />
					</Command.Item>
				))}
				{/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}
				<Command.Empty>No results found.</Command.Empty>
				{/* <Command.Group heading="Fruits"> */}
				{/* <Command.Separator /> */}
				{/* </Command.Group> */}
			</Command.List>
		</Command.Dialog>
	)
}
