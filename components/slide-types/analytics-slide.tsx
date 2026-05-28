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
	{ label: "Member lift", value: "+28%", delta: "vs clientes sin programa", positive: true },
	{ label: "Ticket promedio", value: "$247", delta: "+$31 con loyalty", positive: true },
];

const DEFAULT_SEGMENTS = [
	{ label: "Champions", count: 47, color: "#22c55e" },
	{ label: "Leales", count: 123, color: "var(--brand-cyan)" },
	{ label: "En riesgo", count: 38, color: "#f59e0b" },
	{ label: "Nuevos", count: 89, color: "var(--brand-violet)" },
	{ label: "Perdidos", count: 21, color: "#ef4444" },
];

export function AnalyticsSlide({ content }: { content: AnalyticsContent }) {
	const kpis = content.kpis?.length ? content.kpis : DEFAULT_KPIS;
	const segments = content.segments?.length ? content.segments : DEFAULT_SEGMENTS;
	const total = segments.reduce((acc, s) => acc + s.count, 0);

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
				<p className="text-lg mb-8" style={{ color: "var(--slide-text-secondary)" }}>
					{content.subheadline}
				</p>
			)}

			<div className="grid grid-cols-2 gap-6">
				{/* KPIs */}
				<div className="grid grid-cols-2 gap-4">
					{kpis.map((kpi, i) => (
						<div
							key={i}
							className="rounded-2xl p-5"
							style={{
								background: "var(--slide-surface)",
								border: "1px solid var(--slide-border)",
							}}
						>
							<p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--slide-text-muted)" }}>
								{kpi.label}
							</p>
							<p className="text-3xl font-bold leading-none mb-1" style={{ color: "var(--slide-text)" }}>
								{kpi.value}
							</p>
							{kpi.delta && (
								<p
									className="text-xs font-medium"
									style={{ color: kpi.positive ? "#22c55e" : "#ef4444" }}
								>
									{kpi.positive ? "↑" : "↓"} {kpi.delta}
								</p>
							)}
						</div>
					))}
				</div>

				{/* RFM Segments */}
				<div
					className="rounded-2xl p-6"
					style={{
						background: "var(--slide-surface)",
						border: "1px solid var(--slide-border)",
					}}
				>
					<p
						className="text-xs font-semibold uppercase tracking-widest mb-5"
						style={{ color: "var(--slide-text-muted)" }}
					>
						Segmentos RFM — {total} clientes
					</p>

					{/* Stacked bar */}
					<div className="flex rounded-full overflow-hidden h-3 mb-5">
						{segments.map((s, i) => (
							<div
								key={i}
								style={{
									width: `${(s.count / total) * 100}%`,
									background: s.color,
									opacity: 0.85,
								}}
							/>
						))}
					</div>

					<div className="space-y-3">
						{segments.map((s, i) => (
							<div key={i} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div
										className="w-2.5 h-2.5 rounded-full flex-shrink-0"
										style={{ background: s.color }}
									/>
									<span className="text-sm" style={{ color: "var(--slide-text-secondary)" }}>
										{s.label}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<div
										className="h-1.5 rounded-full"
										style={{
											width: `${(s.count / total) * 80}px`,
											background: s.color,
											opacity: 0.4,
											minWidth: 8,
										}}
									/>
									<span className="text-sm font-bold w-8 text-right" style={{ color: "var(--slide-text)" }}>
										{s.count}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
