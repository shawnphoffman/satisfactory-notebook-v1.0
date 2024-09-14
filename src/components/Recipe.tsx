import {
	faArrowAltRight,
	faDiscDrive,
	faHand,
	faScrewdriverWrench,
	faTransformerBolt,
} from '@awesome.me/kit-90105b07a9/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getBuildingByClassName } from '@/data/helpers'
import { IAnyRecipeSchema } from '@/scripts/bin/schema/IRecipeSchema'

import ItemImage from './ItemImage'
import RecipePart from './RecipePart'

type Props = {
	recipe: IAnyRecipeSchema
}

export default function Recipe({ recipe }: Props) {
	const isAlternate = recipe.alternate
	/* TODO This is dumb... */
	const primaryProducer = getBuildingByClassName(recipe.producedIn.length ? recipe.producedIn[0] : '')
	return (
		<div
			key={recipe.className}
			className={`flex border flex-col items-center p-2 rounded-md break-inside-avoid max-w-full gap-1 ${
				isAlternate && '[body.hide-alternates_&]:hidden'
			}`}
		>
			{/*  */}
			<div className="flex w-full">
				<div className="flex-1 basis-1/5 text-[11px] font-medium italic items-start justify-start flex">
					{isAlternate && <FontAwesomeIcon icon={faDiscDrive} className="text-secondary/50 text-base" title="Alternate Recipe" />}
					{recipe.isVariablePower && <FontAwesomeIcon icon={faTransformerBolt} className="text-alt-sky text-base" title="Variable Power" />}
					{recipe.inWorkshop && (
						<FontAwesomeIcon icon={faScrewdriverWrench} className="text-alt-green/50 text-base" title="Workshop Craftable" />
					)}
					{recipe.inHand && <FontAwesomeIcon icon={faHand} className="text-alt-purple/50 text-base" title="Craftable" />}
				</div>
				<h2 className="text-center text-base font-bold w-fit leading-none">{recipe.name}</h2>
				<div className="flex-1 whitespace-nowrap basis-1/5 text-[11px] font-medium italic items-center justify-end flex text-muted gap-1">
					{primaryProducer && (
						<>
							{primaryProducer.name}
							<ItemImage
								itemClass={primaryProducer.className}
								alt={primaryProducer.name}
								className="w-5 h-5 hidden sm:block"
								width={20}
								height={20}
							/>
						</>
					)}
				</div>
			</div>
			{/*  */}
			<div className="w-full flex items-center -gap-1 sm:gap-2 flex-col sm:flex-row">
				{/* Ingredients */}
				<div className="w-full flex-1 gap-0.5 flex flex-col">
					{recipe.ingredients.map(recipePart => (
						<RecipePart key={`in-${recipe.className}-${recipePart.item}`} part={recipePart} recipe={recipe} />
					))}
				</div>
				{/* Arrow */}
				<div className="flex-0 shrink-1 md:w-auto items-center justify-center flex">
					<FontAwesomeIcon icon={faArrowAltRight} className="!hidden sm:!inline-block rotate-90 sm:rotate-0" />
					<FontAwesomeIcon
						icon={faArrowAltRight}
						className="!inline-block sm:!hidden relative rotate-90 sm:rotate-0"
						transform={'grow-10'}
					/>
				</div>
				{/* Products */}
				<div className="w-full flex-1 gap-0.5 flex flex-col">
					{recipe.products.map(recipePart => (
						<RecipePart key={`out-${recipe.className}-${recipePart.item}`} part={recipePart} recipe={recipe} />
					))}
				</div>
			</div>
		</div>
	)
}
