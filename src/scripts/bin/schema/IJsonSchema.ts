import { IBuildingSchema } from '../schema/IBuildingSchema'
import { IGeneratorSchema } from '../schema/IGeneratorSchema'
import { IItemSchema } from '../schema/IItemSchema'
import { IMinerSchema } from '../schema/IMinerSchema'
import { IAnyRecipeSchema } from '../schema/IRecipeSchema'
import { IResourceSchema } from '../schema/IResourceSchema'
import { ISchematicSchema } from '../schema/ISchematicSchema'

export interface IJsonSchema {
	items: { [key: string]: IItemSchema }
	recipes: { [key: string]: IAnyRecipeSchema }
	schematics: { [key: string]: ISchematicSchema }
	generators: { [key: string]: IGeneratorSchema }
	resources: { [key: string]: IResourceSchema }
	miners: { [key: string]: IMinerSchema }
	buildings: { [key: string]: IBuildingSchema }
}
