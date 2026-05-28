import { LayoutGrid, Presentation, Sparkles } from "lucide-react";

import { NicheCard } from "@/components/niche-card";
import { PitchCard } from "@/components/pitch-card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const [niches, recentPitches] = await Promise.all([
		prisma.pitchNiche.findMany({
			include: { _count: { select: { pitches: true } } },
			orderBy: { createdAt: "asc" },
		}),
		prisma.pitch.findMany({
			include: {
				niche: { select: { name: true, icon: true } },
				_count: { select: { slides: true } },
			},
			orderBy: { updatedAt: "desc" },
			take: 6,
		}),
	]);

	const totalPresentations = niches.reduce((sum, n) => sum + n._count.pitches, 0);

	return (
		<div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
			{/* ── Header ── */}
			<header
				className="sticky top-0 z-40 flex h-16 items-center border-b px-6 backdrop-blur-md"
				style={{ borderColor: "var(--border)", background: "rgba(8,9,14,0.85)" }}
			>
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/30">
						X
					</div>
					<span className="font-semibold text-white">Xtarly Pitch</span>
				</div>
			</header>

			<main className="mx-auto max-w-6xl px-6 py-10">
				{/* ── Stats strip ── */}
				<div className="mb-10 grid grid-cols-3 gap-4">
					{[
						{ label: "Nichos activos", value: niches.length, icon: LayoutGrid },
						{ label: "Presentaciones totales", value: totalPresentations, icon: Presentation },
						{ label: "Listas para presentar", value: totalPresentations, icon: Sparkles },
					].map(({ label, value, icon: Icon }) => (
						<div
							key={label}
							className="flex items-center gap-4 rounded-2xl border px-5 py-4"
							style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
						>
							<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400">
								<Icon size={18} />
							</div>
							<div>
								<p className="text-2xl font-bold text-white">{value}</p>
								<p className="text-xs" style={{ color: "var(--text-secondary)" }}>
									{label}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* ── Nichos ── */}
				<section className="mb-12">
					<div className="mb-6">
						<h2 className="text-xl font-bold text-white">Nichos de mercado</h2>
						<p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
							Selecciona un nicho para ver sus presentaciones
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						{niches.map((n) => (
							<NicheCard
								key={n.id}
								id={n.id}
								name={n.name}
								icon={n.icon}
								color={n.color}
								imageUrl={n.imageUrl}
								pitchCount={n._count.pitches}
							/>
						))}
					</div>
				</section>

				{/* ── Presentaciones recientes ── */}
				{recentPitches.length > 0 && (
					<section>
						<div className="mb-6">
							<h2 className="text-xl font-bold text-white">Presentaciones recientes</h2>
							<p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
								Tus pitches más recientes, listos para presentar
							</p>
						</div>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{recentPitches.map((p) => (
								<PitchCard
									key={p.id}
									id={p.id}
									title={p.title}
									slideCount={p._count.slides}
									isPublished={p.isPublished}
									publicSlug={p.publicSlug}
									nicheName={p.niche.name}
									nicheIcon={p.niche.icon}
								/>
							))}
						</div>
					</section>
				)}

				{recentPitches.length === 0 && (
					<div
						className="rounded-2xl border border-dashed py-16 text-center"
						style={{ borderColor: "var(--border)" }}
					>
						<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-2xl">
							🎯
						</div>
						<h3 className="mb-1 font-semibold text-white">Sin presentaciones todavía</h3>
						<p className="text-sm" style={{ color: "var(--text-secondary)" }}>
							Selecciona un nicho y genera tu primera presentación con IA
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
