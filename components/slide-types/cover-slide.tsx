interface CoverContent {
	headline: string;
	subheadline: string;
	tagline?: string;
}

// Siempre usa el gradiente de marca — es el momento de apertura cinematográfico.
// El tema dark/light no lo altera; el contraste visual es intencional.
export function CoverSlide({ content }: { content: CoverContent }) {
	return (
		<div
			className="flex flex-col items-center justify-center h-full text-center px-16"
			style={{ background: "var(--brand-gradient-bg)" }}
		>
			<div
				className="mb-6 font-semibold tracking-widest uppercase text-sm"
				style={{ color: "var(--brand-cyan)", opacity: 0.9 }}
			>
				{content.tagline ?? "Xtarly Rewards"}
			</div>
			<h1
				className="text-5xl md:text-7xl font-bold leading-tight mb-6"
				style={{ color: "#f8f9fa" }}
			>
				{content.headline}
			</h1>
			<p
				className="text-xl md:text-2xl max-w-3xl leading-relaxed"
				style={{ color: "rgba(248,249,250,0.68)" }}
			>
				{content.subheadline}
			</p>
		</div>
	);
}
