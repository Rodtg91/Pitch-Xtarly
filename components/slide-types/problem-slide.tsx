interface ProblemContent {
	title: string;
	points: { emoji: string; text: string }[];
}

export function ProblemSlide({ content }: { content: ProblemContent }) {
	return (
		<div className="flex flex-col justify-center h-full px-16 py-12 bg-gray-950">
			<h2 className="text-4xl md:text-5xl font-bold text-white mb-12">{content.title}</h2>
			<div className="space-y-6">
				{content.points.map((point, i) => (
					<div key={i} className="flex items-start gap-5">
						<span className="text-4xl">{point.emoji}</span>
						<p className="text-2xl text-gray-200 leading-relaxed">{point.text}</p>
					</div>
				))}
			</div>
		</div>
	);
}
