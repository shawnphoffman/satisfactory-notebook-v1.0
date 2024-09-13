// import Fraction from 'fraction.js'
import jsonfile from 'jsonfile'

import GameData from './game-data.json'
import processRecipes from './recipes'
import { GameDataType, RecipeData } from './types'

const GameRecipes: RecipeData[] = []

const GameDataTyped: GameDataType = GameData as GameDataType
GameDataTyped.forEach(parentClass => {
	// console.log(parentClass.NativeClass)

	parentClass.Classes.forEach(childClass => {
		if (childClass.ClassName.toLowerCase().startsWith('recipe_')) {
			GameRecipes.push(childClass)
		}
	})
})

// FILE PATHS
const recipesOutPath = './src/data/recipes.json'

// Example usage:
// const sampleRecipes: RecipeData[] = [
// 	{
// 		ClassName: 'Recipe_UnpackageIonizedFuel_C',
// 		FullName: 'BlueprintGeneratedClass /Game/FactoryGame/Recipes/Packager/Recipe_UnpackageIonizedFuel.Recipe_UnpackageIonizedFuel_C',
// 		mDisplayName: 'Unpackage Ionized Fuel',
// 		mIngredients:
// 			'((ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/IonizedFuel/Desc_PackagedIonizedFuel.Desc_PackagedIonizedFuel_C\'",Amount=2))',
// 		mProduct:
// 			'((ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/IonizedFuel/Desc_IonizedFuel.Desc_IonizedFuel_C\'",Amount=4000),(ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/GasTank/Desc_GasTank.Desc_GasTank_C\'",Amount=2))',
// 		mManufacturingMenuPriority: '7.000000',
// 		mManufactoringDuration: '3.000000',
// 		mManualManufacturingMultiplier: '1.000000',
// 		mProducedIn: '("/Game/FactoryGame/Buildable/Factory/Packager/Build_Packager.Build_Packager_C")',
// 		mRelevantEvents: '',
// 		mVariablePowerConsumptionConstant: '0.000000',
// 		mVariablePowerConsumptionFactor: '1.000000',
// 	},
// 	{
// 		ClassName: 'Recipe_Alternate_Diamond_Turbo_C',
// 		FullName:
// 			'BlueprintGeneratedClass /Game/FactoryGame/Recipes/AlternateRecipes/Alt_Tier9/Recipe_Alternate_Diamond_Turbo.Recipe_Alternate_Diamond_Turbo_C',
// 		mDisplayName: 'Alternate: Turbo Diamonds',
// 		mIngredients:
// 			'((ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/RawResources/Coal/Desc_Coal.Desc_Coal_C\'",Amount=30),(ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/Turbofuel/Desc_TurboFuel.Desc_TurboFuel_C\'",Amount=2))',
// 		mProduct:
// 			'((ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/Diamond/Desc_Diamond.Desc_Diamond_C\'",Amount=3))',
// 		mManufacturingMenuPriority: '4.000000',
// 		mManufactoringDuration: '3.000000',
// 		mManualManufacturingMultiplier: '99.000000',
// 		mProducedIn: '("/Game/FactoryGame/Buildable/Factory/HadronCollider/Build_HadronCollider.Build_HadronCollider_C")',
// 		mRelevantEvents: '',
// 		mVariablePowerConsumptionConstant: '250.000000',
// 		mVariablePowerConsumptionFactor: '500.000000',
// 	},
// 	{
// 		ClassName: 'Recipe_Converter_C',
// 		FullName: 'BlueprintGeneratedClass /Game/FactoryGame/Recipes/Buildings/Recipe_Converter.Recipe_Converter_C',
// 		mDisplayName: 'Converter',
// 		mIngredients:
// 			'((ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/ModularFrameFused/Desc_ModularFrameFused.Desc_ModularFrameFused_C\'",Amount=10),(ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/CoolingSystem/Desc_CoolingSystem.Desc_CoolingSystem_C\'",Amount=25),(ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/ModularFrameLightweight/Desc_ModularFrameLightweight.Desc_ModularFrameLightweight_C\'",Amount=50),(ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Resource/Parts/SAMFluctuator/Desc_SAMFluctuator.Desc_SAMFluctuator_C\'",Amount=100))',
// 		mProduct:
// 			'((ItemClass="/Script/Engine.BlueprintGeneratedClass\'/Game/FactoryGame/Buildable/Factory/Converter/Desc_Converter.Desc_Converter_C\'",Amount=1))',
// 		mManufacturingMenuPriority: '0.000000',
// 		mManufactoringDuration: '1.000000',
// 		mManualManufacturingMultiplier: '1.000000',
// 		mProducedIn: '("/Game/FactoryGame/Equipment/BuildGun/BP_BuildGun.BP_BuildGun_C")',
// 		mRelevantEvents: '',
// 		mVariablePowerConsumptionConstant: '0.000000',
// 		mVariablePowerConsumptionFactor: '1.000000',
// 	},
// ]

const recipesOut = processRecipes(GameRecipes)
// const recipesOut = processRecipes(GameData)

// console.log({ recipesOut })

jsonfile.writeFile(recipesOutPath, recipesOut, { spaces: 2 }, (err: any) => {
	if (err) {
		console.error(err)
	}
})
