interface SolutionContent {
	title: string;
	description: string;
	benefitPoints: string[];
}

export function SolutionSlide({ content }: { content: SolutionContent }) {
	return (
		<div className="flex flex-col justify-center h-full px-16 py-12 bg-gradient-to-br from-indigo-950 to-gray-950">
			<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{content.title}</h2>
			<p className="text-xl text-indigo-200 mb-10 max-w-3xl leading-relaxed">{content.description}</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{content.benefitPoints.map((point, i) => (
					<div key={i} className="bg-indigo-900/40 border border-indigo-700/50 rounded-2xl p-6">
						<div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">
							{i + 1}
						</div>
						<p className="text-lg text-white">{point}</p>
					</div>
				))}
			</div>
		</div>
	);
}
