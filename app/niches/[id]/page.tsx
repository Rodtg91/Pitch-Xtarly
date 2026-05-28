import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NichePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const niche = await prisma.pitchNiche.findUnique({
		where: { id },
		include: {
			pitches: {
				orderBy: { updatedAt: "desc" },
				take: 1,
			},
		},
	});

	if (!niche) {
		notFound();
	}

	const pitch = niche.pitches[0];

	// Sin presentación → ir a crear una nueva para este nicho
	if (!pitch) {
		redirect(`/presentations/new?nicheId=${id}`);
	}

	redirect(`/presentations/${pitch.id}`);
}
