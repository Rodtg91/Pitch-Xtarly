interface CoverContent {
	headline: string;
	subheadline: string;
	tagline?: string;
	imageUrl?: string;
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
				padding: "6% 42% 6% 8%",
			}}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/icons/logo-dark.webp"
				alt="Xtarly"
				style={{
					height: "clamp(26px, 3.5vw, 42px)",
					width: "auto",
					objectFit: "contain",
					objectPosition: "left center",
					marginBottom: "1.75rem",
				}}
			/>

			{content.tagline && (
				<span className="slide-label" style={{ color: "rgba(248,249,250,0.70)", marginBottom: "1rem" }}>
					{content.tagline}
				</span>
			)}

			<div className="slide-rule" style={{ marginBottom: "1.75rem" }} />

			<h1
				className="slide-display"
				style={{
					fontSize: "clamp(2rem, 4.8vw, 4.25rem)",
					color: "#f8f9fa",
					marginBottom: "2.25rem",
				}}
			>
				{content.headline}
			</h1>

			<p
				className="slide-body"
				style={{
					fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
					color: "rgba(248,249,250,0.72)",
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
					color: "rgba(248,249,250,0.38)",
				}}
			>
				xtarly.com
			</span>

			{/* Right column — lifestyle photo */}
			{content.imageUrl ? (
				/* eslint-disable-next-line @next/next/no-img-element */
				<img
					src={content.imageUrl}
					alt=""
					style={{
						position: "absolute",
						top: "0",
						right: "0",
						bottom: "0",
						width: "38%",
						objectFit: "cover",
						objectPosition: "center center",
					}}
				/>
			) : (
				<div
					className="img-placeholder"
					style={{
						position: "absolute",
						top: "8%",
						right: "5%",
						bottom: "12%",
						width: "31%",
					}}
				>
					<span style={{ fontSize: "1.5rem", opacity: 0.3 }}>📸</span>
					<span className="img-placeholder-label">Foto lifestyle</span>
					<p className="img-placeholder-prompt">
						Overhead flat-lay on dark espresso-stained wood. Smartphone showing rewards wallet card in Apple Wallet, artisan coffee cup with latte art, small succulent. Deep purples and cyans with warm amber. Studio lighting, f/2.8 bokeh. Vertical 2:3, no text.
					</p>
				</div>
			)}
		</div>
	);
}
