interface Plan {
	name: string;
	price: string;
	period: string;
	highlight: boolean;
	features: string[];
}

interface PricingContent {
	title: string;
	plans: Plan[];
}

export function PricingSlide({ content }: { content: PricingContent }) {
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
			<div className="grid grid-cols-3 gap-6">
				{content.plans.map((plan, i) => {
					if (plan.highlight) {
						return (
							<div
								key={i}
								className="rounded-2xl p-6 flex flex-col scale-105"
								style={{
									background: "var(--brand-gradient-bg)",
									border: "1px solid rgba(98,229,255,0.3)",
									boxShadow: "0 8px 40px rgba(124,92,255,0.35)",
								}}
							>
								<div
									className="text-xs font-semibold uppercase tracking-widest mb-3"
									style={{ color: "var(--brand-cyan)" }}
								>
									Más popular
								</div>
								<div className="text-xl font-bold mb-1" style={{ color: "#f8f9fa" }}>
									{plan.name}
								</div>
								<div className="mb-4">
									<span className="text-4xl font-bold" style={{ color: "#f8f9fa" }}>
										{plan.price}
									</span>
									<span className="text-sm ml-1" style={{ color: "rgba(248,249,250,0.6)" }}>
										/{plan.period}
									</span>
								</div>
								<ul className="space-y-2 flex-1">
									{plan.features.map((f, j) => (
										<li key={j} className="flex items-center gap-2 text-sm">
											<span style={{ color: "var(--brand-cyan)" }}>✓</span>
											<span style={{ color: "rgba(248,249,250,0.85)" }}>{f}</span>
										</li>
									))}
								</ul>
							</div>
						);
					}
					return (
						<div
							key={i}
							className="rounded-2xl p-6 flex flex-col"
							style={{
								background: "var(--slide-surface)",
								border: "1px solid var(--slide-border)",
							}}
						>
							<div
								className="text-xl font-bold mb-1"
								style={{ color: "var(--slide-text)" }}
							>
								{plan.name}
							</div>
							<div className="mb-4">
								<span
									className="text-4xl font-bold"
									style={{ color: "var(--slide-text)" }}
								>
									{plan.price}
								</span>
								<span
									className="text-sm ml-1"
									style={{ color: "var(--slide-text-muted)" }}
								>
									/{plan.period}
								</span>
							</div>
							<ul className="space-y-2 flex-1">
								{plan.features.map((f, j) => (
									<li key={j} className="flex items-center gap-2 text-sm">
										<span style={{ color: "var(--brand-violet)" }}>✓</span>
										<span style={{ color: "var(--slide-text-secondary)" }}>{f}</span>
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
}
