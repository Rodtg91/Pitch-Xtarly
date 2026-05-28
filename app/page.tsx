import { NicheCard } from "@/components/niche-card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const niches = await prisma.pitchNiche.findMany({
		orderBy: { createdAt: "asc" },
	});

	return (
		<div
			style={{
				width: "100vw",
				height: "100dvh",
				overflow: "hidden",
				display: "grid",
				gridTemplateColumns: "repeat(5, 1fr)",
				gridTemplateRows: "repeat(2, 1fr)",
				background: "#08090e",
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
	);
}
