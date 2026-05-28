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
				padding: "32px 24px",
			}}
		>
			<div
				style={{
					width: "100%",
					maxWidth: "1200px",
					display: "grid",
					gridTemplateColumns: "repeat(5, 1fr)",
					gap: "16px",
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
