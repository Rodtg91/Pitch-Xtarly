import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NichePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const niche = await prisma.pitchNiche.findUnique({
		where: { id },
		include: {
			pitches: {
				where: { isPublished: true },
				orderBy: { updatedAt: "desc" },
				take: 1,
			},
		},
	});

	if (!niche) {
		notFound();
	}

	const pitch = niche.pitches[0];

	// Con presentación publicada → viewer fullscreen directo
	if (pitch) {
		redirect(`/p/${pitch.publicSlug}`);
	}

	// Sin presentación → pantalla de próximamente
	return (
		<div
			className="fixed inset-0 flex flex-col items-center justify-center text-center px-8"
			style={{ background: "var(--brand-gradient-bg)" }}
		>
			<div className="text-6xl mb-4">{niche.icon ?? "📊"}</div>
			<h1 className="text-3xl font-bold mb-3" style={{ color: "#f8f9fa" }}>
				{niche.name}
			</h1>
			<p className="text-lg mb-8" style={{ color: "rgba(248,249,250,0.6)" }}>
				Presentación próximamente disponible.
			</p>
			<Link
				href="/niches"
				className="px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
				style={{
					background: "rgba(255,255,255,0.1)",
					border: "1px solid rgba(255,255,255,0.2)",
					color: "#f8f9fa",
				}}
			>
				← Ver todos los nichos
			</Link>
		</div>
	);
}
