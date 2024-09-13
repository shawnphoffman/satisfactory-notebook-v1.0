import { faCog, faLayerGroup, faPrint } from '@awesome.me/kit-90105b07a9/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

import logo from './logo_stripes.png'

export default function Sidebar() {
	return (
		<div
			className="flex bg-sidebar max-sm:drop-shadow-md min-w-72 md:sticky basis-72 overflow-hidden top-0 p-2 flex-col justify-start h-auto md:h-screen border-r border-r-sidebar-dark/20 print:hidden gap-4"
			id="sidebar"
		>
			<Image src={logo} alt="Satisfactory Notebook" width={280} priority className="self-center md:self-start" />
			{/* Settings */}
			<div className="flex flex-col gap-2">
				<div className="font-bold flex flex-row gap-0.5 items-center">
					<FontAwesomeIcon icon={faCog} fixedWidth />
					<span>Settings</span>
				</div>
				{/*  */}
				<div className="flex flex-row gap-1 items-start ms-4">
					<input type="checkbox" name="temp" className="h-4 leading-none" />
					<div className="flex flex-col text-sm gap-1 leading-[16px]">
						<label htmlFor="temp">Temp</label>
						<span className="italic text-xs text-background leading-none">Temp description</span>
					</div>
				</div>
				{/*  */}
				<div className="flex flex-row gap-1 items-start ms-4">
					<input type="checkbox" name="temp" className="h-4 leading-none" />
					<div className="flex flex-col text-sm gap-1 leading-[16px]">
						<label htmlFor="temp">Temp</label>
						<span className="italic text-xs text-background leading-none">Temp description</span>
					</div>
				</div>
			</div>
			{/* Categories */}
			<div className="flex flex-col gap-2">
				<div className="font-bold flex flex-row gap-0.5 items-center">
					<FontAwesomeIcon icon={faLayerGroup} fixedWidth />
					<span>Categories</span>
				</div>
				{/*  */}
				<div className="flex flex-row gap-1 items-start ms-4">
					<input type="checkbox" name="temp" className="h-4 leading-none" />
					<div className="flex flex-col text-sm gap-1 leading-[16px]">
						<label htmlFor="temp">Temp</label>
					</div>
				</div>
				<div className="flex flex-row gap-1 items-start ms-4">
					<input type="checkbox" name="temp" className="h-4 leading-none" />
					<div className="flex flex-col text-sm gap-1 leading-[16px]">
						<label htmlFor="temp">Temp</label>
					</div>
				</div>
			</div>
			{/* Print Settings */}
			<div className="flex flex-col gap-2">
				<div className="font-bold flex flex-row gap-0.5 items-center">
					<FontAwesomeIcon icon={faPrint} fixedWidth />
					<span>Print Settings</span>
				</div>
				{/*  */}
				<div className="text-sm ms-4">
					<ul className="list-disc list-outside padding ps-4">
						<li>
							<strong>Margins:</strong> Default
						</li>
						<li>
							<strong>Scale:</strong> 100
						</li>
						<li>
							<strong>Background Graphics:</strong> ✅️
						</li>
						<li>
							<strong>Headers & Footers:</strong> ⛔️
						</li>
					</ul>
				</div>
			</div>

			<div className="font-bold animate-pulse text-orange-800">
				I am currently updating the site for 1.0. Check back for additional functionality.
			</div>

			<div className="flex flex-1 justify-end text-[11px] italic flex-col flex-wrap text-pretty leading-normal">
				Assets come from Satisfactory or from websites created and owned by Coffee Stain Studios. All copyright and registered trademarks
				present in the images are proprietary to Coffee Stain Studios.
			</div>
		</div>
	)
}
