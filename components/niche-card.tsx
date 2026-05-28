import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NicheCardProps {
	id: string;
	name: string;
	icon?: string | null;
	color?: string | null;
	imageUrl?: string | null;
	pitchCount: number;
}

export function NicheCard({ id, name, icon, color, imageUrl, pitchCount }: NicheCardProps) {
	const accent = color ?? "#6366f1";

	return (
		<Link
			href={`/niches/${id}`}
			className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
			style={{ borderColor: `${accent}30`, boxShadow: `0 0 0 1px ${accent}10` }}
		>
			{/* Image container — explicit dimensions required for next/image fill */}
			<div style={{ position: "relative", height: "144px", overflow: "hidden" }}>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={name}
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						priority={false}
					/>
				) : (
					<div
						style={{
							position: "absolute",
							inset: 0,
							background: `linear-gradient(145deg, ${accent}30, ${accent}10)`,
						}}
					/>
				)}

				{/* Gradient overlay */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						background: `linear-gradient(to bottom, ${accent}10 0%, rgba(8,9,14,0.75) 100%)`,
						zIndex: 1,
					}}
				/>

				{/* Hover arrow */}
				<div
					className="absolute right-3 top-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
					style={{
						zIndex: 2,
						display: "flex",
						height: "28px",
						width: "28px",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "50%",
						backgroundColor: "rgba(0,0,0,0.45)",
						backdropFilter: "blur(4px)",
					}}
				>
					<ArrowUpRight size={14} className="text-white" />
				</div>
			</div>

			{/* Footer */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "12px",
					padding: "12px 16px",
					background: "var(--bg-surface)",
					borderTop: `1px solid ${accent}20`,
				}}
			>
				<span style={{ fontSize: "20px", lineHeight: 1 }}>{icon ?? "📊"}</span>
				<div style={{ flex: 1, minWidth: 0 }}>
					<p
						style={{
							fontSize: "14px",
							fontWeight: 600,
							color: "white",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							margin: 0,
						}}
					>
						{name}
					</p>
					<p style={{ fontSize: "12px", color: `${accent}99`, marginTop: "2px", margin: 0 }}>
						{pitchCount === 0
							? "Sin presentaciones"
							: `${pitchCount} ${pitchCount === 1 ? "presentación" : "presentaciones"}`}
					</p>
				</div>
			</div>
		</Link>
	);
}
