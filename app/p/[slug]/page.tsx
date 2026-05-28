"use client";

import { useState, useEffect, use, useCallback } from "react";
import { WifiOff } from "lucide-react";
import { SlideViewer } from "@/components/slide-viewer";
import { getCachedPitchBySlug } from "@/lib/offline-cache";

interface Slide {
	id: string;
	type: string;
	order: number;
	content: unknown;
}

export default function PublicPitchPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = use(params);
	const [slides, setSlides] = useState<Slide[]>([]);
	const [pitchTitle, setPitchTitle] = useState("");
	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);
	const [isOffline, setIsOffline] = useState(false);

	useEffect(() => {
		async function load() {
			if (navigator.onLine) {
				try {
					const res = await fetch(`/api/public/${slug}`);
					if (res.ok) {
						const data = await res.json();
						setPitchTitle(data.title);
						setSlides(data.slides ?? []);
						setLoading(false);
						return;
					}
					if (res.status === 404) {
						setNotFound(true);
						setLoading(false);
						return;
					}
				} catch {
					// fall through to cache
				}
			}

			const cached = await getCachedPitchBySlug(slug);
			if (cached) {
				setPitchTitle(cached.title);
				setSlides(cached.slides as Slide[]);
				setIsOffline(true);
			} else {
				setNotFound(true);
			}
			setLoading(false);
		}

		load();
	}, [slug]);

	const goNext = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), [slides.length]);
	const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "ArrowRight" || e.key === " ") goNext();
			if (e.key === "ArrowLeft") goPrev();
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [goNext, goPrev]);

	// Touch swipe
	useEffect(() => {
		let startX = 0;
		const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
		const onTouchEnd = (e: TouchEvent) => {
			const diff = startX - e.changedTouches[0].clientX;
			if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
		};
		window.addEventListener("touchstart", onTouchStart);
		window.addEventListener("touchend", onTouchEnd);
		return () => {
			window.removeEventListener("touchstart", onTouchStart);
			window.removeEventListener("touchend", onTouchEnd);
		};
	}, [goNext, goPrev]);

	if (loading) {
		return (
			<div className="fixed inset-0 bg-black flex items-center justify-center">
				<div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (notFound) {
		return (
			<div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center text-center px-8">
				<div className="text-6xl mb-4">🔍</div>
				<h1 className="text-2xl font-bold text-white mb-2">Presentación no encontrada</h1>
				<p className="text-gray-400">El link puede haber expirado o no existe.</p>
			</div>
		);
	}

	const slide = slides[current];

	return (
		<div className="fixed inset-0 bg-black" onClick={goNext}>
			{slide && (
				<div className="w-full h-full">
					<SlideViewer slide={slide} />
				</div>
			)}

			{/* Top bar */}
			<div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50" onClick={(e) => e.stopPropagation()}>
				{isOffline && (
					<div className="flex items-center gap-1.5 bg-black/60 text-yellow-400 text-xs px-3 py-1.5 rounded-full border border-yellow-800">
						<WifiOff size={12} />
						Offline
					</div>
				)}
				<div className="bg-black/60 text-white/60 text-xs px-3 py-1.5 rounded-full">
					{pitchTitle}
				</div>
			</div>

			{/* Slide counter */}
			<div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full z-50" onClick={(e) => e.stopPropagation()}>
				{current + 1} / {slides.length}
			</div>

			{/* Navigation dots */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50" onClick={(e) => e.stopPropagation()}>
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrent(i)}
						className={`rounded-full transition-all ${
							i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60"
						}`}
					/>
				))}
			</div>

			{/* Left/Right nav (hidden in mobile, visible on desktop) */}
			<button
				onClick={(e) => { e.stopPropagation(); goPrev(); }}
				disabled={current === 0}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 disabled:opacity-0 text-white p-3 rounded-full transition-all z-50 hidden md:flex items-center"
			>
				←
			</button>
			<button
				onClick={(e) => { e.stopPropagation(); goNext(); }}
				disabled={current === slides.length - 1}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 disabled:opacity-0 text-white p-3 rounded-full transition-all z-50 hidden md:flex items-center"
			>
				→
			</button>
		</div>
	);
}
