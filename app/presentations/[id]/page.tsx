"use client";

import {
	ArrowLeft,
	Check,
	ChevronLeft,
	ChevronRight,
	Edit2,
	Globe,
	GripVertical,
	Lock,
	Maximize2,
	RefreshCw,
	Trash2,
	X,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";

import { PwaCacheButton } from "@/components/pwa-cache-button";
import { SlideViewer } from "@/components/slide-viewer";

interface Slide {
	id: string;
	type: string;
	order: number;
	content: unknown;
}

interface Pitch {
	id: string;
	title: string;
	isPublished: boolean;
	publicSlug: string;
	niche: { name: string; icon?: string | null };
}

const SLIDE_TYPE_LABELS: Record<string, string> = {
	cover: "Portada",
	problem: "Problema",
	solution: "Solución",
	"how-it-works": "Cómo funciona",
	wallet: "Wallet Magic",
	journey: "Customer Journey",
	analytics: "Analytics",
	notifications: "Notificaciones",
	roi: "ROI",
	"vs-comparison": "Comparativa",
	features: "Características",
	testimonial: "Testimonio",
	pricing: "Precios",
	cta: "Llamada a la acción",
};

export default function PresentationEditorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [pitch, setPitch] = useState<Pitch | null>(null);
	const [slides, setSlides] = useState<Slide[]>([]);
	const [selected, setSelected] = useState(0);
	const [loading, setLoading] = useState(true);
	const [editingTitle, setEditingTitle] = useState(false);
	const [titleValue, setTitleValue] = useState("");
	const [regenerating, setRegenerating] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
	const [copied, setCopied] = useState(false);
	const titleInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		Promise.all([fetch(`/api/pitches/${id}`), fetch(`/api/pitches/${id}/slides`)])
			.then(([p, s]) => Promise.all([p.json(), s.json()]))
			.then(([p, s]) => {
				setPitch(p);
				setTitleValue(p.title);
				setSlides(s);
				setLoading(false);
			});
	}, [id]);

	// Focus title input when editing opens
	useEffect(() => {
		if (editingTitle) {
			titleInputRef.current?.focus();
		}
	}, [editingTitle]);

	// Keyboard navigation
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (editingTitle) { return; }
			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				setSelected((prev) => Math.min(prev + 1, slides.length - 1));
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				setSelected((prev) => Math.max(prev - 1, 0));
			} else if (e.key === "Escape" && fullscreen) {
				setFullscreen(false);
			} else if (e.key === "f" || e.key === "F") {
				setFullscreen((prev) => !prev);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [slides.length, editingTitle, fullscreen]);

	async function togglePublished() {
		if (!pitch) { return; }
		const res = await fetch(`/api/pitches/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ isPublished: !pitch.isPublished }),
		});
		const updated = await res.json();
		setPitch(updated);
	}

	async function saveTitle() {
		if (!pitch || !titleValue.trim()) { return; }
		const res = await fetch(`/api/pitches/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: titleValue }),
		});
		const updated = await res.json();
		setPitch(updated);
		setEditingTitle(false);
	}

	async function deleteSlide(slideId: string) {
		await fetch(`/api/pitches/${id}/slides/${slideId}`, { method: "DELETE" });
		const updated = slides.filter((s) => s.id !== slideId);
		setSlides(updated);
		if (selected >= updated.length) { setSelected(Math.max(0, updated.length - 1)); }
	}

	async function regenerate() {
		if (!pitch) { return; }
		setRegenerating(true);
		await fetch(`/api/pitches/${id}/generate`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ nicheName: pitch.niche.name }),
		});
		const res = await fetch(`/api/pitches/${id}/slides`);
		const s = await res.json();
		setSlides(s);
		setSelected(0);
		setRegenerating(false);
	}

	async function copyPublicLink() {
		if (!pitch) { return; }
		await navigator.clipboard.writeText(`${window.location.origin}/p/${pitch.publicSlug}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	if (loading) {
		return (
			<div
				className="min-h-screen flex items-center justify-center"
				style={{ background: "var(--bg-base)" }}
			>
				<div
					className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
					style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
				/>
			</div>
		);
	}

	if (!pitch) { return null; }

	const currentSlide = slides[selected];

	// ── Fullscreen mode ──────────────────────────────────────────────────
	if (fullscreen && currentSlide) {
		return (
			<div
				className="fixed inset-0 z-50 flex flex-col"
				style={{ background: "#000" }}
			>
				<div className="flex-1 relative">
					<SlideViewer slide={currentSlide} />
				</div>

				<div
					className="flex items-center justify-between px-8 py-3"
					style={{ background: "rgba(0,0,0,0.8)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
				>
					<button
						type="button"
						onClick={() => setSelected(Math.max(0, selected - 1))}
						disabled={selected === 0}
						className="flex items-center gap-1.5 text-sm disabled:opacity-30 transition-opacity"
						style={{ color: "rgba(248,249,250,0.7)" }}
					>
						<ChevronLeft size={16} /> Anterior
					</button>

					<div className="flex items-center gap-1.5">
						{slides.map((_, i) => (
							<button
								key={i}
								type="button"
								onClick={() => setSelected(i)}
								className="rounded-full transition-all"
								style={{
									width: i === selected ? 20 : 6,
									height: 6,
									background: i === selected ? "var(--brand-cyan)" : "rgba(255,255,255,0.2)",
								}}
							/>
						))}
					</div>

					<div className="flex items-center gap-4">
						<span className="text-sm" style={{ color: "rgba(248,249,250,0.4)" }}>
							{selected + 1} / {slides.length}
						</span>
						<button
							type="button"
							onClick={() => setFullscreen(false)}
							style={{ color: "rgba(248,249,250,0.5)" }}
						>
							<X size={18} />
						</button>
					</div>
				</div>
			</div>
		);
	}

	// ── Editor mode ──────────────────────────────────────────────────────
	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ background: "var(--bg-base)" }}
		>
			{/* Header */}
			<header
				className="flex items-center gap-4 px-6 py-3 border-b backdrop-blur-md sticky top-0 z-30"
				style={{
					borderColor: "var(--border)",
					background: "rgba(8,9,14,0.85)",
				}}
			>
				<Link
					href="/niches"
					style={{ color: "var(--text-secondary)" }}
					className="hover:opacity-80 transition-opacity"
				>
					<ArrowLeft size={18} />
				</Link>

				<div className="flex-1 flex items-center gap-3 min-w-0">
					{editingTitle ? (
						<div className="flex items-center gap-2">
							<input
								ref={titleInputRef}
								value={titleValue}
								onChange={(e) => setTitleValue(e.target.value)}
								className="rounded-lg px-3 py-1.5 text-sm w-72 focus:outline-none"
								style={{
									background: "var(--bg-elevated)",
									border: "1px solid var(--accent)",
									color: "var(--text-primary)",
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") { saveTitle(); }
									if (e.key === "Escape") { setEditingTitle(false); }
								}}
							/>
							<button type="button" onClick={saveTitle} style={{ color: "#22c55e" }}>
								<Check size={16} />
							</button>
							<button type="button" onClick={() => setEditingTitle(false)} style={{ color: "var(--text-muted)" }}>
								<X size={16} />
							</button>
						</div>
					) : (
						<button
							type="button"
							onClick={() => setEditingTitle(true)}
							className="flex items-center gap-2 font-semibold group hover:opacity-80 transition-opacity truncate"
							style={{ color: "var(--text-primary)" }}
						>
							<span className="truncate">{pitch.title}</span>
							<Edit2 size={13} className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" />
						</button>
					)}
					<span style={{ color: "var(--text-muted)" }}>·</span>
					<span className="text-sm flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
						{pitch.niche.icon} {pitch.niche.name}
					</span>
				</div>

				<div className="flex items-center gap-2 flex-shrink-0">
					<PwaCacheButton pitchId={id} />

					<button
						type="button"
						onClick={regenerate}
						disabled={regenerating}
						className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
						style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
					>
						<RefreshCw size={13} className={regenerating ? "animate-spin" : ""} />
						Regenerar
					</button>

					<button
						type="button"
						onClick={copyPublicLink}
						className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors"
						style={{ background: "var(--bg-elevated)", color: copied ? "#22c55e" : "var(--text-secondary)", border: "1px solid var(--border)" }}
					>
						<Globe size={13} />
						{copied ? "¡Copiado!" : "Copiar link"}
					</button>

					<button
						type="button"
						onClick={togglePublished}
						className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors"
						style={
							pitch.isPublished
								? { background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }
								: { background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
						}
					>
						{pitch.isPublished ? <Globe size={13} /> : <Lock size={13} />}
						{pitch.isPublished ? "Público" : "Privado"}
					</button>

					<button
						type="button"
						onClick={() => setFullscreen(true)}
						className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
						style={{
							background: "var(--brand-gradient-bg)",
							border: "1px solid rgba(98,229,255,0.2)",
							color: "#f8f9fa",
						}}
					>
						<Maximize2 size={13} />
						Presentar
					</button>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<aside
					className="w-60 overflow-y-auto flex-shrink-0"
					style={{ borderRight: "1px solid var(--border)", background: "var(--bg-base)" }}
				>
					<div className="p-3 space-y-1">
						{slides.map((slide, i) => (
							<button
								key={slide.id}
								type="button"
								onClick={() => setSelected(i)}
								className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left group transition-colors"
								style={
									i === selected
										? { background: "var(--slide-cyan-subtle)", border: "1px solid var(--slide-cyan-border)" }
										: { background: "transparent", border: "1px solid transparent" }
								}
							>
								<GripVertical size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
								<div className="flex-1 min-w-0">
									<div
										className="text-xs uppercase tracking-wide truncate"
										style={{ color: i === selected ? "var(--brand-cyan)" : "var(--text-secondary)" }}
									>
										{i + 1}. {SLIDE_TYPE_LABELS[slide.type] ?? slide.type}
									</div>
								</div>
								<button
									type="button"
									onClick={(e) => { e.stopPropagation(); deleteSlide(slide.id); }}
									className="opacity-0 group-hover:opacity-100 transition-opacity"
									style={{ color: "var(--text-muted)" }}
								>
									<Trash2 size={11} />
								</button>
							</button>
						))}
					</div>
				</aside>

				{/* Main canvas */}
				<main
					className="flex-1 flex flex-col items-center justify-center p-8 overflow-hidden"
					style={{ background: "var(--bg-elevated)" }}
				>
					{currentSlide ? (
						<div
							className="w-full max-w-5xl rounded-2xl overflow-hidden"
							style={{
								aspectRatio: "16/9",
								border: "1px solid var(--border)",
								boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
							}}
						>
							<SlideViewer slide={currentSlide} />
						</div>
					) : (
						<p style={{ color: "var(--text-muted)" }}>No hay slides</p>
					)}
				</main>
			</div>

			{/* Footer navigation */}
			{slides.length > 0 && (
				<footer
					className="relative flex items-center justify-center gap-5 px-6 py-3"
					style={{ borderTop: "1px solid var(--border)", background: "var(--bg-base)" }}
				>
					<button
						type="button"
						onClick={() => setSelected(Math.max(0, selected - 1))}
						disabled={selected === 0}
						className="flex items-center gap-1 text-sm disabled:opacity-30 transition-opacity"
						style={{ color: "var(--text-secondary)" }}
					>
						<ChevronLeft size={15} /> Anterior
					</button>

					<div className="flex items-center gap-1">
						{slides.map((_, i) => (
							<button
								key={i}
								type="button"
								onClick={() => setSelected(i)}
								className="rounded-full transition-all"
								style={{
									width: i === selected ? 16 : 5,
									height: 5,
									background: i === selected ? "var(--accent)" : "var(--border)",
								}}
							/>
						))}
					</div>

					<button
						type="button"
						onClick={() => setSelected(Math.min(slides.length - 1, selected + 1))}
						disabled={selected === slides.length - 1}
						className="flex items-center gap-1 text-sm disabled:opacity-30 transition-opacity"
						style={{ color: "var(--text-secondary)" }}
					>
						Siguiente <ChevronRight size={15} />
					</button>

					<span className="text-xs absolute right-6" style={{ color: "var(--text-muted)" }}>
						← → para navegar · F para pantalla completa
					</span>
				</footer>
			)}
		</div>
	);
}
