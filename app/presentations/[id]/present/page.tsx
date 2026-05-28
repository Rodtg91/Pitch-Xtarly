"use client";

import { X, WifiOff } from "lucide-react";
import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
					// fallback to cache
				}
			}
			const cached = await getCachedPitch(id);
			if (cached?.slides) {
				setSlides(cached.slides as Slide[]);
				setIsOffline(true);
			}
			setLoading(false);
		}
		load();
	}, [id]);

	const goNext = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), [slides.length]);
	const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { goNext(); }
			if (e.key === "ArrowLeft" || e.key === "ArrowUp") { goPrev(); }
			if (e.key === "Escape") { router.back(); }
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [goNext, goPrev, router]);

	useEffect(() => {
		let startX = 0;
		const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
		const onTouchEnd = (e: TouchEvent) => {
			const diff = startX - e.changedTouches[0].clientX;
			if (Math.abs(diff) > 50) {
				if (diff > 0) { goNext(); } else { goPrev(); }
			}
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
			<div className="fixed inset-0 flex items-center justify-center" style={{ background: "#000" }}>
				<div
					className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
					style={{ borderColor: "var(--brand-violet)", borderTopColor: "transparent" }}
				/>
			</div>
		);
	}

	const slide = slides[current];

	return (
		<div className="fixed inset-0" style={{ background: "#000" }}>
			{slide && (
				<div className="w-full h-full">
					<SlideViewer slide={slide} />
				</div>
			)}

			{/* Click-to-advance overlay */}
			<button
				type="button"
				className="absolute inset-0 z-10 w-full h-full cursor-pointer"
				onClick={goNext}
				aria-label="Siguiente slide"
				style={{ background: "transparent" }}
			/>

			{/* Top-right controls */}
			<div className="absolute top-4 right-4 flex items-center gap-3 z-50 pointer-events-none">
				{isOffline && (
					<div
						className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
						style={{ background: "rgba(0,0,0,0.6)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}
					>
						<WifiOff size={12} />
						Offline
					</div>
				)}
				<div
					className="text-sm px-3 py-1.5 rounded-full pointer-events-none"
					style={{ background: "rgba(0,0,0,0.6)", color: "rgba(248,249,250,0.7)" }}
				>
					{current + 1} / {slides.length}
				</div>
			</div>

			{/* Close button */}
			<button
				type="button"
				onClick={() => router.back()}
				className="absolute top-4 right-4 z-50 p-2 rounded-full transition-colors"
				style={{ background: "rgba(0,0,0,0.6)", color: "rgba(248,249,250,0.8)", marginRight: "80px" }}
			>
				<X size={16} />
			</button>

			{/* Navigation dots */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
				{slides.map((_, i) => (
					<button
						key={i}
						type="button"
						onClick={() => setCurrent(i)}
						className="rounded-full transition-all"
						style={{
							width: i === current ? 24 : 8,
							height: 8,
							background: i === current ? "var(--brand-cyan)" : "rgba(255,255,255,0.3)",
						}}
					/>
				))}
			</div>
		</div>
	);
}
