interface FeaturesContent {
	title: string;
	features: { emoji: string; title: string; description: string }[];
}

export function FeaturesSlide({ content }: { content: FeaturesContent }) {
	return (
		<div className="flex flex-col justify-center h-full px-16 py-12 bg-gray-950">
			<h2 className="text-4xl md:text-5xl font-bold text-white mb-10">{content.title}</h2>
			<div className="grid grid-cols-2 gap-6">
				{content.features.map((f, i) => (
					<div
						key={i}
						className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-2xl p-6"
					>
						<span className="text-4xl">{f.emoji}</span>
						<div>
							<h3 className="text-xl font-semibold text-white mb-1">{f.title}</h3>
							<p className="text-gray-400 text-base">{f.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
