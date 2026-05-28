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
				<p className="text-lg mb-10" style={{ color: "var(--slide-text-secondary)" }}>
					{content.subheadline}
				</p>
			)}

			<div className="grid grid-cols-3 gap-5">
				{/* Inputs */}
				<div
					className="rounded-2xl p-6 flex flex-col gap-4"
					style={{ background: "var(--slide-surface)", border: "1px solid var(--slide-border)" }}
				>
					<p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--slide-text-muted)" }}>
						Tu negocio
					</p>
					<Stat label="Visitas/día" value={`${visits}`} />
					<Stat label="Ticket promedio" value={formatMXN(ticket)} />
					<Stat label="Clientes identificados" value={`${Math.round(enrollRate * 100)}%`} />
					<Stat label="Aumento en frecuencia" value={`+${Math.round(lift * 100)}%`} />
				</div>

				{/* Arrow + middle calc */}
				<div className="flex flex-col items-center justify-center gap-3">
					<div
						className="text-3xl font-bold text-center"
						style={{ color: "var(--slide-text-muted)" }}
					>
						→
					</div>
					<div
						className="rounded-2xl p-5 text-center w-full"
						style={{
							background: "var(--slide-accent-subtle)",
							border: "1px solid var(--slide-accent-border)",
						}}
					>
						<p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--slide-text-muted)" }}>
							Ingreso extra/mes
						</p>
						<p className="text-3xl font-bold" style={{ color: "var(--slide-text)" }}>
							{formatMXN(extraMonthly)}
						</p>
					</div>
					<div
						className="rounded-2xl p-4 text-center w-full"
						style={{
							background: "var(--slide-surface)",
							border: "1px solid var(--slide-border)",
						}}
					>
						<p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--slide-text-muted)" }}>
							Costo del plan
						</p>
						<p className="text-xl font-bold" style={{ color: "var(--slide-text-secondary)" }}>
							{formatMXN(planCost)}<span className="text-sm font-normal">/mes</span>
						</p>
					</div>
				</div>

				{/* ROI result */}
				<div
					className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
					style={{
						background: "var(--brand-gradient-bg)",
						border: "1px solid rgba(98,229,255,0.25)",
						boxShadow: "0 8px 40px rgba(124,92,255,0.25)",
					}}
				>
					<p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--brand-cyan)", opacity: 0.8 }}>
						ROI estimado
					</p>
					<p
						className="text-5xl font-bold leading-none mb-2"
						style={{
							background: "var(--brand-gradient)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						{roi.toLocaleString("es-MX")}%
					</p>
					<p className="text-sm mt-3 leading-relaxed" style={{ color: "rgba(248,249,250,0.6)" }}>
						El plan se paga con menos del 1% del ingreso extra generado.
					</p>
					<div className="mt-4 pt-4 w-full" style={{ borderTop: "1px solid rgba(98,229,255,0.15)" }}>
						<p className="text-xs" style={{ color: "rgba(248,249,250,0.45)" }}>
							Ingresos actuales: {formatMXN(baseMonthly)}/mes
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-sm" style={{ color: "var(--slide-text-secondary)" }}>{label}</span>
			<span className="text-sm font-bold" style={{ color: "var(--slide-text)" }}>{value}</span>
		</div>
	);
}
