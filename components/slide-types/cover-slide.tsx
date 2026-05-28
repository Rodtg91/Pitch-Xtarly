interface CoverContent {
	headline: string;
	subheadline: string;
	tagline?: string;
}

export function CoverSlide({ content }: { content: CoverContent }) {
	return (
		<div
			className="slide-root"
			style={{
				background: "var(--brand-gradient-bg)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "6% 10% 6% 8%",
			}}
		>
			<span className="slide-label" style={{ color: "rgba(248,249,250,0.45)", marginBottom: "1.75rem" }}>
				{content.tagline ?? "Xtarly Rewards"}
			</span>

			<div className="slide-rule" style={{ marginBottom: "1.75rem" }} />

			<h1
				className="slide-display"
				style={{
					fontSize: "clamp(2rem, 4.8vw, 4.25rem)",
					color: "#f8f9fa",
					maxWidth: "70%",
					marginBottom: "2.25rem",
				}}
			>
				{content.headline}
			</h1>

			<p
				className="slide-body"
				style={{
					fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
					color: "rgba(248,249,250,0.55)",
					maxWidth: "54%",
					lineHeight: 1.7,
				}}
			>
				{content.subheadline}
			</p>

			<span
				style={{
					position: "absolute",
					bottom: "6%",
					right: "8%",
					fontSize: "clamp(0.55rem, 0.85vw, 0.7rem)",
					fontWeight: 600,
					letterSpacing: "0.12em",
					textTransform: "uppercase",
					color: "rgba(248,249,250,0.2)",
				}}
			>
				xtarly.com
			</span>
		</div>
	);
}
