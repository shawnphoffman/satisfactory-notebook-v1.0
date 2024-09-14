import {
	faCog,
	// faLayerGroup,
	faPrint,
} from '@awesome.me/kit-90105b07a9/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

import logo from './logo_stripes.png'
import { SidebarSetting } from './SidebarSetting'

export default function Sidebar() {
	return (
		<div
			className="flex bg-sidebar max-sm:drop-shadow-md min-w-72 md:sticky md:basis-72 overflow-hidden top-0 p-2 flex-col justify-start h-fit md:h-screen border-r border-r-sidebar-dark/20 print:hidden gap-4"
			id="sidebar"
		>
			<Link href="/" className="self-center md:self-start" scroll>
				<Image src={logo} alt="Satisfactory Notebook" width={280} priority />
			</Link>
			{/* Settings */}
			<div className="flex flex-col gap-2">
				<div className="font-bold flex flex-row gap-0.5 items-center">
					<FontAwesomeIcon icon={faCog} fixedWidth />
					<span>Settings</span>
				</div>
				{/*  */}
				<SidebarSetting name="hide-alternates" label="Show Alternate Recipes" defaultValue={true} description="Find more hard drives" />
				{/*  */}
				<SidebarSetting name="multiple-per-page" label="One Recipe Per Page" defaultValue={true} description="Waste ALL the paper" />
				{/*  */}
				<SidebarSetting
					name="hide-cycle-rates"
					label="Show Cycle Rates"
					defaultValue={true}
					description="Include per cycle inputs/outputs"
				/>
			</div>

			{/* Categories */}
			{/* <div className="flex flex-col gap-2">
				<div className="font-bold flex flex-row gap-0.5 items-center">
					<FontAwesomeIcon icon={faLayerGroup} fixedWidth />
					<span>Categories</span>
				</div>
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
			</div> */}

			{/* Print Settings */}
			<div className="flex-col gap-2 hidden md:flex">
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

			<div className="hidden md:flex flex-1 justify-end text-[11px] italic flex-col flex-wrap text-pretty leading-normal">
				Assets come from Satisfactory or from websites created and owned by Coffee Stain Studios. All copyright and registered trademarks
				present in the images are proprietary to Coffee Stain Studios.
			</div>
		</div>
	)
}
