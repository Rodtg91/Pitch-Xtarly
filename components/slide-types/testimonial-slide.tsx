interface TestimonialContent {
	quote: string;
	author: string;
	business: string;
}

// Mantiene gradiente de marca — momento de prueba social, necesita peso emocional.
export function TestimonialSlide({ content }: { content: TestimonialContent }) {
	return (
		<div
			className="flex flex-col items-center justify-center h-full px-20 py-12 text-center"
			style={{ background: "var(--brand-gradient-bg)" }}
		>
			<div
				className="text-6xl font-serif mb-6 leading-none"
				style={{ color: "var(--brand-violet)", opacity: 0.7 }}
			>
				"
			</div>
			<p
				className="text-2xl md:text-3xl leading-relaxed mb-10 max-w-4xl"
				style={{ color: "#f8f9fa" }}
			>
				{content.quote}
			</p>
			<div
				className="w-16 h-px mb-6"
				style={{ background: "rgba(98,229,255,0.4)" }}
			/>
			<p className="text-xl font-semibold" style={{ color: "#f8f9fa" }}>
				{content.author}
			</p>
			<p style={{ color: "var(--brand-cyan)", opacity: 0.8 }}>
				{content.business}
			</p>
		</div>
	);
}
