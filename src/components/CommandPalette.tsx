'use client'

import './CommandPalette.css'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'

import data from '@/data/output.json'

import ItemImage from './ItemImage'

export function CommandPalette() {
	const router = useRouter()
	const listRef = useRef<HTMLDivElement>(null)

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

	// const scrollUp = useCallback((value: string) => {
	const scrollUp = useCallback(() => {
		// if (value === "") {
		requestAnimationFrame(() => {
			listRef.current?.scrollTo({ top: 0 })
		})
		// }
	}, [])

	const handleSelect = useCallback(
		(item: string) => {
			router.push(`#${item}`)
			setOpen(false)
		},
		[router]
	)

	return (
		<Command.Dialog open={open} onOpenChange={setOpen} className="vercel">
			<Command.Input onValueChange={scrollUp} />

			<Command.List ref={listRef}>
				{items.map(([key, value]) => (
					<Command.Item key={key} keywords={[value.name]} value={key} onSelect={handleSelect}>
						<span>{value.name}</span>
						<ItemImage itemClass={value.className} width={36} height={36} />
					</Command.Item>
				))}
				{/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}
				<Command.Empty>Try again, Pioneer...</Command.Empty>
				{/* <Command.Group heading="Fruits"> */}
				{/* <Command.Separator /> */}
				{/* </Command.Group> */}
			</Command.List>
		</Command.Dialog>
	)
}
