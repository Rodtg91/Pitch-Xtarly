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
		<div
			style={{
				minHeight: "100dvh",
				background: "var(--bg-base)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "48px 20px",
				position: "relative",
			}}
		>
			{/* Back button */}
			<Link
				href="/"
				style={{
					position: "fixed",
					top: "16px",
					left: "16px",
					zIndex: 10,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "36px",
					height: "36px",
					borderRadius: "50%",
					background: "var(--bg-surface)",
					border: "1px solid var(--border)",
					color: "var(--text-secondary)",
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
					maxWidth: "1400px",
					display: "grid",
					gridTemplateColumns: "repeat(5, 1fr)",
					gap: "20px",
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
