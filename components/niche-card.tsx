import Image from "next/image";
import Link from "next/link";

interface NicheCardProps {
	id: string;
	name: string;
	icon?: string | null;
	color?: string | null;
	imageUrl?: string | null;
}

export function NicheCard({ id, name, color, imageUrl }: NicheCardProps) {
	const accent = color ?? "#6366f1";

	return (
		<Link
			href={`/niches/${id}`}
			className="niche-card"
			style={{ "--accent": accent, height: "100%" } as React.CSSProperties}
		>
			{/* Image — flex-grow fills all available vertical space */}
			<div className="niche-card-image">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={name}
						fill
						sizes="20vw"
						style={{ objectFit: "contain" }}
						priority
					/>
				) : (
					<div style={{ position: "absolute", inset: 0, background: `linear-gradient(145deg, ${accent}30, ${accent}10)` }} />
				)}
			</div>

			{/* Title */}
			<div className="niche-card-title">
				<p className="font-heading niche-card-name">{name}</p>
			</div>
		</Link>
	);
}
