"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface Niche {
	id: string;
	name: string;
	icon?: string | null;
	color?: string | null;
}

function NewPresentationForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const preselectedNicheId = searchParams.get("nicheId");

	const [niches, setNiches] = useState<Niche[]>([]);
	const [nicheId, setNicheId] = useState(preselectedNicheId ?? "");
	const [title, setTitle] = useState("");
	const [customInstructions, setCustomInstructions] = useState("");
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<"form" | "generating">("form");

	useEffect(() => {
		fetch("/api/niches")
			.then((r) => r.json())
			.then(setNiches);
	}, []);

	const selectedNiche = niches.find((n) => n.id === nicheId);
	const accent = selectedNiche?.color ?? "#6366f1";

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!nicheId || !title.trim()) { return; }
		setLoading(true);
		setStep("generating");
		try {
			const pitchRes = await fetch("/api/pitches", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title: title.trim(), nicheId }),
			});
			const pitch = await pitchRes.json();
			await fetch(`/api/pitches/${pitch.id}/generate`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					nicheName: selectedNiche?.name ?? "",
					customInstructions: customInstructions.trim() || undefined,
				}),
			});
			router.push(`/presentations/${pitch.id}`);
		} catch {
			setLoading(false);
			setStep("form");
		}
	}

	if (step === "generating") {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-6" style={{ background: "var(--bg-base)" }}>
				<div
					className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
					style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
				>
					{selectedNiche?.icon ?? "✨"}
				</div>
				<div className="text-center">
					<h2 className="text-2xl font-bold text-white">Generando presentación...</h2>
					<p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
						La IA está escribiendo los slides para{" "}
						<span className="font-medium text-white">{selectedNiche?.name}</span>
					</p>
				</div>
				<div className="flex gap-1.5">
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className="h-2 w-2 rounded-full animate-bounce"
							style={{ background: accent, animationDelay: `${i * 0.15}s` }}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
			{/* Header */}
			<header
				className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b px-6 backdrop-blur-md"
				style={{ borderColor: "var(--border)", background: "rgba(8,9,14,0.85)" }}
			>
				<Link
					href="/"
					className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/6"
					style={{ color: "var(--text-secondary)" }}
				>
					<ArrowLeft size={18} />
				</Link>
				<span className="font-semibold text-white">Nueva presentación</span>
			</header>

			<main className="mx-auto max-w-lg px-6 py-10">
				{/* Title */}
				<div className="mb-8 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400">
						<Sparkles size={20} />
					</div>
					<div>
						<h1 className="text-xl font-bold text-white">Genera con IA</h1>
						<p className="text-sm" style={{ color: "var(--text-secondary)" }}>
							7–9 slides de ventas listos en segundos
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Nicho */}
					<div>
						<label htmlFor="pitch-niche" className="mb-1.5 block text-sm font-medium text-white">
							Nicho de mercado <span className="text-red-400">*</span>
						</label>
						<div className="grid grid-cols-2 gap-2">
							{niches.map((n) => (
								<button
									key={n.id}
									type="button"
									onClick={() => setNicheId(n.id)}
									className="flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-all"
									style={{
										background: nicheId === n.id ? `${n.color ?? "#6366f1"}18` : "var(--bg-surface)",
										borderColor: nicheId === n.id ? `${n.color ?? "#6366f1"}50` : "var(--border)",
										color: nicheId === n.id ? "white" : "var(--text-secondary)",
									}}
								>
									<span className="text-base">{n.icon ?? "📊"}</span>
									{n.name}
								</button>
							))}
						</div>
					</div>

					{/* Título */}
					<div>
						<label htmlFor="pitch-title" className="mb-1.5 block text-sm font-medium text-white">
							Título de la presentación <span className="text-red-400">*</span>
						</label>
						<input
							id="pitch-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Ej: Propuesta Restaurante La Hacienda..."
							required
							className="w-full rounded-xl border px-4 py-3 text-white placeholder-[#4b5263] outline-none transition-colors focus:border-indigo-500"
							style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
						/>
					</div>

					{/* Instrucciones */}
					<div>
						<label htmlFor="pitch-instructions" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
							Contexto adicional{" "}
							<span className="font-normal text-[#4b5263]">(opcional)</span>
						</label>
						<textarea
							id="pitch-instructions"
							value={customInstructions}
							onChange={(e) => setCustomInstructions(e.target.value)}
							placeholder="Ej: Restaurante de alta cocina en Polanco, enfócate en retención..."
							rows={3}
							className="w-full resize-none rounded-xl border px-4 py-3 text-white placeholder-[#4b5263] outline-none transition-colors focus:border-indigo-500"
							style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
						/>
					</div>

					{/* Info box */}
					<div
						className="rounded-xl border px-4 py-3 text-sm"
						style={{
							background: "rgba(99,102,241,0.06)",
							borderColor: "rgba(99,102,241,0.2)",
							color: "var(--text-secondary)",
						}}
					>
						La IA genera automáticamente portada, problema, solución, características, precios, testimonio y CTA — todo adaptado al nicho.
					</div>

					<button
						type="submit"
						disabled={loading || !nicheId || !title.trim()}
						className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
						style={{
							background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
							boxShadow: `0 4px 20px ${accent}30`,
						}}
					>
						<Sparkles size={16} />
						Generar presentación
					</button>
				</form>
			</main>
		</div>
	);
}

export default function NewPresentationPage() {
	return (
		<Suspense fallback={<div className="min-h-screen" style={{ background: "var(--bg-base)" }} />}>
			<NewPresentationForm />
		</Suspense>
	);
}
