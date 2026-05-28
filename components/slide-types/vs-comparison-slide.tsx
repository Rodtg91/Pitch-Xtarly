interface ComparisonRow {
	criterion: string;
	old: string | boolean;
	xtarly: string | boolean;
}

interface VsComparisonContent {
	headline: string;
	subheadline?: string;
	variant?: "paper" | "competition";
	rows?: ComparisonRow[];
}

const PAPER_ROWS: ComparisonRow[] = [
	{ criterion: "Datos del cliente", old: false, xtarly: "Nombre, celular, historial" },
	{ criterion: "Apple / Google Wallet", old: false, xtarly: true },
	{ criterion: "Notificaciones push", old: false, xtarly: true },
	{ criterion: "Analytics y RFM", old: false, xtarly: true },
	{ criterion: "Campañas de reactivación", old: false, xtarly: true },
	{ criterion: "Riesgo de falsificación", old: "Alto", xtarly: "QR verificado" },
	{ criterion: "Costo por cliente", old: "Impresión + logística", xtarly: "$0" },
];

const COMPETITION_ROWS: ComparisonRow[] = [
	{ criterion: "Apple / Google Wallet", old: "Solo algunas", xtarly: true },
	{ criterion: "RFM Analytics", old: "Básico o ausente", xtarly: true },
	{ criterion: "Precios en MXN / LATAM", old: false, xtarly: true },
	{ criterion: "Onboarding < 5 minutos", old: false, xtarly: true },
	{ criterion: "Sin contratos anuales", old: false, xtarly: true },
	{ criterion: "White label / App propia", old: "Muy costoso", xtarly: "Desde $1,999/mes" },
	{ criterion: "Multi-nicho configurable", old: "Limitado", xtarly: true },
];

function Cell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
	if (typeof value === "boolean") {
		return (
			<span
				className="text-lg font-bold"
				style={{ color: value ? (highlight ? "var(--brand-cyan)" : "#22c55e") : "#ef4444" }}
			>
				{value ? "✓" : "✗"}
			</span>
		);
	}
	return (
		<span
			className="text-sm"
			style={{ color: highlight ? "var(--brand-cyan)" : "var(--slide-text-secondary)" }}
		>
			{value}
		</span>
	);
}

export function VsComparisonSlide({ content }: { content: VsComparisonContent }) {
	const isPaper = content.variant !== "competition";
	const rows = content.rows?.length ? content.rows : (isPaper ? PAPER_ROWS : COMPETITION_ROWS);
	const oldLabel = isPaper ? "Tarjeta de papel" : "Otras apps";

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

			<div
				className="rounded-2xl overflow-hidden"
				style={{ border: "1px solid var(--slide-border)" }}
			>
				{/* Table header */}
				<div
					className="grid grid-cols-3 px-6 py-3 text-xs font-semibold uppercase tracking-widest"
					style={{ background: "var(--slide-surface-2)", borderBottom: "1px solid var(--slide-border)" }}
				>
					<span style={{ color: "var(--slide-text-muted)" }}>Característica</span>
					<span className="text-center" style={{ color: "var(--slide-text-muted)" }}>{oldLabel}</span>
					<span
						className="text-center"
						style={{ color: "var(--brand-cyan)" }}
					>
						Xtarly Rewards
					</span>
				</div>

				{/* Rows */}
				{rows.map((row, i) => (
					<div
						key={i}
						className="grid grid-cols-3 px-6 py-3.5 items-center"
						style={{
							borderBottom: i < rows.length - 1 ? "1px solid var(--slide-border)" : "none",
							background: i % 2 === 0 ? "transparent" : "var(--slide-surface)",
						}}
					>
						<span className="text-sm" style={{ color: "var(--slide-text)" }}>
							{row.criterion}
						</span>
						<div className="flex justify-center">
							<Cell value={row.old} />
						</div>
						<div
							className="flex justify-center rounded-lg py-1 px-2"
							style={{ background: "var(--slide-cyan-subtle)" }}
						>
							<Cell value={row.xtarly} highlight />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
