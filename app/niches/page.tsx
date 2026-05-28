import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { NicheCard } from "@/components/niche-card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NichesPage() {
	const niches = await prisma.pitchNiche.findMany({
		orderBy: { createdAt: "asc" },
	});

	return (
		<div style={{ position: "relative", width: "100vw", height: "100dvh", overflow: "hidden", background: "var(--bg-base)" }}>
			{/* Back button */}
			<Link
				href="/"
				style={{
					position: "absolute",
					top: "14px",
					left: "14px",
					zIndex: 10,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "36px",
					height: "36px",
					borderRadius: "50%",
					background: "rgba(0,0,0,0.45)",
					backdropFilter: "blur(8px)",
					border: "1px solid rgba(255,255,255,0.12)",
					color: "#fff",
					textDecoration: "none",
					transition: "background 0.2s",
				}}
				aria-label="Regresar"
			>
				<ArrowLeft size={16} />
			</Link>

			{/* Grid */}
			<div
				style={{
					width: "100%",
					height: "100%",
					padding: "6px",
					display: "grid",
					gridTemplateColumns: "repeat(5, 1fr)",
					gridTemplateRows: "repeat(2, 1fr)",
					gap: "6px",
				}}
			>
				{niches.map((n) => (
					<NicheCard
						key={n.id}
						id={n.id}
						name={n.name}
						icon={n.icon}
						color={n.color}
						imageUrl={n.imageUrl}
					/>
				))}
			</div>
		</div>
	);
}
