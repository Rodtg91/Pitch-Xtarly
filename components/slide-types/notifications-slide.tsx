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

const TYPE_META: Record<PushNotification["type"], { emoji: string; label: string; color: string }> = {
	winback: { emoji: "💌", label: "Reactivación", color: "#f59e0b" },
	urgency: { emoji: "⏰", label: "Urgencia", color: "#ef4444" },
	campaign: { emoji: "📣", label: "Campaña", color: "var(--brand-violet)" },
	birthday: { emoji: "🎂", label: "Cumpleaños", color: "var(--brand-magenta)" },
	proximity: { emoji: "📍", label: "Proximidad", color: "var(--brand-cyan)" },
};

const DEFAULT_NOTIFICATIONS: PushNotification[] = [
	{
		type: "proximity",
		title: "Xtarly Rewards",
		body: "Estás cerca — tienes 8 sellos 🌟 ¡Solo 2 más para tu recompensa!",
		time: "ahora",
	},
	{
		type: "birthday",
		title: "Xtarly Rewards",
		body: "🎂 ¡Feliz cumpleaños, Ana! Hoy tienes una sorpresa esperándote.",
		time: "8:00 AM",
	},
	{
		type: "winback",
		title: "Xtarly Rewards",
		body: "Hace 21 días que no te vemos 😢 Tienes 50 puntos listos para canjear.",
		time: "ayer",
	},
	{
		type: "campaign",
		title: "Xtarly Rewards",
		body: "☕ Lunes de puntos dobles — solo hoy. ¡Ven antes de las 2pm!",
		time: "lun 9:00",
	},
];

export function NotificationsSlide({ content }: { content: NotificationsContent }) {
	const notifications = content.notifications?.length ? content.notifications : DEFAULT_NOTIFICATIONS;

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

			<div className="grid grid-cols-2 gap-4">
				{notifications.map((notif, i) => {
					const meta = TYPE_META[notif.type];
					return (
						<div
							key={i}
							className="rounded-2xl p-5"
							style={{
								background: "var(--slide-surface)",
								border: "1px solid var(--slide-border)",
							}}
						>
							{/* iPhone notification header */}
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2">
									<div
										className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
										style={{ background: "var(--brand-gradient-bg)", color: "var(--brand-cyan)" }}
									>
										★
									</div>
									<span className="text-xs font-semibold" style={{ color: "var(--slide-text-secondary)" }}>
										{notif.title}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span
										className="text-xs px-2 py-0.5 rounded-full font-medium"
										style={{ background: `${meta.color}18`, color: meta.color }}
									>
										{meta.label}
									</span>
									{notif.time && (
										<span className="text-xs" style={{ color: "var(--slide-text-muted)" }}>
											{notif.time}
										</span>
									)}
								</div>
							</div>
							<p className="text-sm leading-relaxed" style={{ color: "var(--slide-text)" }}>
								{notif.body}
							</p>
						</div>
					);
				})}
			</div>

			{/* Stat */}
			<div
				className="mt-6 rounded-xl px-5 py-3 flex items-center gap-3 self-start"
				style={{
					background: "var(--slide-cyan-subtle)",
					border: "1px solid var(--slide-cyan-border)",
				}}
			>
				<span style={{ color: "var(--brand-cyan)" }}>📊</span>
				<span className="text-sm" style={{ color: "var(--slide-text-secondary)" }}>
					{content.stat ?? "CTR de push en loyalty: 8.1% — 8× más que email. Incluido en todos los planes."}
				</span>
			</div>
		</div>
	);
}
