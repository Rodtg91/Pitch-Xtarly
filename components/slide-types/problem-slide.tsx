interface ProblemContent {
	title: string;
	points: { emoji: string; text: string }[];
}

export function ProblemSlide({ content }: { content: ProblemContent }) {
	return (
		<div
			className="slide-root"
			style={{
				background: "var(--slide-bg)",
				display: "grid",
				gridTemplateColumns: "1fr 1.6fr",
				gap: "0",
			}}
		>
			{/* Left col: número grande + título */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "8% 6% 8% 8%",
					borderRight: "1px solid var(--slide-border)",
				}}
			>
				<span
					className="slide-number-hero"
					style={{ fontSize: "clamp(4rem, 9vw, 9rem)", lineHeight: 0.85 }}
				>
					{content.points.length}
				</span>
				<span
					className="slide-label"
					style={{ color: "var(--slide-text-muted)", marginTop: "1rem" }}
				>
					problemas críticos
				</span>
				<div className="slide-rule" style={{ marginTop: "2rem" }} />
				<h2
					className="slide-heading"
					style={{
						fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
						color: "var(--slide-text)",
						marginTop: "1.25rem",
					}}
				>
					{content.title}
				</h2>
			</div>

			{/* Right col: los puntos como lista editorial */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "8% 8% 8% 6%",
					gap: "0",
				}}
			>
				{content.points.map((point, i) => (
					<div
						key={i}
						style={{
							display: "flex",
							alignItems: "flex-start",
							gap: "1.25rem",
							paddingBottom: i < content.points.length - 1 ? "1.5rem" : 0,
							borderBottom: i < content.points.length - 1 ? "1px solid var(--slide-border)" : "none",
							marginBottom: i < content.points.length - 1 ? "1.5rem" : 0,
						}}
					>
						<span
							style={{
								fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
								fontWeight: 700,
								color: "var(--slide-text-muted)",
								letterSpacing: "0.05em",
								flexShrink: 0,
								paddingTop: "0.2em",
								minWidth: "1.6rem",
							}}
						>
							{String(i + 1).padStart(2, "0")}
						</span>
						<p
							className="slide-body"
							style={{
								fontSize: "clamp(0.8rem, 1.5vw, 1.05rem)",
								color: "var(--slide-text-secondary)",
								lineHeight: 1.55,
							}}
						>
							{point.text}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
