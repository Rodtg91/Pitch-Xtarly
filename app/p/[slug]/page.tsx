"use client";

import { ChevronLeft, ChevronRight, WifiOff, X } from "lucide-react";
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
		<div className="fixed inset-0 flex flex-col" style={{ background: "#000" }}>
			{/* Slide content */}
			{slide && (
				<>
					{/* Móvil: slide llena todo el ancho, altura libre — sin letterbox */}
					<div className="flex-1 relative md:hidden overflow-hidden">
						<SlideViewer slide={slide} />
					</div>
					{/* Desktop: mantiene ratio 16:9, letterbox */}
					<div className="hidden md:flex flex-1 items-center justify-center min-h-0 overflow-hidden">
						<div
							className="w-full"
							style={{
								aspectRatio: "16/9",
								maxHeight: "100%",
								maxWidth: "calc(100vh * 16 / 9)",
								position: "relative",
							}}
						>
							<SlideViewer slide={slide} />
						</div>
					</div>
				</>
			)}

			{/* Click-to-advance overlay — behind controls (z-10), above slide */}
			<button
				type="button"
				className="absolute inset-0 z-10 w-full h-full cursor-pointer"
				onClick={goNext}
				aria-label="Siguiente slide"
				style={{ background: "transparent" }}
			/>

			{/* ── Top bar ─────────────────────────────────────────────────────── */}
			<div className="absolute top-5 inset-x-5 flex items-center justify-between z-50 pointer-events-none">
				{/* Close button */}
				<button
					type="button"
					onClick={() => router.push("/niches")}
					className="pointer-events-auto flex items-center justify-center rounded-2xl transition-all hover:scale-105 active:scale-95"
					style={{
						width: 48,
						height: 48,
						background: "rgba(15,15,20,0.7)",
						backdropFilter: "blur(12px)",
						border: "1px solid rgba(255,255,255,0.1)",
						color: "rgba(248,249,250,0.85)",
						boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
					}}
					aria-label="Volver a nichos"
				>
					<X size={20} strokeWidth={2} />
				</button>

				{/* Center: title + offline badge */}
				<div className="flex items-center gap-2 pointer-events-none">
					{isOffline && (
						<div
							className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl"
							style={{
								background: "rgba(15,15,20,0.7)",
								backdropFilter: "blur(12px)",
								border: "1px solid rgba(245,158,11,0.3)",
								color: "#f59e0b",
							}}
						>
							<WifiOff size={13} />
							Offline
						</div>
					)}
					<div
						className="text-xs px-4 py-2 rounded-xl font-medium tracking-wide"
						style={{
							background: "rgba(15,15,20,0.7)",
							backdropFilter: "blur(12px)",
							border: "1px solid rgba(255,255,255,0.08)",
							color: "rgba(248,249,250,0.55)",
						}}
					>
						{pitchTitle}
					</div>
				</div>

				{/* Slide counter */}
				<div
					className="flex items-center gap-1 px-4 py-2 rounded-2xl font-semibold tabular-nums pointer-events-none"
					style={{
						background: "rgba(15,15,20,0.7)",
						backdropFilter: "blur(12px)",
						border: "1px solid rgba(255,255,255,0.1)",
						boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
					}}
				>
					<span style={{ fontSize: 16, color: "rgba(248,249,250,0.95)" }}>{current + 1}</span>
					<span style={{ fontSize: 13, color: "rgba(248,249,250,0.35)", margin: "0 2px" }}>/</span>
					<span style={{ fontSize: 13, color: "rgba(248,249,250,0.45)" }}>{slides.length}</span>
				</div>
			</div>

			{/* ── Dots desktop (sobre el slide) ────────────────────────────────── */}
			<div className="absolute bottom-7 left-1/2 -translate-x-1/2 items-center gap-2 z-50 hidden md:flex">
				{slides.map((_, i) => (
					<button
						key={i}
						type="button"
						onClick={() => setCurrent(i)}
						className="rounded-full transition-all hover:scale-110"
						style={{
							width: i === current ? 28 : 7,
							height: 7,
							background: i === current ? "var(--brand-cyan)" : "rgba(255,255,255,0.25)",
							boxShadow: i === current ? "0 0 10px rgba(98,229,255,0.5)" : "none",
						}}
					/>
				))}
			</div>

			{/* ── Flechas desktop (sobre el slide) ─────────────────────────────── */}
			<button
				type="button"
				onClick={goPrev}
				disabled={current === 0}
				className="absolute left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center justify-center rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
				style={{ width: 52, height: 52, background: "rgba(15,15,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(248,249,250,0.85)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
				aria-label="Anterior"
			>
				<ChevronLeft size={26} strokeWidth={1.75} />
			</button>
			<button
				type="button"
				onClick={goNext}
				disabled={current === slides.length - 1}
				className="absolute right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center justify-center rounded-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
				style={{ width: 52, height: 52, background: "rgba(15,15,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(248,249,250,0.85)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
				aria-label="Siguiente"
			>
				<ChevronRight size={26} strokeWidth={1.75} />
			</button>

			{/* ── Barra inferior móvil (fuera del slide) ───────────────────────── */}
			<div
				className="flex md:hidden items-center justify-between px-4 py-3 flex-shrink-0"
				style={{ background: "rgba(10,10,15,0.95)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
			>
				<button
					type="button"
					onClick={goPrev}
					disabled={current === 0}
					className="flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-25"
					style={{ width: 44, height: 44, background: "rgba(255,255,255,0.07)", color: "#f8f9fa" }}
				>
					<ChevronLeft size={22} />
				</button>

				<div className="flex items-center gap-1.5 flex-wrap justify-center" style={{ maxWidth: "60%" }}>
					{slides.map((_, i) => (
						<button
							key={i}
							type="button"
							onClick={() => setCurrent(i)}
							className="rounded-full transition-all"
							style={{
								width: i === current ? 20 : 6,
								height: 6,
								background: i === current ? "var(--brand-cyan)" : "rgba(255,255,255,0.2)",
								boxShadow: i === current ? "0 0 8px rgba(98,229,255,0.5)" : "none",
							}}
						/>
					))}
				</div>

				<button
					type="button"
					onClick={goNext}
					disabled={current === slides.length - 1}
					className="flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-25"
					style={{ width: 44, height: 44, background: "rgba(255,255,255,0.07)", color: "#f8f9fa" }}
				>
					<ChevronRight size={22} />
				</button>
			</div>
		</div>
	);
}
