import { faDiscDrive, faHand, faScrewdriverWrench, faTransformerBolt } from '@awesome.me/kit-90105b07a9/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

import cover from '@/images/cover.png'

export default function Page() {
	return (
		<div className="flex flex-col w-full max-w-screen-md gap-3 px-2 py-2 bg-white print:max-w-full">
			<div className="print:hidden">
				<h1 className="text-3xl font-bold">Additional Pages</h1>
				<p>Print this page for some additional pages for your notebook.</p>
			</div>
			{/* Cover */}
			<div className="flex flex-col w-full h-fit print:h-[90dvh] print:m-auto print:items-center justify-center print:max-w-[80%] break-after-page">
				<h2 className="text-2xl font-bold print:hidden">Cover Page</h2>
				<div className="gap-4 text-center auto-rows-max w-fit ">
					<Image src={cover} alt="" className="w-full" quality={90} />
				</div>
			</div>
			{/* Legend */}
			<div className="flex flex-col w-full h-fit print:h-[90dvh] print:m-auto print:items-center justify-center gap-4 print:max-w-[80%] break-after-page">
				<div className="grid grid-cols-2 gap-4 p-4 text-center auto-rows-max w-fit ">
					<h2 className="col-span-2 text-2xl font-bold">Legend</h2>
					<div className="self-center p-4 border border-dashed rounded text-alt-purple/50 max-w-52 w-fit justify-self-center">
						<FontAwesomeIcon icon={faHand} className=" text-[100px]" title="Craftable" />
						<div className="text-3xl font-bold whitespace-break-spaces">Hand Craftable</div>
					</div>
					<div className="self-center p-4 border border-dashed rounded text-secondary/75 max-w-52 w-fit justify-self-center">
						<FontAwesomeIcon icon={faDiscDrive} className="text-[100px]" title="Alternate Recipe" />
						<div className="text-3xl font-bold">Alternate Recipe</div>
					</div>
					<div className="self-center p-4 border border-dashed rounded text-alt-sky max-w-52 w-fit justify-self-center">
						<FontAwesomeIcon icon={faTransformerBolt} className=" text-[100px]" title="Variable Power" />
						<div className="text-3xl font-bold">Variable Power</div>
					</div>
					<div className="self-center p-4 border border-dashed rounded text-alt-green/75 max-w-52 w-fit justify-self-center">
						<FontAwesomeIcon icon={faScrewdriverWrench} className=" text-[100px]" title="Workshop Craftable" />
						<div className="text-3xl font-bold">Equipment Workshop</div>
					</div>
				</div>
			</div>
		</div>
	)
}
