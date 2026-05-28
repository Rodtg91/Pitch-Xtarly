interface SolutionContent {
	title: string;
	description: string;
	benefitPoints: string[];
}

export function SolutionSlide({ content }: { content: SolutionContent }) {
	return (
		<div
			className="flex flex-col justify-center h-full px-16 py-12"
			style={{ background: "var(--slide-bg)" }}
		>
			<h2
				className="text-4xl md:text-5xl font-bold mb-6"
				style={{ color: "var(--slide-text)" }}
			>
				{content.title}
			</h2>
			<p
				className="text-xl mb-10 max-w-3xl leading-relaxed"
				style={{ color: "var(--slide-text-secondary)" }}
			>
				{content.description}
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{content.benefitPoints.map((point, i) => (
					<div
						key={i}
						className="rounded-2xl p-6"
						style={{
							background: "var(--slide-accent-subtle)",
							border: "1px solid var(--slide-accent-border)",
						}}
					>
						<div
							className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-3"
							style={{
								background: "var(--brand-violet)",
								color: "#f8f9fa",
							}}
						>
							{i + 1}
						</div>
						<p
							className="text-lg leading-snug"
							style={{ color: "var(--slide-text)" }}
						>
							{point}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
