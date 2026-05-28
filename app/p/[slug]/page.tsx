"use client";

import { WifiOff, X } from "lucide-react";
import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
	const router = useRouter();
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

	const goNext = useCallback(
		() => setCurrent((c) => Math.min(slides.length - 1, c + 1)),
		[slides.length],
	);
	const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "ArrowRight" || e.key === " ") { goNext(); }
			if (e.key === "ArrowLeft") { goPrev(); }
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

	if (notFound) {
		return (
			<div
				className="fixed inset-0 flex flex-col items-center justify-center text-center px-8"
				style={{ background: "var(--brand-gradient-bg)" }}
			>
				<div className="text-6xl mb-4">🔍</div>
				<h1 className="text-2xl font-bold mb-2" style={{ color: "#f8f9fa" }}>
					Presentación no encontrada
				</h1>
				<p style={{ color: "rgba(248,249,250,0.6)" }}>
					El link puede haber expirado o no existe.
				</p>
			</div>
		);
	}

	const slide = slides[current];

	return (
		<div className="fixed inset-0" style={{ background: "#000" }}>
			{/* Slide content */}
			{slide && (
				<div className="w-full h-full">
					<SlideViewer slide={slide} />
				</div>
			)}

			{/* Click-to-advance overlay — behind controls (z-10), above slide */}
			<button
				type="button"
				className="absolute inset-0 z-10 w-full h-full cursor-pointer"
				onClick={goNext}
				aria-label="Siguiente slide"
				style={{ background: "transparent" }}
			/>

			{/* Back button — top-left */}
			<button
				type="button"
				onClick={() => router.push("/")}
				className="absolute top-4 left-4 z-50 p-2 rounded-full flex items-center justify-center"
				style={{ background: "rgba(0,0,0,0.5)", color: "rgba(248,249,250,0.7)" }}
				aria-label="Volver a nichos"
			>
				<X size={16} />
			</button>

			{/* Top bar — z-50 keeps it above the overlay */}
			<div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 pointer-events-none">
				{isOffline && (
					<div
						className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
						style={{
							background: "rgba(0,0,0,0.6)",
							color: "#f59e0b",
							border: "1px solid rgba(245,158,11,0.3)",
						}}
					>
						<WifiOff size={12} />
						Offline
					</div>
				)}
				<div
					className="text-xs px-3 py-1.5 rounded-full"
					style={{ background: "rgba(0,0,0,0.6)", color: "rgba(248,249,250,0.5)" }}
				>
					{pitchTitle}
				</div>
			</div>

			{/* Slide counter */}
			<div
				className="absolute top-4 right-4 text-sm px-3 py-1.5 rounded-full z-50 pointer-events-none"
				style={{ background: "rgba(0,0,0,0.6)", color: "rgba(248,249,250,0.7)" }}
			>
				{current + 1} / {slides.length}
			</div>

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

			{/* Left / Right arrows — desktop only */}
			<button
				type="button"
				onClick={goPrev}
				disabled={current === 0}
				className="absolute left-4 top-1/2 -translate-y-1/2 disabled:opacity-0 p-3 rounded-full transition-all z-50 hidden md:flex items-center"
				style={{ background: "rgba(0,0,0,0.4)", color: "#f8f9fa" }}
			>
				←
			</button>
			<button
				type="button"
				onClick={goNext}
				disabled={current === slides.length - 1}
				className="absolute right-4 top-1/2 -translate-y-1/2 disabled:opacity-0 p-3 rounded-full transition-all z-50 hidden md:flex items-center"
				style={{ background: "rgba(0,0,0,0.4)", color: "#f8f9fa" }}
			>
				→
			</button>
		</div>
	);
}
