import {
	faCog,
	faLink,
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
			className="top-0 flex flex-col justify-start gap-4 p-2 overflow-hidden border-r bg-sidebar max-sm:drop-shadow-md min-w-72 md:sticky md:basis-72 h-fit md:h-screen border-r-sidebar-dark/20 print:hidden"
			id="sidebar"
		>
			<Link href="/" className="self-center md:self-start" scroll>
				<Image src={logo} alt="Satisfactory Notebook" width={280} priority />
			</Link>
			{/* Routes */}
			<div className="flex flex-col gap-1">
				{/* <Link href={'/'} className="px-2 py-1 border"> */}
				<Link href={'/'} className="font-bold flex flex-row gap-0.5 items-center hover:underline">
					<FontAwesomeIcon icon={faLink} fixedWidth />
					<>Recipes</>
				</Link>
				<Link href={'/printables'} className="font-bold flex flex-row gap-0.5 items-center hover:underline">
					<FontAwesomeIcon icon={faLink} fixedWidth />
					<>Additional Pages</>
				</Link>
			</div>

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
				<SidebarSetting name="use-decimals" label="Use Fractions" defaultValue={false} description="Conversions are hard" />
				<SidebarSetting name="hide-description" label="Show Description" defaultValue={true} description="They wrote them so show them" />
			</div>

			{/* Categories */}
			{/* <div className="flex flex-col gap-2">
				<div className="font-bold flex flex-row gap-0.5 items-center">
					<FontAwesomeIcon icon={faLayerGroup} fixedWidth />
					<span>Categories</span>
				</div>
				<div className="flex flex-row items-start gap-1 ms-4">
					<input type="checkbox" name="temp" className="h-4 leading-none" />
					<div className="flex flex-col text-sm gap-1 leading-[16px]">
						<label htmlFor="temp">Temp</label>
					</div>
				</div>
				<div className="flex flex-row items-start gap-1 ms-4">
					<input type="checkbox" name="temp" className="h-4 leading-none" />
					<div className="flex flex-col text-sm gap-1 leading-[16px]">
						<label htmlFor="temp">Temp</label>
					</div>
				</div>
			</div> */}

			{/* Print Settings */}
			<div className="flex-col hidden gap-2 md:flex">
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
