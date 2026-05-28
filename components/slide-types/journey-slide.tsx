interface JourneyMoment {
	number: number;
	icon: string;
	title: string;
	description: string;
}

interface JourneyContent {
	headline: string;
	subheadline?: string;
	moments?: JourneyMoment[];
}

const DEFAULT_MOMENTS: JourneyMoment[] = [
	{ number: 1, icon: "📲", title: "Primera visita", description: "Escanea el QR y agrega su tarjeta a Wallet en 10 segundos." },
	{ number: 2, icon: "⭐", title: "Acumula", description: "Suma sellos o puntos en cada visita. Ve su progreso en tiempo real." },
	{ number: 3, icon: "🔔", title: "Notificaciones", description: "Push cuando está cerca, cuando casi completa y en su cumpleaños." },
	{ number: 4, icon: "🎁", title: "Canjea", description: "Muestra el QR en caja. Confirmado en 3 segundos." },
	{ number: 5, icon: "💛", title: "Regresa", description: "Ya no es un cliente anónimo — es una relación con historial." },
];

export function JourneySlide({ content }: { content: JourneyContent }) {
	const moments = content.moments?.length ? content.moments : DEFAULT_MOMENTS;

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
			{/* Header */}
			<div style={{ marginBottom: "4%" }}>
				<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "var(--slide-text)" }}
				>
					{content.headline}
				</h2>
				{content.subheadline && (
					<p
						className="slide-body"
						style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.9rem)", color: "var(--slide-text-muted)", marginTop: "0.6rem" }}
					>
						{content.subheadline}
					</p>
				)}
			</div>

			{/* Timeline grid */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${moments.length}, 1fr)`,
					position: "relative",
				}}
			>
				{/* Connecting line */}
				<div
					style={{
						position: "absolute",
						top: "1.25rem",
						left: "10%",
						right: "10%",
						height: "1px",
						background: "var(--slide-border)",
						zIndex: 0,
					}}
				/>

				{moments.map((m, i) => {
					const isFirst = i === 0;
					const isLast = i === moments.length - 1;
					const isHighlight = isFirst || isLast;

					return (
						<div
							key={i}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								textAlign: "center",
								padding: "0 4%",
								position: "relative",
								zIndex: 1,
							}}
						>
							{/* Step indicator */}
							<div
								style={{
									width: "2.5rem",
									height: "2.5rem",
									borderRadius: "50%",
									background: isHighlight ? "#7C5CFF" : "var(--slide-surface)",
									border: isHighlight ? "none" : "1px solid var(--slide-border)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "1.1rem",
									marginBottom: "0.75rem",
									flexShrink: 0,
								}}
							>
								{m.icon}
							</div>

							<span
								style={{
									fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
									fontWeight: 700,
									color: isHighlight ? "#7C5CFF" : "var(--slide-text)",
									marginBottom: "0.35rem",
									lineHeight: 1.2,
								}}
							>
								{m.title}
							</span>
							<p
								className="slide-body"
								style={{
									fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
									color: "var(--slide-text-muted)",
									lineHeight: 1.5,
									maxWidth: "16ch",
								}}
							>
								{m.description}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
