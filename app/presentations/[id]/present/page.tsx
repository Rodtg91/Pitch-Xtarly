"use client";

import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, WifiOff } from "lucide-react";
import { SlideViewer } from "@/components/slide-viewer";
import { getCachedPitch } from "@/lib/offline-cache";

interface Slide {
	id: string;
	type: string;
	order: number;
	content: unknown;
}

export default function PresentPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const router = useRouter();
	const [slides, setSlides] = useState<Slide[]>([]);
	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState(true);
	const [isOffline, setIsOffline] = useState(false);

	useEffect(() => {
		async function load() {
			// Try network first
			if (navigator.onLine) {
				try {
					const res = await fetch(`/api/pitches/${id}/slides`);
					if (res.ok) {
						const data = await res.json();
						setSlides(data);
						setLoading(false);
						return;
					}
				} catch {
					// fall through to cache
				}
			}

			// Fallback to IndexedDB
			const cached = await getCachedPitch(id);
			if (cached?.slides) {
				setSlides(cached.slides as Slide[]);
				setIsOffline(true);
			}
			setLoading(false);
		}

		load();
	}, [id]);

	const goNext = useCallback(() => {
		setCurrent((c) => Math.min(slides.length - 1, c + 1));
	}, [slides.length]);

	const goPrev = useCallback(() => {
		setCurrent((c) => Math.max(0, c - 1));
	}, []);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") goNext();
			if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
			if (e.key === "Escape") router.back();
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [goNext, goPrev, router]);

	// Touch swipe support
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

	const slide = slides[current];

	return (
		<div className="fixed inset-0 bg-black" onClick={goNext}>
			{/* Slide */}
			{slide && (
				<div className="w-full h-full">
					<SlideViewer slide={slide} />
				</div>
			)}

			{/* Controls overlay */}
			<div className="absolute top-4 right-4 flex items-center gap-3 z-50" onClick={(e) => e.stopPropagation()}>
				{isOffline && (
					<div className="flex items-center gap-1.5 bg-black/60 text-yellow-400 text-xs px-3 py-1.5 rounded-full border border-yellow-800">
						<WifiOff size={12} />
						Offline
					</div>
				)}
				<div className="bg-black/60 text-white text-sm px-3 py-1.5 rounded-full">
					{current + 1} / {slides.length}
				</div>
				<button
					onClick={() => router.back()}
					className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
				>
					<X size={16} />
				</button>
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
		</div>
	);
}
