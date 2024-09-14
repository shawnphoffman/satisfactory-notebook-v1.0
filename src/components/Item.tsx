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
					<div className="flex-1 flex flex-col gap-3 justify-center">
						<h1 className="text-3xl font-bold text-pretty">{item.name}</h1>
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
