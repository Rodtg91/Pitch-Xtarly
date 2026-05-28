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
			className="relative min-h-dvh"
			style={{ background: "var(--bg-base)", padding: "72px 12px 12px" }}
		>
			{/* Back button */}
			<Link
				href="/"
				className="fixed left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
				style={{
					background: "var(--bg-surface)",
					border: "1px solid var(--border)",
					color: "var(--text-secondary)",
				}}
				aria-label="Regresar"
			>
				<ArrowLeft size={16} />
			</Link>

			{/* Responsive grid: 2 cols mobile → 3 tablet → 4 md → 5 desktop */}
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
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
