import Image, { ImageProps } from 'next/image'

import imageMapping from '@/data/imageMapping.json'
import { IItemAmountSchema } from '@/scripts/bin/schema/IItemAmountSchema'
import { IAnyRecipeSchema } from '@/scripts/bin/schema/IRecipeSchema'

type Props = {
	itemClass: IAnyRecipeSchema['className'] | IItemAmountSchema['item'] | string
	alt: string
} & Partial<ImageProps>

type ImageMappingType = {
	[key: string]: { full: string; short: string }
}
const typedImageMapping: ImageMappingType = imageMapping

export default function ItemImage({ itemClass, alt, ...rest }: Props) {
	const image = typedImageMapping[itemClass]

	if (!image) {
		console.warn(`No image mapping found for ${itemClass}`)
		// TODO Return an icon or placeholder
		return null
	}

	return <Image {...rest} src={`/images/${image.short}`} alt={alt} />
}
