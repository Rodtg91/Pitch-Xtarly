import Link from "next/link";

import { ThemeLogo } from "@/components/theme-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const dynamic = "force-dynamic";

export default function LandingPage() {
	return (
		<div
			style={{
				width: "100vw",
				height: "100dvh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "var(--bg-base)",
				position: "relative",
			}}
		>
			{/* Theme toggle — top right */}
			<div style={{ position: "absolute", top: "20px", right: "20px" }}>
				<ThemeToggle />
			</div>

			{/* Logo */}
			<div style={{ marginBottom: "52px" }}>
				<ThemeLogo />
			</div>

			{/* Iniciar button */}
			<Link
				href="/niches"
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "10px",
					padding: "14px 48px",
					borderRadius: "999px",
					background: "#6366f1",
					color: "#ffffff",
					fontSize: "16px",
					fontWeight: 700,
					letterSpacing: "-0.01em",
					textDecoration: "none",
					transition: "background 0.2s, transform 0.15s",
					boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
				}}
				className="font-heading hover:bg-indigo-500 active:scale-95"
			>
				Iniciar
			</Link>
		</div>
	);
}
