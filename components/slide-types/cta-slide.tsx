interface CtaContent {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaUrl?: string;
	contact?: {
		whatsapp?: string;
		email?: string;
		web?: string;
	};
}

// El CTA siempre usa gradiente de marca — es el clímax visual y de conversión.
export function CtaSlide({ content }: { content: CtaContent }) {
	return (
		<div
			className="flex flex-col items-center justify-center h-full px-16 py-12 text-center"
			style={{ background: "var(--brand-gradient-bg)" }}
		>
			<h2
				className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
				style={{ color: "#f8f9fa" }}
			>
				{content.title}
			</h2>
			<p
				className="text-xl mb-10"
				style={{ color: "rgba(248,249,250,0.7)" }}
			>
				{content.subtitle}
			</p>

			<a
				href={content.ctaUrl ?? "#"}
				target="_blank"
				rel="noopener noreferrer"
				className="font-bold text-xl px-10 py-4 rounded-full transition-opacity hover:opacity-90 mb-12"
				style={{
					background: "linear-gradient(135deg, var(--brand-cyan), var(--brand-violet))",
					color: "#f8f9fa",
					boxShadow: "0 4px 30px rgba(98,229,255,0.3)",
				}}
			>
				{content.ctaText}
			</a>

			{content.contact && (
				<div className="flex flex-wrap justify-center gap-8" style={{ color: "rgba(248,249,250,0.6)" }}>
					{content.contact.whatsapp && (
						<div className="flex items-center gap-2">
							<span className="text-xl">📱</span>
							<span className="text-lg">{content.contact.whatsapp}</span>
						</div>
					)}
					{content.contact.email && (
						<div className="flex items-center gap-2">
							<span className="text-xl">✉️</span>
							<span className="text-lg">{content.contact.email}</span>
						</div>
					)}
					{content.contact.web && (
						<div className="flex items-center gap-2">
							<span className="text-xl">🌐</span>
							<span className="text-lg">{content.contact.web}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
