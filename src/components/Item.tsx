import { faCircleRadiation, faLayerGroup, faTicket } from '@awesome.me/kit-90105b07a9/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getRecipesForItem } from '@/data/helpers'
import { IItemSchema } from '@/scripts/bin/schema/IItemSchema'

import ItemImage from './ItemImage'
import Recipe from './Recipe'

type Props = {
	item: IItemSchema
}

export default function Item({ item }: Props) {
	// TODO Handle left-padding option
	const recipes = getRecipesForItem(item.className)

	// if (!recipes.length) return null

	return (
		<div
			id={item.className}
			className="flex gap-4 flex-row px-2 [body.multiple-per-page_&]:break-after-auto [body.multiple-per-page_&]:break-inside-avoid break-after-page break-inside-auto w-full"
		>
			{/* I do not remember why this is necessary */}
			<div className="p-1 flex flex-col w-full gap-1">
				{/* Overview */}
				<div className="flex flex-row w-full justify-between gap-4">
					<div className="flex-1 flex flex-col gap-1 justify-center">
						<div className="flex flex-row gap-2 items-center flex-nowrap">
							<h1 className="text-3xl font-bold text-pretty">{item.name}</h1>
							{/* Radioactive? */}
							{item.radioactiveDecay > 0 && <FontAwesomeIcon icon={faCircleRadiation} className="text-2xl text-lime-600" />}
						</div>
						{/* Icons */}
						<div className="flex flex-row items-center gap-2 text-[10px] font-semibold">
							{/* Stack Size */}
							<div className="text-alt-green bg-alt-green/10 border border-alt-green/20 flex flex-row px-1 py-0.25 rounded items-center gap-1">
								<FontAwesomeIcon icon={faLayerGroup} />
								<span className="">{item.stackSize.toLocaleString()}</span>
							</div>
							{/* Coupons */}
							<div className="text-secondary-dark bg-secondary-dark/10 border border-secondary-dark/20 flex flex-row px-1 py-0.25 rounded items-center gap-1">
								<FontAwesomeIcon icon={faTicket} />
								<span className="">{item.sinkPoints.toLocaleString()}</span>
							</div>
						</div>
						<div className="text-xs leading-normal text-pretty [body.hide-description_&]:hidden">{item.description}</div>
					</div>
					<ItemImage
						itemClass={item.className}
						className="p-1 rounded-md border w-24 h-24 [body.hide-description_&]:h-16 [body.hide-description_&]:w-16"
						width={96}
						height={96}
					/>
					{/* <ItemImage
						itemClass={item.className}
						className="p-1 rounded-md border w-16 h-16 hidden [body.hide-description_&]:block"
						width={64}
						height={64}
					/> */}
				</div>

				{/* Recipes */}
				<div className="flex flex-col gap-1">
					{recipes.map(recipe => (
						<Recipe key={recipe.className} recipe={recipe} />
					))}
				</div>
			</div>
		</div>
	)
}
