import Fraction from 'fraction.js'

import data from '@/data/output.json'

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
