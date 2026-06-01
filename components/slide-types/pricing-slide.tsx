interface Plan {
	name: string;
	price: string;
	period?: string;
	highlight?: boolean;
	features: string[];
	trial?: string;
	lifetime?: boolean;
	// legacy compat
	cta?: string;
}

interface PricingContent {
	title: string;
	plans: Plan[];
}

const DEFAULT_PLANS: Plan[] = [
	{
		name: "Wallet",
		price: "19 US$",
		period: "mes",
		trial: "14 días de prueba gratis",
		features: [
			"Sin app móvil — tarjetas en Apple Wallet y Google Wallet",
			"Notificaciones personalizadas y por geolocalización",
			"Hasta 300 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Analíticas avanzadas con KPIs y RFM",
		],
	},
	{
		name: "Shared",
		price: "29 US$",
		period: "mes",
		highlight: true,
		trial: "14 días de prueba gratis",
		features: [
			"Tarjetas digitales en Apple Wallet y Google Wallet",
			"App marketplace compartida (sin marca blanca)",
			"Hasta 600 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Dashboard completo con KPIs y RFM",
		],
	},
	{
		name: "Branded",
		price: "99 US$",
		period: "mes",
		features: [
			"Tu propia app marca blanca (basada en plantilla)",
			"Hasta 2,000 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Dashboard completo con KPIs y RFM",
			"Notificaciones por WhatsApp Business",
		],
	},
	{
		name: "Premium",
		price: "299 US$",
		period: "mes",
		features: [
			"App móvil totalmente personalizada (diseño a medida)",
			"Hasta 6,000 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Notificaciones por WhatsApp Business",
			"REST API, webhooks y onboarding prioritario",
		],
	},
];

function isFounderLifetime(plan: Plan) {
	return plan.name?.trim().toLowerCase() === "founder lifetime";
}

function Dot({ highlight }: { highlight?: boolean }) {
	return (
		<span
			style={{
				display: "inline-block",
				width: "6px",
				height: "6px",
				borderRadius: "50%",
				background: highlight ? "#7C5CFF" : "#7C5CFF",
				flexShrink: 0,
				marginTop: "0.4em",
			}}
		/>
	);
}

function PlanCard({ plan, compact }: { plan: Plan; compact?: boolean }) {
	const pad = compact ? "0.9rem 0.85rem 1rem" : "1.1rem 1rem 1.2rem";
	const fSize = "clamp(0.58rem, 0.95vw, 0.75rem)";

	return (
		<div
			style={{
				borderRadius: "16px",
				border: plan.highlight ? "2px solid #7C5CFF" : "1px solid var(--slide-border)",
				background: plan.highlight ? "rgba(124,92,255,0.08)" : "var(--slide-surface)",
				padding: pad,
				display: "flex",
				flexDirection: "column",
				gap: "0.6rem",
				position: "relative",
				paddingTop: plan.highlight ? "1.75rem" : pad.split(" ")[0],
			}}
		>
			{/* Recomendado badge */}
			{plan.highlight && (
				<div
					style={{
						position: "absolute",
						top: "-11px",
						left: "50%",
						transform: "translateX(-50%)",
						background: "#7C5CFF",
						borderRadius: "999px",
						padding: "2px 10px",
						fontSize: "9px",
						fontWeight: 700,
						color: "#fff",
						whiteSpace: "nowrap",
						display: "flex",
						alignItems: "center",
						gap: "4px",
					}}
				>
					★ Recomendado
				</div>
			)}

			{/* Name */}
			<h3
				className="slide-heading"
				style={{
					fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)",
					color: plan.highlight ? "#7C5CFF" : "var(--slide-text)",
					margin: 0,
					fontWeight: plan.highlight ? 700 : 600,
				}}
			>
				{plan.name}
			</h3>

			{/* Features */}
			<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
				{plan.features.map((f, i) => (
					<li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
						<Dot highlight={plan.highlight} />
						<span className="slide-body" style={{ fontSize: fSize, color: "var(--slide-text-secondary)", lineHeight: 1.4 }}>
							{f}
						</span>
					</li>
				))}
			</ul>

			{/* Trial */}
			{plan.trial && (
				<span style={{ fontSize: "clamp(0.55rem, 0.85vw, 0.68rem)", color: "#62E5FF", opacity: 0.85, fontWeight: 500 }}>
					◎ {plan.trial}
				</span>
			)}

			{/* Price */}
			<div style={{ borderTop: "1px solid var(--slide-border)", paddingTop: "0.5rem", marginTop: "0.1rem" }}>
				<strong style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)", color: "var(--slide-text)", fontWeight: 600 }}>
					{plan.price}
				</strong>
				{plan.period && (
					<span className="slide-body" style={{ fontSize: "clamp(0.55rem, 0.8vw, 0.65rem)", color: "var(--slide-text-muted)", marginLeft: "0.25rem" }}>
						/ {plan.period}
					</span>
				)}
			</div>
		</div>
	);
}

export function PricingSlide({ content }: { content: PricingContent }) {
	const plans = (content.plans?.length ? content.plans : DEFAULT_PLANS)
		.filter((p) => !isFounderLifetime(p))
		.map((p) => ({
			...p,
			// normalize legacy format: "$19" → "19 US$"
			price: p.price?.startsWith("$") ? p.price.replace("$", "") + " US$" : (p.price ?? ""),
		}));

	return (
		<div
			className="slide-root slide-pricing"
			style={{
				background: "var(--slide-bg)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "5% 5% 4%",
			}}
		>
			{/* Header */}
			<div className="slide-pricing-header" style={{ marginBottom: "2.5%" }}>
				<div className="slide-rule" style={{ marginBottom: "0.75rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.1rem, 2.5vw, 2rem)", color: "var(--slide-text)" }}
				>
					{content.title}
				</h2>
			</div>

			{/* Todos los planes en el mismo grid */}
			<div
				className="slide-pricing-grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${plans.length}, 1fr)`,
					gap: "clamp(4px, 0.6vw, 10px)",
				}}
			>
				{plans.map((plan) => (
					<PlanCard key={plan.name} plan={plan} compact={plans.length >= 4} />
				))}
			</div>

		</div>
	);
}
