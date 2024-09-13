import { IBuildingMetadataSchema, IManufacturerAnyPowerMetadataSchema } from '../schema/IBuildingMetadataSchema'
import { ISizeSchema } from '../schema/ISizeSchema'

export interface IBuildingSchema {
	slug: string
	name: string
	description: string
	className: string
	categories: string[]
	buildMenuPriority: number
	metadata: IBuildingMetadataSchema
	size: ISizeSchema
}

export interface IManufacturerSchema extends IBuildingSchema {
	metadata: IManufacturerAnyPowerMetadataSchema
}
