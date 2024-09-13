import { IItemAmountSchema } from '../schema/IItemAmountSchema'

export interface IRecipeSchema {
	/* ❓ */
	slug: string
	/* Display name */
	name: string

	className: string
	alternate: boolean
	/** Time to craft in seconds */
	time: number
	inHand: boolean
	forBuilding: boolean
	inWorkshop: boolean
	inMachine: boolean
	manualTimeMultiplier: number
	ingredients: IItemAmountSchema[]
	products: IItemAmountSchema[]
	producedIn: string[]
	isVariablePower: boolean
}

export interface IRecipeVariablePowerSchema extends IRecipeSchema {
	isVariablePower: true
	minPower: number
	maxPower: number
}

export interface IRecipeFixedPowerSchema extends IRecipeSchema {
	isVariablePower: false
}

export type IAnyRecipeSchema = IRecipeVariablePowerSchema | IRecipeFixedPowerSchema
