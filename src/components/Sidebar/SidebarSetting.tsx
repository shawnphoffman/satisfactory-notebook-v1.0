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
			document.body.classList.add(name)
		} else {
			document.body.classList.remove(name)
		}
	}, [name, value])

	return (
		<div className="flex flex-row gap-1 items-start ms-4">
			<input type="checkbox" name={name} className="h-4 leading-none" checked={value} onChange={handleChange} />
			<div className="flex flex-col text-sm gap-1 leading-[16px]">
				<label htmlFor={name}>{label}</label>
				{description && <span className="italic text-xs text-background leading-none">{description}</span>}
			</div>
		</div>
	)
}
