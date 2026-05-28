interface RoiContent {
	headline: string;
	subheadline?: string;
	dailyVisits?: number;
	avgTicket?: number;
	enrollmentRate?: number;
	frequencyLift?: number;
	planCost?: number;
}

function formatMXN(n: number) {
	return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export function RoiSlide({ content }: { content: RoiContent }) {
	const visits = content.dailyVisits ?? 100;
	const ticket = content.avgTicket ?? 200;
	const enrollRate = (content.enrollmentRate ?? 30) / 100;
	const lift = (content.frequencyLift ?? 25) / 100;
	const planCost = content.planCost ?? 499;

	const baseMonthly = visits * ticket * 30;
	const membersPerDay = visits * enrollRate;
	const extraVisitsPerDay = membersPerDay * lift;
	const extraMonthly = extraVisitsPerDay * ticket * 30;
	const roi = Math.round((extraMonthly / planCost) * 100);

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
			{/* Left: ROI hero */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "7% 5% 7% 8%",
					borderRight: "1px solid var(--slide-border)",
				}}
			>
				<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", color: "var(--slide-text)", marginBottom: "0.5rem" }}
				>
					{content.headline}
				</h2>
				{content.subheadline && (
					<p
						className="slide-body"
						style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "var(--slide-text-secondary)", marginBottom: "2.5rem" }}
					>
						{content.subheadline}
					</p>
				)}

				{/* The ROI number — dominant visual element */}
				<div>
					<span className="slide-label" style={{ color: "var(--slide-text-muted)", display: "block", marginBottom: "0.5rem" }}>
						ROI estimado
					</span>
					<div
						className="slide-number-hero"
						style={{
							fontSize: "clamp(4rem, 9vw, 8rem)",
							color: "#7C5CFF",
							lineHeight: 0.9,
						}}
					>
						{roi.toLocaleString("es-MX")}%
					</div>
					<p
						className="slide-body"
						style={{
							fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)",
							color: "var(--slide-text-secondary)",
							marginTop: "0.75rem",
							maxWidth: "28ch",
						}}
					>
						El plan se paga con menos del 1% del ingreso extra generado.
					</p>
				</div>
			</div>

			{/* Right: breakdown de inputs + resultado */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "7% 8% 7% 5%",
				}}
			>
				<span className="slide-label" style={{ color: "var(--slide-text-secondary)", marginBottom: "1.5rem" }}>
					El cálculo
				</span>

				{/* Input stats */}
				{[
					{ label: "Visitas/día", value: `${visits}` },
					{ label: "Ticket promedio", value: formatMXN(ticket) },
					{ label: "Clientes identificados", value: `${Math.round(enrollRate * 100)}%` },
					{ label: "Aumento en frecuencia", value: `+${Math.round(lift * 100)}%` },
				].map((row, i) => (
					<div
						key={i}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0.65rem 0",
							borderBottom: "1px solid var(--slide-border)",
						}}
					>
						<span className="slide-body" style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "var(--slide-text-secondary)" }}>
							{row.label}
						</span>
						<span
							className="slide-number-hero"
							style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)", color: "var(--slide-text)" }}
						>
							{row.value}
						</span>
					</div>
				))}

				{/* Result rows */}
				<div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<span className="slide-body" style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "var(--slide-text-secondary)" }}>
							Ingreso extra/mes
						</span>
						<span
							className="slide-number-hero"
							style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)", color: "#22c55e" }}
						>
							{formatMXN(extraMonthly)}
						</span>
					</div>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<span className="slide-body" style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "var(--slide-text-muted)" }}>
							Costo del plan
						</span>
						<span
							className="slide-body"
							style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)", color: "var(--slide-text-muted)" }}
						>
							{formatMXN(planCost)}/mes
						</span>
					</div>
					<div style={{ paddingTop: "0.6rem", borderTop: "1px solid var(--slide-border)" }}>
						<span className="slide-body" style={{ fontSize: "clamp(0.65rem, 1vw, 0.75rem)", color: "var(--slide-text-muted)" }}>
							Ingresos actuales: {formatMXN(baseMonthly)}/mes
						</span>
					</div>

					{/* Gráfica comparativa animada */}
					<div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--slide-border)" }}>
						<span className="slide-label" style={{ color: "var(--slide-text-muted)", display: "block", marginBottom: "0.75rem" }}>
							Ingresos mensuales
						</span>
						<div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", height: "56px" }}>
							{/* Barra base */}
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
								<div
									className="chart-bar-y"
									style={{
										width: "28px",
										height: "34px",
										background: "var(--slide-surface-2)",
										border: "1px solid var(--slide-border)",
										borderRadius: "3px 3px 0 0",
										animationDelay: "0.1s",
									}}
								/>
								<span style={{ fontSize: "0.45rem", color: "var(--slide-text-muted)", whiteSpace: "nowrap" }}>Actual</span>
							</div>
							{/* Barra con Xtarly */}
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
								<div
									className="chart-bar-y"
									style={{
										width: "28px",
										height: `${Math.min(52, 34 + Math.round((extraMonthly / baseMonthly) * 28))}px`,
										background: "linear-gradient(to top, #7C5CFF, #62E5FF)",
										borderRadius: "3px 3px 0 0",
										animationDelay: "0.35s",
									}}
								/>
								<span style={{ fontSize: "0.45rem", color: "#62E5FF", whiteSpace: "nowrap" }}>Con Xtarly</span>
							</div>
							{/* Delta */}
							<div
								className="chart-fade"
								style={{ paddingBottom: "20px", animationDelay: "0.7s" }}
							>
								<span style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)", fontWeight: 700, color: "#22c55e" }}>
									+{formatMXN(extraMonthly)}/mes
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
