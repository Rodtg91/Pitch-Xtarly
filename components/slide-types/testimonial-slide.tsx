interface TestimonialContent {
	quote: string;
	author: string;
	business: string;
}

// Left-aligned pull-quote editorial — más fuerza que el centrado genérico.
export function TestimonialSlide({ content }: { content: TestimonialContent }) {
	return (
		<div
			className="slide-root"
			style={{
				background: "var(--brand-gradient-bg)",
				display: "grid",
				gridTemplateColumns: "auto 1fr",
				gap: "0",
			}}
		>
			{/* Left accent bar */}
			<div
				style={{
					width: "4px",
					background: "#7C5CFF",
					margin: "6% 0",
					borderRadius: "0 2px 2px 0",
				}}
			/>

			{/* Quote content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "7% 8% 7% 6%",
				}}
			>
				<span
					style={{
						fontFamily: "Georgia, 'Times New Roman', serif",
						fontSize: "clamp(4rem, 9vw, 8rem)",
						color: "#7C5CFF",
						opacity: 0.35,
						lineHeight: 0.7,
						display: "block",
						marginBottom: "0.5rem",
						userSelect: "none",
					}}
				>
					"
				</span>

				<blockquote
					className="slide-display"
					style={{
						fontSize: "clamp(1rem, 2.2vw, 1.8rem)",
						color: "#f8f9fa",
						lineHeight: 1.4,
						maxWidth: "52ch",
						margin: 0,
					}}
				>
					{content.quote}
				</blockquote>

				<footer style={{ marginTop: "2.5rem" }}>
					<div className="slide-rule" style={{ marginBottom: "1.25rem" }} />
					<p
						className="slide-heading"
						style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)", color: "#f8f9fa", marginBottom: "0.3rem" }}
					>
						{content.author}
					</p>
					<p
						className="slide-body"
						style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.875rem)", color: "rgba(248,249,250,0.5)" }}
					>
						{content.business}
					</p>
				</footer>
			</div>
		</div>
	);
}
