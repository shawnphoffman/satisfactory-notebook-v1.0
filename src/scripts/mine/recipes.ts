import { ItemInfo, RecipeData, RecipeOutput, TransformedRecipes } from './types'

const ignoredProducts = [
	'Desc_Truck_C',
	'Desc_FreightWagon_C',
	'Desc_Locomotive_C',
	'Desc_Tractor_C',
	'Desc_Explorer_C',
	'Desc_CyberWagon_C',
]

// const ignored = [
// 	'Desc_CandyCane_C',
// 	'Desc_Gift_C',
// 	'Desc_Snow_C',
// 	'Desc_SnowballProjectile_C',
// 	'Desc_XmasBall1_C',
// 	'Desc_XmasBall2_C',
// 	'Desc_XmasBall3_C',
// 	'Desc_XmasBall4_C',
// 	'Desc_XmasBallCluster_C',
// 	'Desc_XmasBow_C',
// 	'Desc_XmasBranch_C',
// 	'Desc_XmasStar_C',
// 	'Desc_XmasWreath_C',
// 	'Desc_CandyCaneDecor_C',
// 	'Desc_Snowman_C',
// 	'Desc_WreathDecor_C',
// 	'Desc_XmassTree_C',
// ]

const ignoredRecipes = ['Recipe_JumpPadTilted_C', 'Recipe_JumpPad_C', 'Recipe_PillarTop_C', 'Recipe_Stair_1b_C']

export default function processRecipes(gameData: RecipeData[]): TransformedRecipes {
	//
	const extractItemInfo = (itemString: string): ItemInfo => {
		// const match = itemString.match(/\/([^\/]+)\.(Desc_[^\/]+)_C'/)
		// const amountMatch = itemString.match(/Amount=(\d+)/)
		// return {
		// 	item: match ? match[2] : null,
		// 	amount: amountMatch ? parseInt(amountMatch[1], 10) : null,
		// }
		const match = itemString.match(/\/([^\/]+)\.(Desc_[^\/]+)_C'/)
		const amountMatch = itemString.match(/Amount=(\d+)/)
		return {
			item: match ? `${match[2]}_C` : '', // Ensure "_C" is appended
			amount: amountMatch ? parseInt(amountMatch[1], 10) : 0,
		}
	}

	const extractProducedInInfo = (producedInString: string): string[] => {
		const matches = [...producedInString.matchAll(/\/([^\/]+)\.Build_([^\/]+)_C/g)]
		return matches.map(match => `Desc_${match[2]}_C`)
	}

	const processRecipe = (data: RecipeData): RecipeOutput => {
		const ingredients: ItemInfo[] = data.mIngredients.match(/\((.*?)\)/g)?.map(extractItemInfo) || []
		const products: ItemInfo[] = data.mProduct.match(/\((.*?)\)/g)?.map(extractItemInfo) || []

		const isForBuilding = data.mProducedIn.includes('BP_BuildGun')
		const hasWorkbench = data.mProducedIn.includes('BP_WorkBenchComponent')
		const hasMachine = !hasWorkbench && !isForBuilding && /Build_/.test(data.mProducedIn)

		return {
			slug: data.ClassName.toLowerCase().replace(/_/g, '-'),
			name: data.mDisplayName,
			className: data.ClassName,
			alternate: data.mDisplayName.includes('Alternate'),
			time: parseFloat(data.mManufactoringDuration),
			inHand: hasWorkbench,
			forBuilding: isForBuilding,
			inWorkshop: hasWorkbench,
			inMachine: hasMachine,
			manualTimeMultiplier: parseFloat(data.mManualManufacturingMultiplier),
			ingredients,
			products,
			producedIn: extractProducedInInfo(data.mProducedIn),
			isVariablePower: parseFloat(data.mVariablePowerConsumptionConstant) !== 0,
			minPower: parseFloat(data.mVariablePowerConsumptionConstant),
			maxPower: parseFloat(data.mVariablePowerConsumptionConstant) + parseFloat(data.mVariablePowerConsumptionFactor),
		}
	}

	const result: TransformedRecipes = {}
	gameData.forEach(data => {
		// Filter ignored recipes
		if (ignoredRecipes.includes(data.ClassName)) {
			return
		}

		// Filter empty producedIn recipes
		if (!data.mProducedIn) {
			return
		}

		const processedRecipe = processRecipe(data)

		// Filter N/A names
		if (processedRecipe.name === 'N/A') {
			return
		}

		// Filter ignored products
		if (processedRecipe.products.some(product => ignoredProducts.includes(product.item))) {
			return
		}

		result[data.ClassName] = processedRecipe
	})

	return result
}
