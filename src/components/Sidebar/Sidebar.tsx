import Image from 'next/image'

import logo from './logo_stripes.png'

export default function Sidebar() {
	return (
		<div
			className="flex bg-sidebar max-sm:drop-shadow-md min-w-72 md:sticky top-0 p-2 flex-col justify-start h-auto md:h-screen border-r border-r-sidebar-dark/20 print:hidden"
			id="sidebar"
		>
			<Image src={logo} alt="Satisfactory Notebook" width={280} priority className="self-center md:self-start" />
		</div>
	)
}
