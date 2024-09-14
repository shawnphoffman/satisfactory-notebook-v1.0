import Fraction from 'fraction.js'

import data from '@/data/output.json'
import { IAnyRecipeSchema } from '@/scripts/bin/schema/IRecipeSchema'

// TODO Make all of these static data

export const getItemByClassName = (className: string) => {
	const item = Object.values(data.items).find(x => x.className === className)
	if (!item) {
		console.warn(`No item found for ${className}`)
		return null
	}
	return item
}

export const getBuildingByClassName = (className: string) => {
	const item = Object.values(data.buildings).find(x => x.className === className)
	if (!item) {
		// console.warn(`No building found for ${className}`)
		return null
	}
	return item
}

export const calculateProductionRate = (amount: number, duration: number, liquid: boolean) => {
	if (Number.isNaN(amount)) {
		return null
	}

	// const amt = liquid ? amount / 1000 : amount
	const amt = liquid ? amount : amount
	const decimal = Number((amt * (60 / duration)).toFixed(4))
	const fraction = new Fraction(decimal).toFraction(true)

	return {
		perMin: decimal,
		perMinFraction: fraction,
		perMinLabel: liquid ? 'm³/min' : '/min',
		perCycle: amt,
		perCycleLabel: liquid ? 'm³' : 'x',
	}
}

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

export const getRecipesForItem = (item: string) => {
	return Object.values(data.recipes).reduce((acc: IAnyRecipeSchema[], recipe) => {
		if (recipe?.products.some(x => x.item === item)) {
			acc.push(recipe as IAnyRecipeSchema)
		}
		return sortRecipes(acc)
	}, [])
}
