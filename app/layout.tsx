import type { Metadata, Viewport } from "next";
import { Geist, Nunito } from "next/font/google";
import "./globals.css";

const geistFont = Geist({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-geist",
});

const nunitoFont = Nunito({
	weight: ["400", "600", "700", "800"],
	subsets: ["latin"],
	variable: "--font-nunito",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Xtarly Pitch",
	description: "Presentaciones de ventas Xtarly Rewards",
	manifest: "/manifest.json",
	icons: {
		icon: "/favicon.ico",
		apple: "/icons/icon-192.png",
	},
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
		<html lang="es" className={`${geistFont.variable} ${nunitoFont.variable}`}>
			<body className="min-h-screen" suppressHydrationWarning>{children}</body>
		</html>
	);
}
