import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Xtarly Pitch",
	description: "Presentaciones de ventas Xtarly Rewards",
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Xtarly Pitch",
	},
};

export const viewport: Viewport = {
	themeColor: "#6366f1",
	width: "device-width",
	initialScale: 1,
	minimumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<head>
				<link rel="apple-touch-icon" href="/icons/icon-192.png" />
			</head>
			<body className="min-h-screen bg-gray-950 text-white" suppressHydrationWarning>{children}</body>
		</html>
	);
}
