'use client'

import { useEffect, useState } from 'react'

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
		console.log(`Setting ${name} is ${value}`)
		if (!value) {
			document.body.className = `${document.body.className} ${name}`
		} else {
			document.body.className = document.body.className.replace(name, '')
			// document.body.classList.remove(name)
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
