import { calculateProductionRate, getItemByClassName } from '@/data/helpers'
import { IItemAmountSchema } from '@/scripts/bin/schema/IItemAmountSchema'
import { IAnyRecipeSchema } from '@/scripts/bin/schema/IRecipeSchema'

import ItemImage from './ItemImage'

type Props = {
	part: IItemAmountSchema
	recipe: IAnyRecipeSchema
}

export default function RecipePart({ part, recipe }: Props) {
	const itemClass = getItemByClassName(part.item)!
	const rate = calculateProductionRate(part.amount, recipe.time, itemClass?.liquid || false || false)

	if (!itemClass) {
		console.warn(`No item found`, { itemClass, part })
	}

	return (
		<div className="flex items-center flex-row justify-between bg-sidebar/50 p-1 rounded-md gap-1">
			{/* Info */}
			<div className="flex items-center text-xs leading-tight gap-1">
				<ItemImage itemClass={part.item} alt={part.item} className="w-8 h-8" width={32} height={32} />
				<a href={`#${part.item}`}>{itemClass?.name}</a>
			</div>
			{/* Amount */}
			<div className="whitespace-nowrap leading-tight flex items-center">
				{/* TODO Handle cycle and fraction options */}
				<span className="font-bold">{rate?.perMin}</span>
				<span className="text-[0.75rem] font-medium">{rate?.perMinLabel}</span>
			</div>
		</div>
	)
}
