type Props = { params: { className: string } }

export default function Page({ params }: Props) {
	return (
		<div className="text-primary">
			<div>Item: {params.className}</div>
		</div>
	)
}
