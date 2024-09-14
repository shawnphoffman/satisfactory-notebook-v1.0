export function Fraction({ children: fraction }: { children: string | undefined }) {
	if (!fraction) return null

	if (fraction.indexOf('/') < 0) return fraction

	const splits = fraction.split(' ')
	const hasWhole = fraction.includes(' ')
	const whole = hasWhole ? splits[0] : null
	const numer = hasWhole ? splits[1].split('/')[0] : splits[0].split('/')[0]
	const denom = hasWhole ? splits[1].split('/')[1] : splits[0].split('/')[1]

	return (
		<>
			{whole && `${whole}`}
			<span className="text-xs ms-px me-0.5">
				<sup>{numer}</sup>&frasl;<sub>{denom}</sub>
			</span>
		</>
	)
}
