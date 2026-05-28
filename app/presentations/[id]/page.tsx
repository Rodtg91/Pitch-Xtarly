"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Trash2, Globe, Lock, RefreshCw, GripVertical, Edit2, Check, X } from "lucide-react";
import { SlideViewer } from "@/components/slide-viewer";
import { PwaCacheButton } from "@/components/pwa-cache-button";

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
	features: "Características",
	pricing: "Precios",
	testimonial: "Testimonio",
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

	async function togglePublished() {
		if (!pitch) return;
		const res = await fetch(`/api/pitches/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ isPublished: !pitch.isPublished }),
		});
		const updated = await res.json();
		setPitch(updated);
	}

	async function saveTitle() {
		if (!pitch || !titleValue.trim()) return;
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
		if (selected >= updated.length) setSelected(Math.max(0, updated.length - 1));
	}

	async function regenerate() {
		if (!pitch) return;
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
		if (!pitch) return;
		await navigator.clipboard.writeText(`${window.location.origin}/p/${pitch.publicSlug}`);
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-950 flex items-center justify-center">
				<div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (!pitch) return null;

	const currentSlide = slides[selected];

	return (
		<div className="min-h-screen bg-gray-950 flex flex-col">
			{/* Header */}
			<header className="border-b border-gray-800 px-6 py-3 flex items-center gap-4">
				<Link href={`/niches/${pitch.niche}`} className="text-gray-400 hover:text-white">
					<ArrowLeft size={18} />
				</Link>

				<div className="flex-1 flex items-center gap-3">
					{editingTitle ? (
						<div className="flex items-center gap-2">
							<input
								value={titleValue}
								onChange={(e) => setTitleValue(e.target.value)}
								className="bg-gray-800 border border-indigo-500 rounded-lg px-3 py-1.5 text-white text-sm w-72 focus:outline-none"
								autoFocus
								onKeyDown={(e) => { if (e.key === "Enter") saveTitle(); if (e.key === "Escape") setEditingTitle(false); }}
							/>
							<button onClick={saveTitle} className="text-green-400 hover:text-green-300"><Check size={16} /></button>
							<button onClick={() => setEditingTitle(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
						</div>
					) : (
						<button
							onClick={() => setEditingTitle(true)}
							className="flex items-center gap-2 text-white font-semibold hover:text-indigo-400 group"
						>
							{pitch.title}
							<Edit2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
						</button>
					)}
					<span className="text-gray-600">·</span>
					<span className="text-gray-400 text-sm">{pitch.niche.name}</span>
				</div>

				<div className="flex items-center gap-2">
					<PwaCacheButton pitchId={id} />
					<button
						onClick={regenerate}
						disabled={regenerating}
						className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors disabled:opacity-50"
					>
						<RefreshCw size={14} className={regenerating ? "animate-spin" : ""} />
						Regenerar
					</button>
					<button
						onClick={copyPublicLink}
						className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
					>
						<Globe size={14} />
						Copiar link
					</button>
					<button
						onClick={togglePublished}
						className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
							pitch.isPublished
								? "bg-green-900/50 text-green-300 border border-green-700"
								: "bg-gray-800 text-gray-300 hover:bg-gray-700"
						}`}
					>
						{pitch.isPublished ? <Globe size={14} /> : <Lock size={14} />}
						{pitch.isPublished ? "Público" : "Privado"}
					</button>
					<Link
						href={`/presentations/${id}/present`}
						className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium text-white transition-colors"
					>
						<Play size={14} />
						Presentar
					</Link>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar: slide list */}
				<aside className="w-64 border-r border-gray-800 overflow-y-auto bg-gray-950">
					<div className="p-3 space-y-1">
						{slides.map((slide, i) => (
							<button
								key={slide.id}
								onClick={() => setSelected(i)}
								className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
									i === selected ? "bg-indigo-900/50 border border-indigo-700/50" : "hover:bg-gray-900"
								}`}
							>
								<GripVertical size={14} className="text-gray-600 flex-shrink-0" />
								<div className="flex-1 min-w-0">
									<div className="text-xs text-gray-500 uppercase tracking-wide">
										{i + 1}. {SLIDE_TYPE_LABELS[slide.type] ?? slide.type}
									</div>
								</div>
								<button
									onClick={(e) => { e.stopPropagation(); deleteSlide(slide.id); }}
									className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-opacity"
								>
									<Trash2 size={12} />
								</button>
							</button>
						))}
					</div>
				</aside>

				{/* Main: slide preview */}
				<main className="flex-1 flex items-center justify-center p-8 bg-gray-900/30">
					{currentSlide ? (
						<div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
							<SlideViewer slide={currentSlide} />
						</div>
					) : (
						<div className="text-gray-500 text-center">
							<p>No hay slides</p>
						</div>
					)}
				</main>
			</div>

			{/* Slide counter */}
			{slides.length > 0 && (
				<footer className="border-t border-gray-800 px-6 py-2 flex items-center justify-center gap-4">
					<button onClick={() => setSelected(Math.max(0, selected - 1))} disabled={selected === 0} className="text-gray-400 hover:text-white disabled:opacity-30 text-sm">← Anterior</button>
					<span className="text-gray-400 text-sm">{selected + 1} / {slides.length}</span>
					<button onClick={() => setSelected(Math.min(slides.length - 1, selected + 1))} disabled={selected === slides.length - 1} className="text-gray-400 hover:text-white disabled:opacity-30 text-sm">Siguiente →</button>
				</footer>
			)}
		</div>
	);
}
