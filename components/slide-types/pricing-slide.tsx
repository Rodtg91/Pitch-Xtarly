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
			className="slide-root"
			style={{
				background: "var(--slide-bg)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "6% 8%",
			}}
		>
			<div style={{ marginBottom: "4%" }}>
				<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "var(--slide-text)" }}
				>
					{content.title}
				</h2>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: `repeat(${content.plans.length}, 1fr)`, gap: "1px", background: "var(--slide-border)", border: "1px solid var(--slide-border)", borderRadius: "14px", overflow: "hidden" }}>
				{content.plans.map((plan, i) => (
					<div
						key={i}
						style={{
							background: plan.highlight ? "#1B1638" : "var(--slide-bg)",
							padding: "1.5rem 1.5rem 1.75rem",
							display: "flex",
							flexDirection: "column",
							position: "relative",
						}}
					>
						{plan.highlight && (
							<span
								style={{
									position: "absolute",
									top: "0.875rem",
									right: "1rem",
									fontSize: "9px",
									fontWeight: 700,
									letterSpacing: "0.08em",
									textTransform: "uppercase",
									color: "#62E5FF",
									opacity: 0.8,
								}}
							>
								Recomendado
							</span>
						)}

						{/* Name */}
						<span
							className="slide-label"
							style={{ color: plan.highlight ? "rgba(248,249,250,0.45)" : "var(--slide-text-muted)", marginBottom: "0.75rem" }}
						>
							{plan.name}
						</span>

						{/* Price */}
						<div style={{ marginBottom: "1.25rem" }}>
							<span
								className="slide-number-hero"
								style={{
									fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
									color: plan.highlight ? "#f8f9fa" : "var(--slide-text)",
								}}
							>
								{plan.price}
							</span>
							<span
								className="slide-body"
								style={{
									fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
									color: plan.highlight ? "rgba(248,249,250,0.4)" : "var(--slide-text-muted)",
									marginLeft: "0.3rem",
								}}
							>
								/{plan.period}
							</span>
						</div>

						{/* Divider */}
						<div style={{ height: "1px", background: plan.highlight ? "rgba(255,255,255,0.08)" : "var(--slide-border)", marginBottom: "1rem" }} />

						{/* Features */}
						<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
							{plan.features.map((f, j) => (
								<li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
									<span style={{ color: plan.highlight ? "#62E5FF" : "#7C5CFF", fontSize: "0.75rem", flexShrink: 0, marginTop: "0.1em" }}>✓</span>
									<span
										className="slide-body"
										style={{
											fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
											color: plan.highlight ? "rgba(248,249,250,0.75)" : "var(--slide-text-secondary)",
											lineHeight: 1.45,
										}}
									>
										{f}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
