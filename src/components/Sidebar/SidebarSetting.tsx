'use client'

import { useEffect, useState } from 'react'

// NOTE - It's probably good to add default-false classes to the layout to avoid flashing

export function SidebarSetting({
	name,
	label,
	defaultValue,
	description,
}: {
	name: string
	label: string
	defaultValue: boolean
	description?: string
}) {
	const [value, setValue] = useState(defaultValue)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.checked)
	}

	useEffect(() => {
		// console.log(`Setting ${name} is ${value}`)
		if (!value && document.body.className.indexOf(name) === -1) {
			document.body.className = `${document.body.className} ${name}`
		} else if (value) {
			document.body.className = document.body.className.replace(name, '')
		}
	}, [name, value])

	return (
		<label className="flex flex-row gap-1 items-start ms-4 cursor-pointer pointer-events-auto">
			<input type="checkbox" id={name} className="h-4 leading-none" checked={value} onChange={handleChange} />
			<div className="flex flex-col text-sm gap-1 leading-[16px]">
				<div>{label}</div>
				{description && <span className="italic text-xs text-background leading-none">{description}</span>}
			</div>
		</label>
	)
}
