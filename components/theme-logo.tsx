"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ThemeLogo() {
	const [isLight, setIsLight] = useState(false);

	useEffect(() => {
		const check = () =>
			setIsLight(document.documentElement.classList.contains("light"));

		check();

		const observer = new MutationObserver(check);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	return (
		<Image
			src={isLight ? "/icons/logo-light.webp" : "/icons/logo-dark.webp"}
			alt="Xtarly"
			width={300}
			height={126}
			className="object-contain"
			priority
		/>
	);
}
