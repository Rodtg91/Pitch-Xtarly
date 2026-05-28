interface WalletContent {
	headline: string;
	subheadline: string;
	benefits: string[];
	stat?: string;
	notificationText?: string;
}

export function WalletSlide({ content }: { content: WalletContent }) {
	const notification = content.notificationText ?? "Estás cerca — tienes 8 sellos 🌟";

	return (
		<div
			className="flex flex-col justify-center h-full px-16 py-12"
			style={{ background: "var(--slide-bg)" }}
		>
			{/* Header */}
			<div
				className="text-xs font-semibold uppercase tracking-widest mb-4"
				style={{ color: "var(--brand-cyan)" }}
			>
				Apple Wallet · Google Wallet
			</div>

			<h2
				className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
				style={{ color: "var(--slide-text)" }}
			>
				{content.headline}
			</h2>
			<p
				className="text-lg mb-10 max-w-xl leading-relaxed"
				style={{ color: "var(--slide-text-secondary)" }}
			>
				{content.subheadline}
			</p>

			<div className="flex gap-10 items-start">
				{/* Benefits */}
				<div className="flex-1 space-y-4">
					{content.benefits.map((b, i) => (
						<div key={i} className="flex items-start gap-3">
							<div
								className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
								style={{ background: "var(--brand-gradient)", fontSize: 10, color: "#f8f9fa", fontWeight: 700 }}
							>
								✓
							</div>
							<p className="text-base leading-snug" style={{ color: "var(--slide-text-secondary)" }}>
								{b}
							</p>
						</div>
					))}

					{content.stat && (
						<div
							className="mt-6 rounded-2xl px-5 py-4 inline-block"
							style={{
								background: "var(--slide-cyan-subtle)",
								border: "1px solid var(--slide-cyan-border)",
							}}
						>
							<p className="text-sm font-medium" style={{ color: "var(--brand-cyan)" }}>
								{content.stat}
							</p>
						</div>
					)}
				</div>

				{/* Wallet card mockup */}
				<div className="flex-shrink-0 flex flex-col items-center gap-4">
					{/* Lock screen notification */}
					<div
						className="rounded-2xl px-4 py-3 w-64"
						style={{
							background: "rgba(30,30,30,0.85)",
							backdropFilter: "blur(20px)",
							border: "1px solid rgba(255,255,255,0.12)",
						}}
					>
						<div className="flex items-center gap-2 mb-1">
							<div
								className="w-5 h-5 rounded-md flex items-center justify-center text-xs"
								style={{ background: "var(--brand-gradient)" }}
							>
								★
							</div>
							<span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
								Xtarly Rewards
							</span>
						</div>
						<p className="text-sm leading-snug" style={{ color: "#f8f9fa" }}>
							{notification}
						</p>
					</div>

					{/* Wallet card */}
					<div
						className="rounded-2xl p-5 w-64"
						style={{
							background: "var(--brand-gradient-bg)",
							border: "1px solid rgba(98,229,255,0.2)",
							boxShadow: "0 12px 40px rgba(124,92,255,0.3)",
						}}
					>
						<div className="flex items-center justify-between mb-6">
							<div>
								<p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-cyan)", opacity: 0.8 }}>
									Loyalty Card
								</p>
								<p className="text-sm font-bold mt-0.5" style={{ color: "#f8f9fa" }}>
									Mi Negocio
								</p>
							</div>
							<div className="text-2xl">★</div>
						</div>

						{/* Stamps row */}
						<div className="flex gap-2 mb-4">
							{Array.from({ length: 10 }).map((_, i) => (
								<div
									key={i}
									className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
									style={{
										background: i < 8 ? "var(--brand-gradient)" : "rgba(255,255,255,0.1)",
										border: i < 8 ? "none" : "1px solid rgba(255,255,255,0.2)",
									}}
								>
									{i < 8 ? "★" : ""}
								</div>
							))}
						</div>

						<p className="text-xs" style={{ color: "rgba(248,249,250,0.5)" }}>
							Ana García · 8/10 sellos
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
