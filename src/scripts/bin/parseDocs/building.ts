import { IBuildingMetadataSchema, IManufacturerAnyPowerMetadataSchema } from '../schema/IBuildingMetadataSchema'
import { IBuildingSchema } from '../schema/IBuildingSchema'
import { Strings } from '../utils/Strings'

export default function parseBuildings(
	buildings: {
		ClassName: string
		mDisplayName: string
		mDescription: string
		mSpeed?: string
		mLengthPerCost?: string
		mMaxLength?: string
		mManufacturingSpeed?: string
		mPowerConsumption?: string
		mPowerConsumptionExponent?: string
		mInventorySizeX?: string
		mInventorySizeY?: string
		mFlowLimit?: string
		mDesignPressure?: string
		mStorageCapacity?: string
		mSize?: number
		mHeight?: number
		mWidth?: number
		mEstimatedMininumPowerConsumption?: string
		mEstimatedMaximumPowerConsumption?: string
	}[],
	fixClassName: boolean = false
): IBuildingSchema[] {
	const ignored = [
		'Build_JumpPadTilted_C',
		'Build_JumpPad_C',
		'Build_Stair_1b_C',
		'Build_Snowman_C',
		'Build_WreathDecor_C',
		'Build_XmassLightsLine_C',
		'Build_XmassTree_C',
		'Build_CandyCaneDecor_C',
	]

	const wrongMapping: { [key: string]: string } = {
		Build_WalkwayTrun_C: 'Desc_WalkwayTurn_C', // nice typo CSS
		Build_CatwalkCorner_C: 'Desc_CatwalkTurn_C', // to match descriptor name
		Build_PowerPoleWall_Mk2_C: 'Desc_PowerPoleWallMk2_C',
		Build_PowerPoleWall_Mk3_C: 'Desc_PowerPoleWallMk3_C',
		Build_PowerPoleWallDouble_Mk2_C: 'Desc_PowerPoleWallDoubleMk2_C',
		Build_PowerPoleWallDouble_Mk3_C: 'Desc_PowerPoleWallDoubleMk3_C',
	}

	const result: IBuildingSchema[] = []
	for (const building of buildings) {
		if (ignored.indexOf(building.ClassName) !== -1) {
			continue
		}

		const metadata: IBuildingMetadataSchema | IManufacturerAnyPowerMetadataSchema = {}

		if (typeof building.mSpeed !== 'undefined') {
			metadata.beltSpeed = parseFloat(building.mSpeed) / 2
			metadata.firstPieceCostMultiplier = 1
			metadata.lengthPerCost = 200 // belts don't have lengthPerCost attribute, but they build two meters per cost
			metadata.maxLength = 4900 // belts don't have maxLength attribute, but they have max length of 49 meters
		}

		if (typeof building.mLengthPerCost !== 'undefined') {
			metadata.lengthPerCost = parseFloat(building.mLengthPerCost)
			metadata.firstPieceCostMultiplier = 1
		}

		if (typeof building.mMaxLength !== 'undefined') {
			metadata.maxLength = parseFloat(building.mMaxLength)
		}

		if (typeof building.mPowerConsumption !== 'undefined') {
			metadata.powerConsumption = parseFloat(building.mPowerConsumption)
		}

		if (typeof building.mPowerConsumptionExponent !== 'undefined') {
			metadata.powerConsumptionExponent = parseFloat(building.mPowerConsumptionExponent)
		}

		if (
			typeof building.mEstimatedMininumPowerConsumption !== 'undefined' &&
			typeof building.mEstimatedMaximumPowerConsumption !== 'undefined'
		) {
			metadata.isVariablePower = true
			metadata.minPowerConsumption = parseFloat(building.mEstimatedMininumPowerConsumption)
			metadata.maxPowerConsumption = parseFloat(building.mEstimatedMaximumPowerConsumption)
			metadata.powerConsumption = (metadata.minPowerConsumption + metadata.maxPowerConsumption) / 2
		}

		if (typeof building.mManufacturingSpeed !== 'undefined') {
			metadata.manufacturingSpeed = parseFloat(building.mManufacturingSpeed)
		}

		if (typeof building.mInventorySizeX !== 'undefined' && typeof building.mInventorySizeY !== 'undefined') {
			metadata.inventorySize = parseInt(building.mInventorySizeX) * parseInt(building.mInventorySizeY)
		}

		if (typeof building.mFlowLimit !== 'undefined') {
			metadata.flowLimit = parseFloat(building.mFlowLimit)
		}

		if (typeof building.mDesignPressure !== 'undefined') {
			metadata.maxPressure = parseFloat(building.mDesignPressure)
		}

		if (typeof building.mStorageCapacity !== 'undefined') {
			metadata.storageCapacity = parseFloat(building.mStorageCapacity)
		}

		if (building.ClassName === 'Desc_RailroadTrack_C') {
			metadata.firstPieceCostMultiplier = 2
			metadata.lengthPerCost = 12
		} else if (building.ClassName in wrongMapping) {
			// nice typo CSS
			building.ClassName = wrongMapping[building.ClassName]
		}

		let slug = Strings.webalize(building.mDisplayName)
		if (building.ClassName.match(/Steel/) || building.ClassName === 'Build_Wall_8x4_02_C') {
			slug += '-steel'
		} else if (building.ClassName.match(/Polished/)) {
			slug += '-polished'
		} else if (building.ClassName.match(/Metal/)) {
			slug += '-metal'
		} else if (building.ClassName.match(/Concrete/)) {
			slug += '-concrete'
		} else if (building.ClassName.match(/Asphalt/)) {
			slug += '-asphalt'
		}

		const size = {
			width: 0,
			length: 0,
			height: 0,
		}
		if (building.mSize) {
			size.width = size.length = building.mSize / 100
		}
		if (building.mHeight) {
			size.height = building.mHeight / 100
		}
		if (building.mWidth) {
			size.width = building.mWidth / 100
		}

		result.push({
			slug: slug,
			name: building.mDisplayName,
			description: building.mDescription.replace(/\r\n/gi, '\n'),
			categories: [],
			buildMenuPriority: 0,
			className: fixClassName ? building.ClassName.replace('Build_', 'Desc_') : building.ClassName,
			metadata: metadata,
			size: size,
		})
	}
	return result
}
