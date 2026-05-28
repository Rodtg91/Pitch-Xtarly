"use client";

import { useState } from "react";
import { WifiOff, Download, Check } from "lucide-react";
import { cachePitch } from "@/lib/offline-cache";
import { cn } from "@/lib/utils";

export function PwaCacheButton({ pitchId }: { pitchId: string }) {
	const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

	async function handleCache() {
		setState("loading");
		try {
			await cachePitch(pitchId);
			setState("done");
			setTimeout(() => setState("idle"), 3000);
		} catch {
			setState("error");
			setTimeout(() => setState("idle"), 3000);
		}
	}

	return (
		<button
			onClick={handleCache}
			disabled={state === "loading"}
			className={cn(
				"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
				state === "done"
					? "bg-green-900/50 text-green-300 border border-green-700"
					: state === "error"
						? "bg-red-900/50 text-red-300 border border-red-700"
						: "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700",
			)}
		>
			{state === "loading" && (
				<div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
			)}
			{state === "done" && <Check size={16} />}
			{state === "error" && <WifiOff size={16} />}
			{(state === "idle") && <Download size={16} />}
			{state === "idle" && "Guardar offline"}
			{state === "loading" && "Guardando..."}
			{state === "done" && "Guardado offline"}
			{state === "error" && "Error al guardar"}
		</button>
	);
}
