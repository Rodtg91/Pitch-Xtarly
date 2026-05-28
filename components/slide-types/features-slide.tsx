interface FeaturesContent {
	title: string;
	features: { emoji: string; title: string; description: string }[];
}

export function FeaturesSlide({ content }: { content: FeaturesContent }) {
	return (
		<div
			className="flex flex-col justify-center h-full px-16 py-12"
			style={{ background: "var(--slide-bg)" }}
		>
			<h2
				className="text-4xl md:text-5xl font-bold mb-10"
				style={{ color: "var(--slide-text)" }}
			>
				{content.title}
			</h2>
			<div className="grid grid-cols-2 gap-6">
				{content.features.map((f, i) => (
					<div
						key={i}
						className="flex items-start gap-5 rounded-2xl p-6"
						style={{
							background: "var(--slide-surface)",
							border: "1px solid var(--slide-border)",
						}}
					>
						<span className="text-4xl leading-none mt-0.5">{f.emoji}</span>
						<div>
							<h3
								className="text-xl font-semibold mb-1"
								style={{ color: "var(--slide-text)" }}
							>
								{f.title}
							</h3>
							<p
								className="text-base leading-relaxed"
								style={{ color: "var(--slide-text-secondary)" }}
							>
								{f.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
