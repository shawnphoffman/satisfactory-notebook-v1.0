export default function Temp() {
	return (
		<div className="w-full p-2 gap-2 flex flex-col">
			<h1 className="text-3xl font-bold">Satisfactory Notebook Theme</h1>
			<h2 className="text-2xl font-semibold">Colors</h2>
			<div className="flex flex-col gap-0">
				<div className="w-full h-16 bg-primary p-4 rounded flex font-medium text-xl items-center">Primary</div>
				<div className="w-full h-16 bg-primary-dark p-4 rounded flex font-medium text-xl items-center">Primary Dark</div>
				<div className="w-full h-16 bg-secondary p-4 rounded flex font-medium text-xl items-center">Secondary</div>
				<div className="w-full h-16 bg-secondary-dark p-4 rounded flex font-medium text-xl items-center">Secondary Dark</div>
				<div className="w-full h-16 bg-sidebar p-4 rounded flex font-medium text-xl items-center">Sidebar</div>
				<div className="w-full h-16 bg-sidebar-dark p-4 rounded flex font-medium text-xl items-center">Sidebar Dark</div>
			</div>
		</div>
	)
}
