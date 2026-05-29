interface FeaturesContent {
	title: string;
	features: { emoji: string; title: string; description: string }[];
}

// Layout editorial 2-columnas — sin card grid genérico
export function FeaturesSlide({ content }: { content: FeaturesContent }) {
	const left = content.features.slice(0, Math.ceil(content.features.length / 2));
	const right = content.features.slice(Math.ceil(content.features.length / 2));

	return (
		<div
			className="slide-root slide-split"
			style={{
				background: "var(--slide-bg)",
				display: "grid",
				gridTemplateColumns: "1fr 1.6fr",
				gap: "0",
			}}
		>
			{/* Left: título */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "10% 5% 10% 11%",
					borderRight: "1px solid var(--slide-border)",
				}}
			>
				<div className="slide-rule" style={{ marginBottom: "1.5rem" }} />
				<h2
					className="slide-display"
					style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "var(--slide-text)", maxWidth: "16ch" }}
				>
					{content.title}
				</h2>
			</div>

			{/* Right: features como lista editorial en 2 columnas */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					padding: "10% 11% 10% 5%",
					gap: "0",
					alignContent: "center",
				}}
			>
				{[left, right].map((col, ci) => (
					<div
						key={ci}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0",
							paddingRight: ci === 0 ? "5%" : 0,
							borderRight: ci === 0 ? "1px solid var(--slide-border)" : "none",
							paddingLeft: ci === 1 ? "5%" : 0,
						}}
					>
						{col.map((f, i) => (
							<div
								key={i}
								style={{
									paddingBottom: i < col.length - 1 ? "1.5rem" : 0,
									borderBottom: i < col.length - 1 ? "1px solid var(--slide-border)" : "none",
									marginBottom: i < col.length - 1 ? "1.5rem" : 0,
								}}
							>
								<div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
									<span style={{ fontSize: "1.25rem", lineHeight: 1.2, flexShrink: 0, marginTop: "0.1em" }}>
										{f.emoji}
									</span>
									<div>
										<h3
											className="slide-heading"
											style={{
												fontSize: "clamp(0.8rem, 1.4vw, 1rem)",
												color: "var(--slide-text)",
												marginBottom: "0.3rem",
											}}
										>
											{f.title}
										</h3>
										<p
											className="slide-body"
											style={{
												fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
												color: "var(--slide-text-secondary)",
												lineHeight: 1.55,
											}}
										>
											{f.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
