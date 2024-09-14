import Image from 'next/image'
import { redirect } from 'next/navigation'

import notFound from '@/app/404.png'

export default function NotFound() {
	redirect(`/`)

	return (
		<div className="bg-white justify-center items-center flex w-full">
			<Image src={notFound} alt="404" className="w-96" width={384} />
		</div>
	)
}
