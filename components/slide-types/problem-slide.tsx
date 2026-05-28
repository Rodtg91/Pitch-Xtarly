interface ProblemContent {
	title: string;
	points: { emoji: string; text: string }[];
}

export function ProblemSlide({ content }: { content: ProblemContent }) {
	return (
		<div
			className="flex flex-col justify-center h-full px-16 py-12"
			style={{ background: "var(--slide-bg)" }}
		>
			<h2
				className="text-4xl md:text-5xl font-bold mb-12"
				style={{ color: "var(--slide-text)" }}
			>
				{content.title}
			</h2>
			<div className="space-y-6">
				{content.points.map((point, i) => (
					<div key={i} className="flex items-start gap-5">
						<span className="text-4xl leading-none mt-1">{point.emoji}</span>
						<p
							className="text-2xl leading-relaxed"
							style={{ color: "var(--slide-text-secondary)" }}
						>
							{point.text}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
