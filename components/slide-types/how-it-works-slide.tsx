interface Step {
	number: number;
	icon: string;
	title: string;
	description: string;
}

interface HowItWorksContent {
	headline: string;
	subheadline?: string;
	steps: Step[];
	stepImages?: string[];
}

const DEFAULT_STEPS: Step[] = [
	{ number: 1, icon: "📲", title: "El cliente muestra su QR", description: "Abre su app o Wallet y muestra su código al cajero. Sin tarjetas físicas." },
	{ number: 2, icon: "📷", title: "El cajero escanea y registra", description: "Xtarly Cashier en iOS o Android. Ingresa el monto y confirma en 5 segundos." },
	{ number: 3, icon: "⭐", title: "Puntos sumados al instante", description: "Push al cliente. Su Wallet se actualiza automáticamente." },
];

export function HowItWorksSlide({ content }: { content: HowItWorksContent }) {
	const steps = content.steps?.length ? content.steps : DEFAULT_STEPS;

	return (
		<div
			className="slide-root slide-steps"
			style={{
				background: "var(--slide-bg)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "10% 11%",
			}}
		>
			{/* Header */}
			<div style={{ marginBottom: "5%" }}>
				<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "var(--slide-text)", maxWidth: "60%" }}
				>
					{content.headline}
				</h2>
				{content.subheadline && (
					<p
						className="slide-body"
						style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)", color: "var(--slide-text-muted)", marginTop: "0.75rem" }}
					>
						{content.subheadline}
					</p>
				)}
			</div>

			{/* Steps */}
			<div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: "0" }}>
				{steps.map((step, i) => (
					<div
						key={i}
						style={{
							padding: "0 5% 0 0",
							borderRight: i < steps.length - 1 ? "1px solid var(--slide-border)" : "none",
							paddingRight: i < steps.length - 1 ? "5%" : 0,
							marginRight: i < steps.length - 1 ? "5%" : 0,
							position: "relative",
						}}
					>
						{/* Large number */}
						<div
							className="slide-number-hero"
							style={{
								fontSize: "clamp(3rem, 7vw, 6.5rem)",
								color: "#7C5CFF",
								opacity: 0.28,
								lineHeight: 1,
								marginBottom: "0.5rem",
							}}
						>
							{step.number}
						</div>

						{/* Step photo */}
						{content.stepImages?.[i] ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={content.stepImages[i]}
								alt=""
								style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "8px", marginBottom: "0.75rem", display: "block" }}
							/>
						) : (
							<div
								className="img-placeholder"
								style={{ width: "100%", aspectRatio: "4/3", marginBottom: "0.75rem" }}
							>
								<span style={{ fontSize: "1rem", opacity: 0.3 }}>📸</span>
								<p className="img-placeholder-prompt" style={{ fontSize: "0.4rem" }}>
									{i === 0 && "Customer's hand raising phone toward camera at checkout, iPhone showing QR loyalty code. Warm retail lighting."}
									{i === 1 && "Cashier's hands holding Android phone scanning a QR code at counter. Soft bokeh background, modern retail."}
									{i === 2 && "Phone lock screen with push notification: star icon, success message, confetti colors. Dark wallpaper, macro."}
								</p>
							</div>
						)}

						<h3
							className="slide-heading"
							style={{
								fontSize: "clamp(0.85rem, 1.5vw, 1.15rem)",
								color: "var(--slide-text)",
								marginBottom: "0.6rem",
							}}
						>
							{step.title}
						</h3>
						<p
							className="slide-body"
							style={{
								fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
								color: "var(--slide-text-secondary)",
								lineHeight: 1.6,
								maxWidth: "24ch",
							}}
						>
							{step.description}
						</p>

						{/* Connector arrow */}
						{i < steps.length - 1 && (
							<span
								style={{
									position: "absolute",
									right: "-1.5rem",
									top: "2.5rem",
									fontSize: "1.25rem",
									color: "var(--slide-border)",
									zIndex: 1,
								}}
							>
								→
							</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
