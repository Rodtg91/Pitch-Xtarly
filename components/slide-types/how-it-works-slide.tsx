interface Step {
	number: number;
	icon: string;
	title: string;
	description: string;
}

interface HowItWorksContent {
	headline: string;
	subheadline?: string;
	steps: Step[];
}

const DEFAULT_STEPS: Step[] = [
	{
		number: 1,
		icon: "⬛",
		title: "El cajero muestra el QR",
		description: "En tablet o impreso en caja. Sin hardware extra, sin instalaciones.",
	},
	{
		number: 2,
		icon: "📱",
		title: "El cliente escanea",
		description: "Con la cámara de su teléfono. Sus puntos o sellos se suman al instante.",
	},
	{
		number: 3,
		icon: "★",
		title: "Aparece en su Wallet",
		description: "La tarjeta se actualiza en Apple Wallet y Google Wallet automáticamente.",
	},
];

export function HowItWorksSlide({ content }: { content: HowItWorksContent }) {
	const steps = content.steps?.length ? content.steps : DEFAULT_STEPS;

	return (
		<div
			className="flex flex-col justify-center h-full px-16 py-12"
			style={{ background: "var(--slide-bg)" }}
		>
			<h2
				className="text-4xl md:text-5xl font-bold mb-3 leading-tight"
				style={{ color: "var(--slide-text)" }}
			>
				{content.headline}
			</h2>
			{content.subheadline && (
				<p
					className="text-lg mb-12 max-w-xl"
					style={{ color: "var(--slide-text-secondary)" }}
				>
					{content.subheadline}
				</p>
			)}

			<div className="flex items-start gap-0 mt-4">
				{steps.map((step, i) => (
					<div key={i} className="flex flex-1 items-start gap-0 relative">
						{/* Step card */}
						<div className="flex-1 flex flex-col items-center text-center px-4">
							{/* Circle number */}
							<div
								className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mb-5 flex-shrink-0"
								style={{
									background: "var(--brand-gradient-bg)",
									border: "1px solid rgba(98,229,255,0.25)",
									boxShadow: "0 4px 20px rgba(124,92,255,0.25)",
									color: "#f8f9fa",
								}}
							>
								{step.number}
							</div>

							{/* Icon */}
							<div className="text-4xl mb-4">{step.icon}</div>

							<h3
								className="text-xl font-bold mb-2"
								style={{ color: "var(--slide-text)" }}
							>
								{step.title}
							</h3>
							<p
								className="text-sm leading-relaxed max-w-[200px]"
								style={{ color: "var(--slide-text-secondary)" }}
							>
								{step.description}
							</p>
						</div>

						{/* Arrow connector (not on last item) */}
						{i < steps.length - 1 && (
							<div
								className="flex-shrink-0 self-center mt-[-80px] text-2xl"
								style={{ color: "var(--brand-violet)", opacity: 0.5 }}
							>
								→
							</div>
						)}
					</div>
				))}
			</div>

			{/* Bottom note */}
			<div
				className="mt-10 rounded-xl px-5 py-3 inline-flex items-center gap-2 self-start"
				style={{
					background: "var(--slide-surface)",
					border: "1px solid var(--slide-border)",
				}}
			>
				<span style={{ color: "var(--brand-cyan)" }}>⚡</span>
				<span className="text-sm" style={{ color: "var(--slide-text-secondary)" }}>
					Sin hardware adicional. Sin app para el cajero. Solo un QR.
				</span>
			</div>
		</div>
	);
}
