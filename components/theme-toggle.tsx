"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [isLight, setIsLight] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem("theme");
		if (saved === "light") {
			setIsLight(true);
			document.documentElement.classList.add("light");
		}
	}, []);

	function toggle() {
		const next = !isLight;
		setIsLight(next);
		document.documentElement.classList.toggle("light", next);
		localStorage.setItem("theme", next ? "light" : "dark");
	}

	return (
		<button
			type="button"
			onClick={toggle}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "40px",
				height: "40px",
				borderRadius: "50%",
				border: "1px solid var(--border)",
				background: "var(--bg-surface)",
				color: "var(--text-secondary)",
				cursor: "pointer",
				transition: "background 0.2s, color 0.2s",
			}}
			aria-label="Cambiar tema"
		>
			{isLight ? <Moon size={16} /> : <Sun size={16} />}
		</button>
	);
}
