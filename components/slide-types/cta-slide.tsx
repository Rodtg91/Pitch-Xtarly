"use client";
import { useEffect, useState } from "react";

interface CtaContent {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaUrl?: string;
	imageUrl?: string;
	contact?: {
		whatsapp?: string;
		email?: string;
		web?: string;
	};
}

export function CtaSlide({ content }: { content: CtaContent }) {
	const [isLight, setIsLight] = useState(false);
	useEffect(() => {
		const check = () => setIsLight(document.documentElement.classList.contains("light"));
		check();
		const obs = new MutationObserver(check);
		obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => obs.disconnect();
	}, []);
	return (
		<div
			className="slide-root"
			style={{
				background: "var(--brand-gradient-bg)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "10% 12% 10% 11%",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{content.imageUrl && (
				<>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={content.imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
					<div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,11,26,0.95) 55%, rgba(13,11,26,0.5))" }} />
				</>
			)}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={isLight ? "/icons/logo-light.webp" : "/icons/logo-dark.webp"}
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
						gap: "1.5rem",
						marginTop: "3rem",
						paddingTop: "2rem",
						borderTop: "1px solid rgba(255,255,255,0.07)",
						flexWrap: "wrap",
					}}
				>
					{content.contact.whatsapp && (
						<a
							href={`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, "")}`}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.6rem",
								textDecoration: "none",
								padding: "0.5rem 1rem",
								borderRadius: "999px",
								background: "rgba(37,211,102,0.15)",
								border: "1px solid rgba(37,211,102,0.35)",
								transition: "background 0.2s",
							}}
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
								<path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.524 5.855L0 24l6.29-1.49A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.372l-.36-.214-3.732.883.935-3.62-.235-.372A9.818 9.818 0 1112 21.818z"/>
							</svg>
							<span className="slide-body" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)", color: "#25D366", fontWeight: 600 }}>
								{content.contact.whatsapp}
							</span>
						</a>
					)}
					{content.contact.email && (
						<a
							href={`mailto:${content.contact.email}`}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								textDecoration: "none",
							}}
						>
							<span style={{ fontSize: "0.875rem" }}>✉️</span>
							<span className="slide-body" style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)", color: "rgba(248,249,250,0.5)" }}>
								{content.contact.email}
							</span>
						</a>
					)}
				</div>
			)}
		</div>
	);
}
