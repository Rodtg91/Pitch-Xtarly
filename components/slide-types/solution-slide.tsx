interface SolutionContent {
	title: string;
	description: string;
	benefitPoints: string[];
}

export function SolutionSlide({ content }: { content: SolutionContent }) {
	return (
		<div
			className="slide-root"
			style={{
				background: "var(--slide-bg)",
				display: "grid",
				gridTemplateColumns: "1.2fr 1fr",
				gap: "0",
			}}
		>
			{/* Left: headline + descripción */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "8% 6% 8% 8%",
					borderRight: "1px solid var(--slide-border)",
				}}
			>
				<div className="slide-rule" style={{ marginBottom: "1.5rem" }} />
				<h2
					className="slide-display"
					style={{
						fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
						color: "var(--slide-text)",
						marginBottom: "1.5rem",
					}}
				>
					{content.title}
				</h2>
				<p
					className="slide-body"
					style={{
						fontSize: "clamp(0.8rem, 1.4vw, 1rem)",
						color: "var(--slide-text-secondary)",
						lineHeight: 1.7,
						maxWidth: "44ch",
					}}
				>
					{content.description}
				</p>
			</div>

			{/* Right: beneficios como lista editorial numerada */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "8% 8% 8% 6%",
					gap: "0",
				}}
			>
				<span className="slide-label" style={{ color: "var(--slide-text-muted)", marginBottom: "1.5rem" }}>
					Lo que obtienes
				</span>
				{content.benefitPoints.map((point, i) => (
					<div
						key={i}
						style={{
							display: "flex",
							alignItems: "flex-start",
							gap: "1rem",
							paddingBottom: i < content.benefitPoints.length - 1 ? "1.25rem" : 0,
							borderBottom: i < content.benefitPoints.length - 1 ? "1px solid var(--slide-border)" : "none",
							marginBottom: i < content.benefitPoints.length - 1 ? "1.25rem" : 0,
						}}
					>
						<span
							className="slide-number-hero"
							style={{
								fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
								color: "#7C5CFF",
								opacity: 0.45,
								lineHeight: 1,
								flexShrink: 0,
								width: "2.5rem",
							}}
						>
							{i + 1}
						</span>
						<p
							className="slide-body"
							style={{
								fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
								color: "var(--slide-text)",
								lineHeight: 1.55,
								paddingTop: "0.1em",
							}}
						>
							{point}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
