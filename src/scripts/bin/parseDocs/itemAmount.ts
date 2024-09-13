import { IItemAmountSchema } from '../schema/IItemAmountSchema'

import parseBlueprintClass from './blueprintClass'

export default function parseItemAmount(value: { ItemClass: string; Amount: string }): IItemAmountSchema {
	const cleanItemClass = value?.ItemClass?.replace("_C'", '_C')
	return {
		item: parseBlueprintClass(cleanItemClass),
		amount: parseInt(value?.Amount),
	}
}
