export interface RecipeData {
	ClassName: string
	FullName: string
	mDisplayName: string
	mIngredients: string
	mProduct: string
	mManufacturingMenuPriority: string
	mManufactoringDuration: string
	mManualManufacturingMultiplier: string
	mProducedIn: string
	mRelevantEvents: string
	mVariablePowerConsumptionConstant: string
	mVariablePowerConsumptionFactor: string
}

export interface ItemInfo {
	item: string
	amount: number
}

export interface RecipeOutput {
	slug: string
	name: string
	className: string
	alternate: boolean
	time: number
	inHand: boolean
	forBuilding: boolean
	inWorkshop: boolean
	inMachine: boolean
	manualTimeMultiplier: number
	ingredients: ItemInfo[]
	products: ItemInfo[]
	producedIn: string[]
	isVariablePower: boolean
	minPower: number
	maxPower: number
}

export type TransformedRecipes = Record<string, RecipeOutput>

// Type for item descriptors
export type ItemDescriptor = {
	ClassName: string
	mDisplayName: string
	mDescription: string
	mAbbreviatedDisplayName: string
	mStackSize: string
	mCanBeDiscarded: string
	mRememberPickUp: string
	mEnergyValue: string
	mRadioactiveDecay: string
	mForm: string
	mGasType: string
	mSmallIcon: string
	mPersistentBigIcon: string
	mCrosshairMaterial: string
	mDescriptorStatBars: string
	mIsAlienItem: string
	mSubCategories: string
	mMenuPriority: string
	mFluidColor: string
	mGasColor: string
	mCompatibleItemDescriptors: string
	mClassToScanFor: string
	mScannableType: string
	mShouldOverrideScannerDisplayText: string
	mScannerDisplayText: string
	mScannerLightColor: string
	mNeedsPickUpMarker: string
	mResourceSinkPoints: string
}

// Type for each class entry
export type ClassEntry = {
	ClassName: string
	// Items: ItemDescriptor[]
} & RecipeData

// Root type for the JSON data
export type GameDataType = {
	NativeClass: string
	Classes: ClassEntry[]
}[]
