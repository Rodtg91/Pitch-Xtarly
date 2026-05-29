interface WalletContent {
	headline: string;
	subheadline: string;
	benefits: string[];
	stat?: string;
	notificationText?: string;
	label?: string;
}

// Slide de wallet — fondo oscuro para mostrar el card correctamente.
export function WalletSlide({ content }: { content: WalletContent }) {
	const notification = content.notificationText ?? "Estás cerca — tienes 8 sellos 🌟 ¡Solo 2 más para tu recompensa!";

	return (
		<div
			className="slide-root"
			style={{
				background: "#0D0B1A",
				display: "grid",
				gridTemplateColumns: "1.1fr 1fr",
				gap: "0",
			}}
		>
			{/* Left: texto */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "10% 6% 10% 11%",
					borderRight: "1px solid rgba(255,255,255,0.06)",
				}}
			>
				<span className="slide-label" style={{ color: "#62E5FF", marginBottom: "1.25rem" }}>
					{content.label ?? "Apple Wallet · Google Wallet"}
				</span>
				<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />

				<h2
					className="slide-display"
					style={{
						fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
						color: "#f8f9fa",
						marginBottom: "1.25rem",
					}}
				>
					{content.headline}
				</h2>
				<p
					className="slide-body"
					style={{
						fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)",
						color: "rgba(248,249,250,0.75)",
						marginBottom: "2rem",
						maxWidth: "38ch",
						lineHeight: 1.65,
					}}
				>
					{content.subheadline}
				</p>

				{content.benefits.slice(0, 4).map((b, i) => (
					<div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.85rem" }}>
						<div
							style={{
								width: 5,
								height: 5,
								borderRadius: "50%",
								background: "#7C5CFF",
								flexShrink: 0,
								marginTop: "0.45em",
							}}
						/>
						<p
							className="slide-body"
							style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "rgba(248,249,250,0.78)", lineHeight: 1.55 }}
						>
							{b}
						</p>
					</div>
				))}
			</div>

			{/* Right: mockup de notificación + wallet card */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					padding: "10% 11% 10% 6%",
					gap: "1rem",
				}}
			>
				{/* Lock screen notification */}
				<div
					style={{
						width: "min(260px, 90%)",
						background: "rgba(28,28,30,0.92)",
						border: "1px solid rgba(255,255,255,0.1)",
						borderRadius: "16px",
						padding: "12px 16px",
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
						<div
							style={{
								width: 22,
								height: 22,
								borderRadius: "6px",
								background: "linear-gradient(135deg, #62E5FF, #7C5CFF)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "10px",
								color: "#fff",
								fontWeight: 700,
								flexShrink: 0,
							}}
						>
							★
						</div>
						<span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>
							Xtarly Rewards · ahora
						</span>
					</div>
					<p style={{ fontSize: "12px", color: "#f8f9fa", lineHeight: 1.45, margin: 0 }}>
						{notification}
					</p>
				</div>

				{/* Wallet card */}
				<div
					style={{
						width: "min(260px, 90%)",
						background: "linear-gradient(145deg, #1B1638, #2D1B69)",
						border: "1px solid rgba(98,229,255,0.18)",
						borderRadius: "20px",
						padding: "20px",
						boxShadow: "0 20px 50px rgba(124,92,255,0.25)",
					}}
				>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
						<div>
							<div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#62E5FF", marginBottom: "3px" }}>
								Loyalty Card
							</div>
							<div style={{ fontSize: "13px", fontWeight: 700, color: "#f8f9fa" }}>
								Mi Negocio
							</div>
						</div>
						<span style={{ fontSize: "1.5rem" }}>★</span>
					</div>

					<div style={{ display: "flex", gap: "5px", marginBottom: "12px", flexWrap: "wrap" }}>
						{Array.from({ length: 10 }).map((_, i) => (
							<div
								key={i}
								style={{
									width: 18,
									height: 18,
									borderRadius: "50%",
									background: i < 8 ? "linear-gradient(135deg, #62E5FF, #7C5CFF)" : "rgba(255,255,255,0.08)",
									border: i < 8 ? "none" : "1px solid rgba(255,255,255,0.15)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "8px",
									color: i < 8 ? "#fff" : "transparent",
								}}
							>
								{i < 8 ? "★" : ""}
							</div>
						))}
					</div>

					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<p style={{ fontSize: "10px", color: "rgba(248,249,250,0.65)", margin: 0 }}>
							Ana García · 8 de 10
						</p>
						<div style={{ fontSize: "9px", fontWeight: 600, color: "#62E5FF", letterSpacing: "0.06em" }}>
							WALLET
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
