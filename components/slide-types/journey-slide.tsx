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
	{
		number: 1,
		icon: "📲",
		title: "Primera visita",
		description: "El cliente escanea el QR en caja y agrega su tarjeta a Wallet en 10 segundos.",
	},
	{
		number: 2,
		icon: "⭐",
		title: "Acumula",
		description: "Suma sellos o puntos en cada visita. Ve su progreso en tiempo real.",
	},
	{
		number: 3,
		icon: "🔔",
		title: "Recibe notificaciones",
		description: "Push personalizados cuando está cerca, cuando casi completa y en su cumpleaños.",
	},
	{
		number: 4,
		icon: "🎁",
		title: "Canjea su recompensa",
		description: "Muestra el QR en caja. El cajero escanea y confirma en segundos.",
	},
	{
		number: 5,
		icon: "💛",
		title: "Regresa más seguido",
		description: "El cliente siente que lo conoces. La relación ya no es anónima.",
	},
];

export function JourneySlide({ content }: { content: JourneyContent }) {
	const moments = content.moments?.length ? content.moments : DEFAULT_MOMENTS;

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

			{/* Timeline */}
			<div className="relative mt-4">
				{/* Connecting line */}
				<div
					className="absolute top-7 left-7 right-7 h-px"
					style={{ background: "var(--slide-border)" }}
				/>

				<div className="flex items-start justify-between relative">
					{moments.map((m, i) => (
						<div key={i} className="flex flex-col items-center text-center flex-1 relative">
							{/* Node */}
							<div
								className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 flex-shrink-0 relative z-10"
								style={{
									background: "var(--slide-surface)",
									border: `2px solid ${i === 0 || i === moments.length - 1 ? "rgba(98,229,255,0.5)" : "var(--slide-border)"}`,
									boxShadow: i === 0 || i === moments.length - 1 ? "0 0 20px rgba(98,229,255,0.15)" : "none",
								}}
							>
								{m.icon}
							</div>

							{/* Step number badge */}
							<div
								className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-20"
								style={{
									background: "var(--brand-gradient-bg)",
									border: "1px solid rgba(98,229,255,0.3)",
									color: "var(--brand-cyan)",
									marginTop: "-6px",
									marginLeft: "14px",
								}}
							>
								{m.number}
							</div>

							<h3
								className="text-sm font-bold mb-1.5 px-2"
								style={{ color: "var(--slide-text)" }}
							>
								{m.title}
							</h3>
							<p
								className="text-xs leading-relaxed px-2 max-w-[140px]"
								style={{ color: "var(--slide-text-muted)" }}
							>
								{m.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Bottom highlight */}
			<div
				className="mt-10 rounded-xl px-5 py-3 flex items-center gap-3 self-start"
				style={{
					background: "var(--slide-cyan-subtle)",
					border: "1px solid var(--slide-cyan-border)",
				}}
			>
				<span style={{ color: "var(--brand-cyan)" }}>✦</span>
				<span className="text-sm" style={{ color: "var(--slide-text-secondary)" }}>
					Todo el journey sucede en el teléfono del cliente. Sin fricción, sin contraseñas, sin descargas obligatorias.
				</span>
			</div>
		</div>
	);
}
