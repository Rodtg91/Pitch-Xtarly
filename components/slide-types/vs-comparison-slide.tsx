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

function Cell({ value, positive }: { value: string | boolean; positive?: boolean }) {
	if (typeof value === "boolean") {
		return (
			<span
				style={{
					fontSize: "1rem",
					fontWeight: 700,
					color: value ? (positive ? "#7C5CFF" : "#6b7280") : "#ef444488",
				}}
			>
				{value ? "✓" : "✗"}
			</span>
		);
	}
	return (
		<span
			className="slide-body"
			style={{
				fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
				color: positive ? "var(--slide-text)" : "var(--slide-text-muted)",
			}}
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
			className="slide-root"
			style={{
				background: "var(--slide-bg)",
				display: "grid",
				gridTemplateColumns: "1fr 1.8fr",
				gap: "0",
			}}
		>
			{/* Left: headline */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "8% 5% 8% 8%",
					borderRight: "1px solid var(--slide-border)",
				}}
			>
				<div className="slide-rule" style={{ marginBottom: "1.5rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "var(--slide-text)", maxWidth: "14ch" }}
				>
					{content.headline}
				</h2>
				{content.subheadline && (
					<p
						className="slide-body"
						style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "var(--slide-text-muted)", marginTop: "1rem", maxWidth: "26ch" }}
					>
						{content.subheadline}
					</p>
				)}
			</div>

			{/* Right: table */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "5% 8% 5% 5%",
				}}
			>
				{/* Header */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 0.7fr 0.7fr",
						padding: "0 0 0.6rem",
						borderBottom: "2px solid var(--slide-border)",
						marginBottom: "0",
					}}
				>
					<span className="slide-label" style={{ color: "var(--slide-text-muted)" }}>Característica</span>
					<span className="slide-label" style={{ color: "var(--slide-text-muted)", textAlign: "center" }}>{oldLabel}</span>
					<span className="slide-label" style={{ color: "#7C5CFF", textAlign: "center" }}>Xtarly</span>
				</div>

				{rows.map((row, i) => (
					<div
						key={i}
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 0.7fr 0.7fr",
							padding: "0.6rem 0",
							borderBottom: i < rows.length - 1 ? "1px solid var(--slide-border)" : "none",
							alignItems: "center",
						}}
					>
						<span
							className="slide-body"
							style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)", color: "var(--slide-text-secondary)" }}
						>
							{row.criterion}
						</span>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Cell value={row.old} />
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Cell value={row.xtarly} positive />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
