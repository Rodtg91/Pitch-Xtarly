interface CtaContent {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaUrl?: string;
	contact?: {
		whatsapp?: string;
		email?: string;
		web?: string;
	};
}

export function CtaSlide({ content }: { content: CtaContent }) {
	return (
		<div
			className="slide-root"
			style={{
				background: "var(--brand-gradient-bg)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "7% 10% 7% 8%",
			}}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/icons/logo-dark.webp"
				alt="Xtarly"
				style={{
					position: "absolute",
					top: "6%",
					left: "8%",
					height: "clamp(22px, 3vw, 36px)",
					width: "auto",
					objectFit: "contain",
					opacity: 0.85,
					pointerEvents: "none",
				}}
			/>

			<div className="slide-rule" style={{ marginBottom: "1.75rem" }} />

			<h2
				className="slide-display"
				style={{
					fontSize: "clamp(2rem, 5vw, 4.5rem)",
					color: "#f8f9fa",
					maxWidth: "16ch",
					marginBottom: "1.25rem",
				}}
			>
				{content.title}
			</h2>

			<p
				className="slide-body"
				style={{
					fontSize: "clamp(0.875rem, 1.5vw, 1.1rem)",
					color: "rgba(248,249,250,0.75)",
					marginBottom: "2.5rem",
					maxWidth: "40ch",
				}}
			>
				{content.subtitle}
			</p>

			<div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
				<a
					href={content.ctaUrl ?? "#"}
					target="_blank"
					rel="noopener noreferrer"
					className="slide-btn-primary"
					style={{ fontSize: "clamp(0.8rem, 1.3vw, 1rem)" }}
				>
					{content.ctaText} →
				</a>

				{content.contact?.web && (
					<span
						className="slide-body"
						style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", color: "rgba(248,249,250,0.60)" }}
					>
						{content.contact.web}
					</span>
				)}
			</div>

			{/* Contact row */}
			{content.contact && (content.contact.whatsapp || content.contact.email) && (
				<div
					style={{
						display: "flex",
						gap: "2rem",
						marginTop: "3rem",
						paddingTop: "2rem",
						borderTop: "1px solid rgba(255,255,255,0.07)",
					}}
				>
					{content.contact.whatsapp && (
						<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
							<span style={{ fontSize: "0.875rem" }}>📱</span>
							<span className="slide-body" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)", color: "rgba(248,249,250,0.68)" }}>
								{content.contact.whatsapp}
							</span>
						</div>
					)}
					{content.contact.email && (
						<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
							<span style={{ fontSize: "0.875rem" }}>✉️</span>
							<span className="slide-body" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)", color: "rgba(248,249,250,0.4)" }}>
								{content.contact.email}
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
