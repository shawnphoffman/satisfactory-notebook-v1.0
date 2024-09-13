import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'

import parseBuildings from './parseDocs/building'
import parseBuildingDescriptors from './parseDocs/buildingDescriptor'
import parseGenerators from './parseDocs/generator'
import parseImageMapping from './parseDocs/imageMapping'
import parseItemDescriptors from './parseDocs/itemDescriptor'
import parseRecipes from './parseDocs/recipe'
import parseResourceDescriptors from './parseDocs/resourceDescriptor'
import parseResourceExtractors from './parseDocs/resourceExtractor'
import parseSchematics from './parseDocs/schematic'
import { IItemSchema } from './schema/IItemSchema'
import { IJsonSchema } from './schema/IJsonSchema'
import { DiffFormatter } from './utils/DiffGenerator/DiffFormatter'
import { DiffGenerator } from './utils/DiffGenerator/DiffGenerator'
import { Objects } from './utils/Objects'
import { Strings } from './utils/Strings'

const outputDir = path.join(__dirname, '..', '..', 'data')

const docs = JSON.parse(fs.readFileSync(path.join(outputDir, 'Docs.json')).toString())

// console.log('Parsing docs...', docs)
const oldData: IJsonSchema = JSON.parse(fs.readFileSync(path.join(outputDir, 'output.json')).toString()) as IJsonSchema
// const sizes: {Name: string, Dimensions: number[]}[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'debug.json')).toString()) as {Name: string, Dimensions: number[]}[];

const json: IJsonSchema = {
	recipes: {},
	items: {},
	schematics: {},
	generators: {},
	resources: {},
	miners: {},
	buildings: {},
}

let biomass: IItemSchema[] = []
let extraInfo: any[] = []
const imageMapping: { [key: string]: string } = {}

for (const definitions of docs) {
	console.log(`📁 ${definitions.NativeClass.replace("/Script/CoreUObject.Class'/Script/FactoryGame.", '')}`)
	switch (definitions.NativeClass) {
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescAmmoTypeProjectile'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescAmmoTypeColorCartridge'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescAmmoTypeInstantHit'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'":
		// TODO THIS IS NEW ⬇️
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPowerShardDescriptor'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorPowerBoosterFuel'":
			for (const item of parseItemDescriptors(definitions.Classes)) {
				console.log(` ⭐ ITEM: ${item.className}`)
				json.items[item.className] = item
			}
			for (const item of parseImageMapping(definitions.Classes)) {
				imageMapping[item.className] = item.image
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'":
			for (const recipe of parseRecipes(definitions.Classes)) {
				console.log(` 🍳 RECIPE: ${recipe.className}`)
				json.recipes[recipe.className] = recipe
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'":
			for (const item of parseItemDescriptors(definitions.Classes)) {
				console.log(` ⭐ ITEM: ${item.className}`)
				json.items[item.className] = item
			}
			for (const item of parseImageMapping(definitions.Classes)) {
				imageMapping[item.className] = item.image
			}
			for (const resource of parseResourceDescriptors(definitions.Classes)) {
				console.log(` 🪨 RESOURCE: ${resource.item}`)
				json.resources[resource.item] = resource
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'":
			biomass = parseItemDescriptors(definitions.Classes)
			for (const item of biomass) {
				console.log(` ⭐ ITEM: ${item.className}`)
				json.items[item.className] = item
			}
			for (const item of parseImageMapping(definitions.Classes)) {
				imageMapping[item.className] = item.image
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePole'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStair'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundation'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillar'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRamp'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeam'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'":
			for (const building of parseBuildings(definitions.Classes, true)) {
				console.log(` 🏛️ BUILDING: ${building.className}`)
				json.buildings[building.className] = building
			}
			for (const item of parseImageMapping(definitions.Classes)) {
				imageMapping[item.className] = item.image
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'":
			for (const building of parseBuildings(definitions.Classes, true)) {
				console.log(` 🏛️ BUILDING: ${building.className}`)
				json.buildings[building.className] = building
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'":
			for (const building of parseBuildings(definitions.Classes, true)) {
				console.log(` 🏛️ BUILDING: ${building.className}`)
				json.buildings[building.className] = building
			}
			for (const item of parseImageMapping(definitions.Classes)) {
				imageMapping[item.className] = item.image
			}
			for (const miner of parseResourceExtractors(definitions.Classes)) {
				json.miners[miner.className] = miner
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'":
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'":
			for (const building of parseBuildings(definitions.Classes, true)) {
				console.log(` 🏛️ BUILDING: ${building.className}`)
				json.buildings[building.className] = building
			}
			for (const item of parseImageMapping(definitions.Classes)) {
				imageMapping[item.className] = item.image
			}
			for (const generator of parseGenerators(definitions.Classes)) {
				console.log(` ⛽ GENERATOR: ${generator.className}`)
				json.generators[generator.className] = generator
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'":
			extraInfo = parseBuildingDescriptors(definitions.Classes)
			// console.log(` 🏛️ BUILDING: ${building.className}`)
			for (const item of parseImageMapping(definitions.Classes)) {
				imageMapping[item.className] = item.image
			}
			break
		case "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'":
			for (const schematic of parseSchematics(definitions.Classes)) {
				json.schematics[schematic.className] = schematic
			}
			for (const schematic of parseImageMapping(definitions.Classes)) {
				imageMapping[schematic.className] = schematic.image
			}
			break
		default:
			console.log(chalk.bold.redBright(`⚠️ NOT PROCESSED: ${definitions.NativeClass}`))
			break
	}
}

const vehicleMapping: {
	key: string
	name: string
	description: string
}[] = [
	{
		key: 'Desc_Truck_C',
		name: 'Truck',
		description:
			'48 slot inventory. Has a built in Craft Bench. Can be automated to pick up and deliver resources at Truck Stations. Nicknamed the Unit by FICSIT pioneers because of its massive frame.',
	},
	{
		key: 'Desc_Tractor_C',
		name: 'Tractor',
		description:
			'25 slot inventory. Has a built in Craft Bench. Can be automated to pick up and deliver resources at Truck Stations. Nicknamed the Sugarcube by FICSIT pioneers.',
	},
	{
		key: 'Desc_FreightWagon_C',
		name: 'Freight Car',
		description:
			'The Freight Car is used to transport large quantity of resources from one place to another. Resources are loaded or unloaded at Freight Platforms.\nMust be build on Railway.',
	},
	{
		key: 'Desc_Locomotive_C',
		name: 'Electric Locomotive',
		description:
			"This locomotive is used to move Freight Cars from station to station.\nRequires 25-110MW of Power to drive.\nMust be built on railway.\nNamed 'Leif' by FISCIT pioneers because of its reliability.",
	},
	{
		key: 'Desc_Explorer_C',
		name: 'Explorer',
		description:
			'24 slot inventory. Has a built in craft bench. Fast and nimble exploration vehicle. Tuned for really rough terrain and can climb almost vertical surfaces.',
	},
	{
		key: 'Desc_CyberWagon_C',
		name: 'Cyber Wagon',
		description: 'Absolutely indestructible.\nNeeds no further introduction.',
	},
	{
		key: 'Desc_DroneTransport_C',
		name: 'Drone',
		description: '',
	},
]

for (const item of vehicleMapping) {
	const building = json.buildings[item.key]
	if (!building) {
		console.log('❌🚚 Missing vehicle', item.key)
		continue
	}
	json.buildings[item.key].name = item.name
	json.buildings[item.key].description = item.description
	json.buildings[item.key].slug = Strings.webalize(item.name)
}

// add building sizes
/*for (const item of sizes) {
	for (const key in json.buildings) {
		if (item.Name.replace('Build_', 'Desc_') === json.buildings[key].className) {
			json.buildings[key].size = {
				width: item.Dimensions[0] * 0.02,
				length: item.Dimensions[1] * 0.02,
				height: item.Dimensions[2] * 0.02,
			};
		}
	}
}*/

// add extra info to buildings
for (const info of extraInfo) {
	if (info.className in json.buildings) {
		json.buildings[info.className].buildMenuPriority = info.priority
		json.buildings[info.className].categories = info.categories
	} else {
		// console.log(info.className)
	}
}

// add coupon item
json.items['Desc_ResourceSinkCoupon_C'] = {
	className: 'Desc_ResourceSinkCoupon_C',
	description:
		'A special FICSIT bonus program Coupon, obtained through the AWESOME Sink. Can be redeemed in the AWESOME Shop for bonus milestones and rewards',
	energyValue: 0,
	fluidColor: {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
	},
	liquid: false,
	name: 'FICSIT Coupon',
	radioactiveDecay: 0,
	sinkPoints: 1,
	slug: 'ficsit-coupon',
	stackSize: 500,
}
imageMapping['Desc_ResourceSinkCoupon_C'] = '/Game/FactoryGame/Resource/Parts/ResourceSinkCoupon/UI/IconDesc_Ficsit_Coupon_256.png'

// add biomass stuff to biomass burner
for (const key in json.generators) {
	const index = json.generators[key].fuel.indexOf('FGItemDescriptorBiomass')
	if (index !== -1) {
		json.generators[key].fuel.splice(index, 1)
		json.generators[key].fuel.push(
			...biomass.map(bio => {
				return bio.className
			})
		)
	}
}

// convert liquid requirements to m3
for (const key in json.recipes) {
	const recipe = json.recipes[key]

	for (const ingredient of recipe.ingredients) {
		if (!json.items[ingredient.item]) {
			throw new Error('Invalid item ' + ingredient.item + ' (' + key + ')')
		}
		if (json.items[ingredient.item].liquid) {
			ingredient.amount /= 1000
		}
	}
	for (const product of recipe.products) {
		if (!json.items[product.item]) {
			continue
		}
		if (json.items[product.item].liquid) {
			product.amount /= 1000
		}
	}
}

// attach extractable resources instead of keeping empty array with "everything allowed"
for (const minerKey in json.miners) {
	if (json.miners[minerKey].allowedResources.length > 0) {
		continue
	}

	const allowedResources = [] as string[]
	for (const resourceKey in json.resources) {
		if (!json.items[resourceKey]) {
			throw new Error(`Item of resource type "${resourceKey}" was not found.`)
		}

		const item = json.items[resourceKey]

		if (item.liquid === json.miners[minerKey].allowLiquids) {
			allowedResources.push(resourceKey)
		}
	}

	allowedResources.sort()
	json.miners[minerKey].allowedResources = allowedResources
}

for (const key in json) {
	if (json.hasOwnProperty(key)) {
		json[key as keyof IJsonSchema] = Objects.sortByKeys(json[key as keyof IJsonSchema])
	}
}

const slugs: string[] = []
for (const key in json.items) {
	let slug = json.items[key].slug
	let i = 1
	while (slugs.indexOf(slug) !== -1) {
		slug = json.items[key].slug + '-' + i++
	}
	json.items[key].slug = slug
	slugs.push(slug)
}
for (const key in json.buildings) {
	let slug = json.buildings[key].slug
	let i = 1
	while (slugs.indexOf(slug) !== -1) {
		slug = json.buildings[key].slug + '-' + i++
	}
	json.buildings[key].slug = slug
	slugs.push(slug)
}
for (const key in json.schematics) {
	let slug = json.schematics[key].slug
	let i = 1
	while (slugs.indexOf(slug) !== -1) {
		slug = json.schematics[key].slug + '-' + i++
	}
	json.schematics[key].slug = slug
	slugs.push(slug)
}

function extractPathInfo(fullPath: string) {
	// Extract the short path (everything after the last '/')
	const shortPath = fullPath.split('/').pop()

	return {
		full: fullPath,
		short: shortPath!,
	}
}

const imageMappings = Object.keys(imageMapping).reduce((acc, key) => {
	const pathInfo = extractPathInfo(imageMapping[key])

	acc[key] = pathInfo

	return acc
}, {} as { [key: string]: { full: string; short: string } })

console.group('\n')
console.log('⭐ ITEM COUNT:', Object.keys(json.items).length)
console.log('🍳 RECIPE COUNT:', Object.keys(json.recipes).length)
console.log('🏛️ BUILDING COUNT:', Object.keys(json.buildings).length)
console.log('⛽ GENERATOR COUNT:', Object.keys(json.generators).length)
console.log('⛏️ MINER COUNT:', Object.keys(json.miners).length)
console.log('🪨 RESOURCE COUNT:', Object.keys(json.resources).length)
console.log('📜 SCHEMATIC COUNT:', Object.keys(json.schematics).length)
console.log('\n')
console.log('🐛 SLUGS', slugs.length)
// console.log(
// 	slugs
// 		.sort()
// 		.map(x => ` - ${x}`)
// 		.join('\n')
// )
console.log('🗾 IMAGES', Object.keys(imageMappings).length)
// console.log(
// 	Object.values(imageMappings)
// 		.map(x => ` - ${x.short}`)
// 		.sort()
// 		.join('\n')
// )
console.groupEnd()

fs.writeFileSync(path.join(outputDir, 'output.json'), JSON.stringify(json, null, '\t') + '\n')

const diffGenerator = new DiffGenerator()
fs.writeFileSync(path.join(outputDir, 'diff.txt'), DiffFormatter.diffToMarkdown(diffGenerator.generateDiff(oldData, json)))

fs.writeFileSync(path.join(outputDir, 'imageMapping.json'), JSON.stringify(imageMappings, null, '\t') + '\n')
