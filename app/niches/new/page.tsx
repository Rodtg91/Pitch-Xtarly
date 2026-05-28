"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ICONS = ["🍽️", "☕", "🎂", "🚗", "💆", "💪", "💇", "👗", "💊", "🐾", "🏠", "🛒", "📚", "🎮", "🌮", "🍕", "🍜", "🥗"];
const COLORS = [
	{ hex: "#6366f1", label: "Índigo" },
	{ hex: "#ec4899", label: "Rosa" },
	{ hex: "#f59e0b", label: "Ámbar" },
	{ hex: "#10b981", label: "Esmeralda" },
	{ hex: "#3b82f6", label: "Azul" },
	{ hex: "#8b5cf6", label: "Violeta" },
	{ hex: "#ef4444", label: "Rojo" },
	{ hex: "#14b8a6", label: "Teal" },
	{ hex: "#f97316", label: "Naranja" },
	{ hex: "#06b6d4", label: "Cian" },
];

export default function NewNichePage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [icon, setIcon] = useState("📊");
	const [color, setColor] = useState("#6366f1");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) { return; }
		setLoading(true);
		try {
			const res = await fetch("/api/niches", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, description, icon, color }),
			});
			const niche = await res.json();
			router.push(`/niches/${niche.id}`);
		} finally {
			setLoading(false);
		}
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
				<span className="font-semibold text-white">Nuevo nicho</span>
			</header>

			<main className="mx-auto max-w-xl px-6 py-10">
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Preview card */}
					<div
						className="relative overflow-hidden rounded-2xl border p-6 transition-all"
						style={{
							background: `linear-gradient(145deg, ${color}18 0%, ${color}08 100%)`,
							borderColor: `${color}28`,
						}}
					>
						<div
							className="absolute inset-x-0 top-0 h-px opacity-60"
							style={{ background: `linear-gradient(90deg, transparent, ${color}90, transparent)` }}
						/>
						<div
							className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
							style={{ background: `${color}22`, border: `1px solid ${color}30` }}
						>
							{icon}
						</div>
						<p className="font-semibold text-white">{name || "Nombre del nicho"}</p>
						<p className="mt-0.5 text-sm" style={{ color: `${color}aa` }}>
							Vista previa
						</p>
					</div>

					{/* Nombre */}
					<div>
						<label htmlFor="niche-name" className="mb-1.5 block text-sm font-medium text-white">
							Nombre del nicho <span className="text-red-400">*</span>
						</label>
						<input
							id="niche-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Ej: Restaurantes, Gyms, Cafeterías..."
							required
							className="w-full rounded-xl border px-4 py-3 text-white placeholder-[#4b5263] outline-none transition-colors focus:border-indigo-500"
							style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
						/>
					</div>

					{/* Descripción */}
					<div>
						<label htmlFor="niche-description" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
							Descripción <span className="text-[#4b5263] font-normal">(opcional)</span>
						</label>
						<textarea
							id="niche-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Descripción breve del nicho..."
							rows={2}
							className="w-full resize-none rounded-xl border px-4 py-3 text-white placeholder-[#4b5263] outline-none transition-colors focus:border-indigo-500"
							style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
						/>
					</div>

					{/* Ícono */}
					<div>
						<p className="mb-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
							Ícono
						</p>
						<div className="flex flex-wrap gap-2">
							{ICONS.map((i) => (
								<button
									key={i}
									type="button"
									onClick={() => setIcon(i)}
									className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-all ${
										icon === i ? "scale-110 ring-2 ring-offset-2 ring-offset-[#0f1117]" : "hover:bg-white/8"
									}`}
									style={{
										background: icon === i ? `${color}22` : "var(--bg-surface)",
										border: `1px solid ${icon === i ? color : "var(--border)"}`,
										outline: icon === i ? `2px solid ${color}` : undefined,
										outlineOffset: icon === i ? "2px" : undefined,
									}}
								>
									{i}
								</button>
							))}
						</div>
					</div>

					{/* Color */}
					<div>
						<p className="mb-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
							Color de acento
						</p>
						<div className="flex flex-wrap gap-3">
							{COLORS.map(({ hex, label }) => (
								<button
									key={hex}
									type="button"
									title={label}
									onClick={() => setColor(hex)}
									className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
									style={{
										background: hex,
										boxShadow: color === hex ? `0 0 0 3px var(--bg-surface), 0 0 0 5px ${hex}` : "none",
										transform: color === hex ? "scale(1.2)" : undefined,
									}}
								/>
							))}
						</div>
					</div>

					<button
						type="submit"
						disabled={loading || !name.trim()}
						className="w-full rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
						style={{
							background: `linear-gradient(135deg, ${color}, ${color}cc)`,
							boxShadow: `0 4px 20px ${color}30`,
						}}
					>
						{loading ? "Creando nicho..." : "Crear nicho"}
					</button>
				</form>
			</main>
		</div>
	);
}
