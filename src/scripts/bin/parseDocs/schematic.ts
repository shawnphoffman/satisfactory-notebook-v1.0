import { ISchematicSchema, ISchematicUnlockSchema } from '../schema/ISchematicSchema'
import { Arrays } from '../utils/Arrays'
import { Strings } from '../utils/Strings'

import parseBlueprintClass from './blueprintClass'
import parseItemAmount from './itemAmount'

export default function parseSchematics(
	schematics: {
		ClassName: string
		mType: string
		mTechTier: string
		mDisplayName: string
		mCost: string
		mSchematicIcon: string
		mUnlocks: {
			mRecipes?: string
			mResourcesToAddToScanner?: string
			mNumInventorySlotsToUnlock?: string
			mItemsToGive?: string
		}[]
		mSchematicDependencies: {
			Class?: string
			mSchematics?: string
			mRequireAllSchematicsToBePurchased?: string
		}[]
		mTimeToComplete: string
	}[]
): ISchematicSchema[] {
	const result: ISchematicSchema[] = []
	for (const schematic of schematics) {
		// ignore custom schematics
		if (schematic.mType === 'EST_Custom') {
			continue
		}

		// ignore ficsmas
		if (
			[
				'Research_XMas_1_C',
				'Research_XMas_1-1_C',
				'Research_XMas_1-2_C',
				'Research_XMas_2_C',
				'Research_XMas_2-1_C',
				'Research_XMas_2-2_C',
				'Research_XMas_3_C',
				'Research_XMas_3-1_C',
				'Research_XMas_4_C',
				'Research_XMas_4-1_C',
				'Research_XMas_4-2_C',
				'Research_XMas_5_C',
			].indexOf(schematic.ClassName) !== -1
		) {
			continue
		}

		if (schematic.mDisplayName.match('Discontinued')) {
			continue
		}

		const requiredSchematics: string[] = []
		const unlockData: ISchematicUnlockSchema = {
			inventorySlots: 0,
			recipes: [],
			scannerResources: [],
			giveItems: [],
		}

		for (const unlock of schematic.mUnlocks) {
			if (unlock.mNumInventorySlotsToUnlock) {
				unlockData.inventorySlots += parseInt(unlock.mNumInventorySlotsToUnlock)
			}
			if (unlock.mRecipes) {
				unlockData.recipes.push(...Arrays.ensureArray(Strings.unserializeDocs(unlock.mRecipes)).map(parseBlueprintClass))
			}
			if (unlock.mResourcesToAddToScanner) {
				unlockData.scannerResources.push(
					...Arrays.ensureArray(Strings.unserializeDocs(unlock.mResourcesToAddToScanner)).map(parseBlueprintClass)
				)
			}
			if (unlock.mItemsToGive) {
				unlockData.giveItems.push(...Arrays.ensureArray(Strings.unserializeDocs(unlock.mItemsToGive)).map(parseItemAmount))
			}
		}

		for (const requirement of schematic.mSchematicDependencies) {
			if (requirement.Class === 'BP_SchematicPurchasedDependency_C' && requirement.mSchematics) {
				requiredSchematics.push(...Arrays.ensureArray(Strings.unserializeDocs(requirement.mSchematics)).map(parseBlueprintClass))
			}
		}

		const cost = schematic.mCost ? Arrays.ensureArray(Strings.unserializeDocs(schematic.mCost)).map(parseItemAmount) : []
		let slug = Strings.webalize(schematic.mDisplayName)
		// add suffix to slug to prevent duplicates
		if ((schematic.mDisplayName === 'Inflated Pocket Dimension' || schematic.mDisplayName === 'Medicinal Inhaler') && cost.length) {
			slug += '-' + Strings.webalize(cost[0].item.replace('Desc_', '').replace('_C', ''))
		}

		if (unlockData.giveItems.length) {
			slug = 'get-' + slug
		}

		result.push({
			className: schematic.ClassName,
			name: schematic.mDisplayName,
			slug: slug,
			tier: parseInt(schematic.mTechTier),
			cost: cost,
			unlock: unlockData,
			requiredSchematics: requiredSchematics,
			type: schematic.mType,
			time: parseFloat(schematic.mTimeToComplete),
			alternate: false,
			mam: false,
		})
	}
	return result
}
