import { calculateProductionRate, getItemByClassName } from '@/data/helpers'
import { IItemAmountSchema } from '@/scripts/bin/schema/IItemAmountSchema'
import { IAnyRecipeSchema } from '@/scripts/bin/schema/IRecipeSchema'

import { Fraction } from './Fraction'
import ItemImage from './ItemImage'

type Props = {
	part: IItemAmountSchema
	recipe: IAnyRecipeSchema
}

export default function RecipePart({ part, recipe }: Props) {
	const itemClass = getItemByClassName(part.item)!
	const rate = calculateProductionRate(part.amount, recipe.time, itemClass?.liquid || false || false)

	// if (!itemClass) {
	// 	console.warn(`No item found`, { itemClass, part })
	// }

	return (
		<div className="flex items-center basis-full flex-row justify-between bg-sidebar/50 p-1 rounded-md gap-2">
			{/* Info */}
			<div className="flex flex-1 items-center text-xs leading-tight gap-1">
				<ItemImage itemClass={part.item} className="w-8 h-8" width={32} height={32} />
				<a href={`#${part.item}`}>{itemClass?.name}</a>
			</div>

			{rate?.perCycle && (
				<div className="text-xs text-black/80 bg-secondary-dark/10 border border-secondary-dark/20 flex flex-row px-1.5 py-0.5 rounded [body.hide-cycle-rates_&]:hidden">
					<div>{rate?.perCycle}</div>
					<div>{rate?.perCycleLabel}</div>
				</div>
			)}

			{/* Amount */}
			<div className="whitespace-nowrap leading-tight flex items-center">
				<span className="font-bold inline-block [body.use-decimals_&]:hidden">
					<Fraction>{rate?.perMinFraction}</Fraction>
				</span>
				<span className="font-bold hidden [body.use-decimals_&]:inline-block ">{rate?.perMin}</span>
				<span className="text-[0.75rem] font-medium">{rate?.perMinLabel}</span>
			</div>
		</div>
	)
}
