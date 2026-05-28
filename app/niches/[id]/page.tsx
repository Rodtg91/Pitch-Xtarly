import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PitchCard } from "@/components/pitch-card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NichePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const niche = await prisma.pitchNiche.findUnique({
		where: { id },
		include: {
			pitches: {
				include: { _count: { select: { slides: true } } },
				orderBy: { updatedAt: "desc" },
			},
		},
	});

	if (!niche) { notFound(); }

	const accent = niche.color ?? "#6366f1";

	return (
		<div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
			{/* Hero banner */}
			<div style={{ position: "relative", height: "192px", overflow: "hidden" }}>
				{niche.imageUrl ? (
					<Image
						src={niche.imageUrl}
						alt={niche.name}
						fill
						sizes="100vw"
						className="object-cover"
						priority
					/>
				) : (
					<div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${accent}40, ${accent}10)` }} />
				)}
				<div
					className="absolute inset-0"
					style={{ background: "linear-gradient(to bottom, rgba(8,9,14,0.3) 0%, rgba(8,9,14,0.85) 100%)" }}
				/>

				{/* Back button */}
				<div className="absolute left-6 top-5">
					<Link
						href="/"
						className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
					>
						<ArrowLeft size={16} />
					</Link>
				</div>

				{/* Niche info over image */}
				<div className="absolute bottom-5 left-6 flex items-center gap-3">
					<div
						className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
						style={{ background: `${accent}30`, border: `1px solid ${accent}50`, backdropFilter: "blur(8px)" }}
					>
						{niche.icon ?? "📊"}
					</div>
					<div>
						<h1 className="font-heading text-2xl text-white drop-shadow">{niche.name}</h1>
						<p className="text-sm text-white/60">
							{niche.pitches.length} {niche.pitches.length === 1 ? "presentación" : "presentaciones"}
						</p>
					</div>
				</div>
			</div>

			<main className="mx-auto max-w-6xl px-6 py-8">
				{niche.pitches.length === 0 ? (
					<div
						className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center"
						style={{ borderColor: "var(--border)" }}
					>
						<div
							className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
							style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
						>
							{niche.icon ?? "📊"}
						</div>
						<h3 className="font-heading mb-1 text-xl text-white">Sin presentaciones aún</h3>
						<p className="max-w-xs text-sm" style={{ color: "var(--text-secondary)" }}>
							Pronto habrá presentaciones disponibles para {niche.name}
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{niche.pitches.map((p) => (
							<PitchCard
								key={p.id}
								id={p.id}
								title={p.title}
								slideCount={p._count.slides}
								isPublished={p.isPublished}
								publicSlug={p.publicSlug}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
