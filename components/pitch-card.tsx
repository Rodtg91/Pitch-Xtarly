import { Edit, Globe, Lock, Play } from "lucide-react";
import Link from "next/link";

interface PitchCardProps {
	id: string;
	title: string;
	slideCount: number;
	isPublished: boolean;
	publicSlug: string;
	nicheName?: string;
	nicheIcon?: string | null;
}

export function PitchCard({
	id,
	title,
	slideCount,
	isPublished,
	publicSlug,
	nicheName,
	nicheIcon,
}: PitchCardProps) {
	return (
		<div className="group flex flex-col gap-4 rounded-2xl border border-white/7 bg-[#0f1117] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/12 hover:shadow-xl hover:shadow-black/40">
			{/* Header */}
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1 min-w-0">
					{nicheName && (
						<div className="flex items-center gap-1.5 mb-1.5">
							<span className="text-sm">{nicheIcon ?? "📊"}</span>
							<span className="text-xs text-[#9ca3b0] font-medium">{nicheName}</span>
						</div>
					)}
					<h3 className="font-heading text-base text-white leading-snug line-clamp-2">{title}</h3>
				</div>
				<span
					className={`mt-0.5 flex-shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
						isPublished
							? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
							: "bg-white/5 text-[#9ca3b0] border border-white/8"
					}`}
				>
					{isPublished ? <Globe size={10} /> : <Lock size={10} />}
					{isPublished ? "Público" : "Privado"}
				</span>
			</div>

			{/* Meta */}
			<p className="text-xs text-[#4b5263]">
				{slideCount} {slideCount === 1 ? "slide" : "slides"}
			</p>

			{/* Actions */}
			<div className="flex gap-2 pt-1 border-t border-white/5">
				<Link
					href={`/presentations/${id}/present`}
					className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
				>
					<Play size={13} />
					Presentar
				</Link>
				<Link
					href={`/presentations/${id}`}
					className="flex items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-4 py-2 text-sm font-medium text-[#9ca3b0] transition-colors hover:bg-white/8 hover:text-white"
				>
					<Edit size={13} />
					Editar
				</Link>
				<button
					type="button"
					onClick={() =>
						navigator.clipboard.writeText(`${window.location.origin}/p/${publicSlug}`)
					}
					className="flex items-center justify-center rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-[#9ca3b0] transition-colors hover:bg-white/8 hover:text-white"
					title="Copiar link público"
				>
					<Globe size={14} />
				</button>
			</div>
		</div>
	);
}
