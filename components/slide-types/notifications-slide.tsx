interface PushNotification {
	type: "winback" | "urgency" | "campaign" | "birthday" | "proximity";
	title: string;
	body: string;
	time?: string;
}

interface NotificationsContent {
	headline: string;
	subheadline?: string;
	notifications?: PushNotification[];
	stat?: string;
}

const TYPE_META: Record<PushNotification["type"], { label: string; color: string }> = {
	winback: { label: "Reactivación", color: "#f59e0b" },
	urgency: { label: "Urgencia", color: "#ef4444" },
	campaign: { label: "Campaña", color: "#7C5CFF" },
	birthday: { label: "Cumpleaños", color: "#E94FE6" },
	proximity: { label: "Proximidad", color: "#62E5FF" },
};

const DEFAULT_NOTIFICATIONS: PushNotification[] = [
	{ type: "proximity", title: "Xtarly Rewards", body: "Estás cerca — tienes 8 sellos 🌟 ¡Solo 2 más para tu recompensa!", time: "ahora" },
	{ type: "birthday", title: "Xtarly Rewards", body: "🎂 ¡Feliz cumpleaños, Ana! Hoy tienes una sorpresa esperándote.", time: "8:00 AM" },
	{ type: "winback", title: "Xtarly Rewards", body: "Hace 21 días que no te vemos 😢 Tienes 50 puntos listos para canjear.", time: "ayer" },
	{ type: "campaign", title: "Xtarly Rewards", body: "☕ Lunes de puntos dobles — solo hoy. ¡Ven antes de las 2pm!", time: "lun 9:00" },
];

// Notificaciones en dark — las notificaciones de iOS se ven mejor en oscuro
export function NotificationsSlide({ content }: { content: NotificationsContent }) {
	const notifications = content.notifications?.length ? content.notifications : DEFAULT_NOTIFICATIONS;

	return (
		<div
			className="slide-root"
			style={{
				background: "#0D0B1A",
				display: "grid",
				gridTemplateColumns: "1fr 1.4fr",
				gap: "0",
			}}
		>
			{/* Left: copy */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "10% 5% 10% 11%",
					borderRight: "1px solid rgba(255,255,255,0.06)",
				}}
			>
				<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", color: "#f8f9fa", marginBottom: "1rem" }}
				>
					{content.headline}
				</h2>
				{content.subheadline && (
					<p
						className="slide-body"
						style={{ fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)", color: "rgba(248,249,250,0.5)", marginBottom: "2rem", lineHeight: 1.65, maxWidth: "32ch" }}
					>
						{content.subheadline}
					</p>
				)}

				{content.stat && (
					<div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem" }}>
						<div className="slide-number-hero" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#7C5CFF", lineHeight: 1 }}>
							8.1%
						</div>
						<p
							className="slide-body"
							style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)", color: "rgba(248,249,250,0.60)", marginTop: "0.4rem", maxWidth: "24ch" }}
						>
							CTR promedio en push loyalty — 8× más que email
						</p>

						{/* Gráfica comparativa CTR */}
						<div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
							{[
								{ label: "Email promo", value: 1.0, color: "rgba(255,255,255,0.18)" },
								{ label: "Push loyalty", value: 8.1, color: "#7C5CFF" },
							].map((item, i) => (
								<div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
									<span style={{ fontSize: "0.48rem", color: "rgba(248,249,250,0.45)", width: "3.5rem", flexShrink: 0 }}>
										{item.label}
									</span>
									<div style={{ flex: 1, height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
										<div
											className="chart-bar-x"
											style={{
												height: "100%",
												width: `${(item.value / 8.1) * 100}%`,
												background: item.color,
												borderRadius: "3px",
												animationDelay: `${i * 300}ms`,
											}}
										/>
									</div>
									<span style={{ fontSize: "0.55rem", fontWeight: 700, color: "rgba(248,249,250,0.72)", width: "2.2rem", textAlign: "right" }}>
										{item.value}%
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Right: notifications */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "10% 11% 10% 5%",
					gap: "0.6rem",
				}}
			>
				{notifications.map((notif, i) => {
					const meta = TYPE_META[notif.type];
					return (
						<div
							key={i}
							style={{
								background: "rgba(255,255,255,0.04)",
								border: "1px solid rgba(255,255,255,0.07)",
								borderRadius: "14px",
								padding: "10px 14px",
							}}
						>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
								<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
									<div
										style={{
											width: 20,
											height: 20,
											borderRadius: "5px",
											background: "linear-gradient(135deg, #62E5FF, #7C5CFF)",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: "9px",
											color: "#fff",
											fontWeight: 700,
											flexShrink: 0,
										}}
									>
										★
									</div>
									<span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>
										{notif.title}
									</span>
								</div>
								<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
									<span
										style={{
											fontSize: "9px",
											fontWeight: 600,
											padding: "2px 6px",
											borderRadius: "99px",
											background: `${meta.color}18`,
											color: meta.color,
											letterSpacing: "0.03em",
										}}
									>
										{meta.label}
									</span>
									{notif.time && (
										<span style={{ fontSize: "10px", color: "rgba(255,255,255,0.42)" }}>
											{notif.time}
										</span>
									)}
								</div>
							</div>
							<p style={{ fontSize: "12px", color: "rgba(248,249,250,0.8)", lineHeight: 1.4, margin: 0 }}>
								{notif.body}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
