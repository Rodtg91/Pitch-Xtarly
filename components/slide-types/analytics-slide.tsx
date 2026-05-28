interface KpiCard {
	label: string;
	value: string;
	delta?: string;
	positive?: boolean;
}

interface AnalyticsContent {
	headline: string;
	subheadline?: string;
	kpis?: KpiCard[];
	segments?: { label: string; count: number; color: string }[];
}

const DEFAULT_KPIS: KpiCard[] = [
	{ label: "Clientes activos", value: "342", delta: "+18 este mes", positive: true },
	{ label: "Membership rate", value: "34%", delta: "+4% vs mes ant.", positive: true },
	{ label: "Member lift", value: "+28%", delta: "vs sin programa", positive: true },
	{ label: "Ticket promedio", value: "$247", delta: "+$31 con loyalty", positive: true },
];

const DEFAULT_SEGMENTS = [
	{ label: "Champions", count: 47, color: "#22c55e" },
	{ label: "Leales", count: 123, color: "#62E5FF" },
	{ label: "En riesgo", count: 38, color: "#f59e0b" },
	{ label: "Nuevos", count: 89, color: "#7C5CFF" },
	{ label: "Perdidos", count: 21, color: "#ef4444" },
];

export function AnalyticsSlide({ content }: { content: AnalyticsContent }) {
	const kpis = content.kpis?.length ? content.kpis : DEFAULT_KPIS;
	const segments = content.segments?.length ? content.segments : DEFAULT_SEGMENTS;
	const total = segments.reduce((acc, s) => acc + s.count, 0);

	return (
		<div
			className="slide-root"
			style={{
				background: "var(--slide-bg)",
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: "0",
			}}
		>
			{/* Left: KPIs */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "10% 5% 10% 11%",
					borderRight: "1px solid var(--slide-border)",
				}}
			>
				<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", color: "var(--slide-text)", marginBottom: "0.6rem" }}
				>
					{content.headline}
				</h2>
				{content.subheadline && (
					<p
						className="slide-body"
						style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "var(--slide-text-secondary)", marginBottom: "2rem" }}
					>
						{content.subheadline}
					</p>
				)}

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "1px",
						background: "var(--slide-border)",
						border: "1px solid var(--slide-border)",
						borderRadius: "12px",
						overflow: "hidden",
					}}
				>
					{kpis.map((kpi, i) => (
						<div
							key={i}
							style={{
								background: "var(--slide-bg)",
								padding: "1rem 1.25rem",
							}}
						>
							<span className="slide-label" style={{ color: "var(--slide-text-muted)", display: "block", marginBottom: "0.4rem" }}>
								{kpi.label}
							</span>
							<div
								className="slide-number-hero"
								style={{
									fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
									color: "var(--slide-text)",
									marginBottom: "0.25rem",
								}}
							>
								{kpi.value}
							</div>
							{kpi.delta && (
								<span
									style={{
										fontSize: "0.65rem",
										fontWeight: 600,
										color: kpi.positive ? "#22c55e" : "#ef4444",
									}}
								>
									{kpi.positive ? "↑" : "↓"} {kpi.delta}
								</span>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Right: RFM Segments */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "10% 11% 10% 5%",
				}}
			>
				<span className="slide-label" style={{ color: "var(--slide-text-muted)", marginBottom: "1.5rem" }}>
					Segmentos RFM — {total} clientes
				</span>

				{/* Stacked bar */}
				<div style={{ display: "flex", borderRadius: "4px", overflow: "hidden", height: "8px", marginBottom: "1.75rem" }}>
					{segments.map((s, i) => (
						<div
							key={i}
							style={{
								width: `${(s.count / total) * 100}%`,
								background: s.color,
								opacity: 0.9,
							}}
						/>
					))}
				</div>

				{/* Segment rows */}
				<div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
					{segments.map((s, i) => (
						<div
							key={i}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "0.6rem 0",
								borderBottom: i < segments.length - 1 ? "1px solid var(--slide-border)" : "none",
							}}
						>
							<div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
								<div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color, flexShrink: 0 }} />
								<span
									className="slide-body"
									style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "var(--slide-text-secondary)" }}
								>
									{s.label}
								</span>
							</div>
							<div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
								{/* Animated bar */}
								<div style={{ width: "80px", height: "4px", background: "var(--slide-border)", borderRadius: "2px", overflow: "hidden" }}>
									<div
										className="chart-bar-x"
										style={{
											height: "100%",
											width: `${Math.max(8, (s.count / total) * 100)}%`,
											background: s.color,
											borderRadius: "2px",
											animationDelay: `${i * 110}ms`,
										}}
									/>
								</div>
								<span
									className="slide-number-hero"
									style={{ fontSize: "clamp(0.75rem, 1.3vw, 1rem)", color: "var(--slide-text)", minWidth: "2rem", textAlign: "right" }}
								>
									{s.count}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
