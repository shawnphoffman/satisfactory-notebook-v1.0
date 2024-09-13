import ItemImage from '@/components/ItemImage'
import Recipe from '@/components/Recipe'
import data from '@/data/output.json'
import { IAnyRecipeSchema } from '@/scripts/bin/schema/IRecipeSchema'

// 4mm ~= 16px

const sortRecipes = (recipes: IAnyRecipeSchema[]) =>
	recipes.sort((a, b) => {
		const aAlt = a.name.includes('Alternate')
		const bAlt = b.name.includes('Alternate')

		if (aAlt && bAlt) {
			if (a.name > b.name) return 1
			if (b.name > a.name) return -1
			return 0
		}

		if (aAlt && !bAlt) return 1
		if (!aAlt && bAlt) return -1

		if (a.name > b.name) return 1
		if (b.name > a.name) return -1

		return 0
	})

const getRecipesForItem = (item: string) => {
	return Object.values(data.recipes).reduce((acc: IAnyRecipeSchema[], recipe) => {
		if (recipe?.products.some(x => x.item === item)) {
			acc.push(recipe as IAnyRecipeSchema)
		}
		return sortRecipes(acc)
	}, [])
}

export default async function Home() {
	const items = Object.entries(data.items).sort(([, entry1], [, entry2]) => entry1.name.localeCompare(entry2.name))
	return (
		<div className="flex flex-col gap-2 py-2 w-full max-w-screen-md bg-white">
			{items.map(([key, value]) => (
				// TODO EXTRACT TO ITEM
				// TODO Handle left-padding option
				<div key={key} id={value.className} className="flex gap-4 flex-row px-4 break-after-page break-inside-auto w-full">
					{/* I do not remember why this is necessary */}
					<div className="p-1 flex flex-col w-full gap-1">
						{/* Overview */}
						<div className="flex flex-row w-full justify-between gap-4">
							<div className="flex-1 flex flex-col gap-3">
								<h1 className="text-3xl font-bold">{value.name}</h1>
								<div className="text-xs leading-normal">{value.description}</div>
							</div>

							<ItemImage itemClass={key} className="p-1 rounded-md border w-24 h-24" width={96} height={96} alt={value.name} />
						</div>

						{/* Recipes */}
						<div className="flex flex-col gap-1">
							{getRecipesForItem(value.className).map(recipe => (
								<Recipe key={recipe.className} recipe={recipe} />
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
