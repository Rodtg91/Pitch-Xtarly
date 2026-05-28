import Image from "next/image";
import Link from "next/link";

interface NicheCardProps {
	id: string;
	name: string;
	icon?: string | null;
	color?: string | null;
	imageUrl?: string | null;
}

export function NicheCard({ id, name, icon, color, imageUrl }: NicheCardProps) {
	const accent = color ?? "#6366f1";

	return (
		<Link
			href={`/niches/${id}`}
			style={{ position: "relative", overflow: "hidden", display: "block" }}
			className="group"
		>
			{/* Image */}
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={name}
					fill
					sizes="(max-width: 640px) 50vw, 20vw"
					className="object-cover transition-transform duration-700 group-hover:scale-105"
					priority
				/>
			) : (
				<div
					style={{
						position: "absolute",
						inset: 0,
						background: `linear-gradient(145deg, ${accent}50, ${accent}20)`,
					}}
				/>
			)}

			{/* Persistent dark gradient at bottom */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)",
					zIndex: 1,
				}}
			/>

			{/* Hover overlay */}
			<div
				className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: `linear-gradient(to top, ${accent}55 0%, transparent 60%)`,
					zIndex: 2,
				}}
			/>

			{/* Thin border on hover */}
			<div
				className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					boxShadow: `inset 0 0 0 2px ${accent}80`,
					zIndex: 3,
				}}
			/>

			{/* Title */}
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					padding: "16px 18px",
					zIndex: 4,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<span style={{ fontSize: "20px", lineHeight: 1 }}>{icon ?? "📊"}</span>
					<p
						className="font-heading"
						style={{
							fontSize: "15px",
							color: "#ffffff",
							margin: 0,
							textShadow: "0 1px 4px rgba(0,0,0,0.6)",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{name}
					</p>
				</div>
			</div>
		</Link>
	);
}
