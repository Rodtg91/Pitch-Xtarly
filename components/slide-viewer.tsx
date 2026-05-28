import type React from "react";
import { AnalyticsSlide } from "./slide-types/analytics-slide";
import { CoverSlide } from "./slide-types/cover-slide";
import { CtaSlide } from "./slide-types/cta-slide";
import { FeaturesSlide } from "./slide-types/features-slide";
import { HowItWorksSlide } from "./slide-types/how-it-works-slide";
import { JourneySlide } from "./slide-types/journey-slide";
import { NotificationsSlide } from "./slide-types/notifications-slide";
import { PricingSlide } from "./slide-types/pricing-slide";
import { ProblemSlide } from "./slide-types/problem-slide";
import { RoiSlide } from "./slide-types/roi-slide";
import { SolutionSlide } from "./slide-types/solution-slide";
import { TestimonialSlide } from "./slide-types/testimonial-slide";
import { VsComparisonSlide } from "./slide-types/vs-comparison-slide";
import { WalletSlide } from "./slide-types/wallet-slide";

interface Slide {
	id: string;
	type: string;
	order: number;
	content: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SlideContent = any;

// Cover y CTA ya tienen el logo prominente en su layout.
// El resto lo muestra en top-right a opacidad visible.
function SlideLogo({ type }: { type: string }) {
	const prominent = type === "cover" || type === "cta";
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src="/icons/logo-dark.webp"
			alt="Xtarly"
			style={{
				position: "absolute",
				top: prominent ? "auto" : "3.5%",
				bottom: prominent ? "5%" : "auto",
				right: "4%",
				height: "clamp(15px, 1.9vw, 22px)",
				width: "auto",
				objectFit: "contain",
				opacity: prominent ? 0.25 : 0.55,
				pointerEvents: "none",
				userSelect: "none",
			}}
		/>
	);
}

export function SlideViewer({ slide }: { slide: Slide }) {
	const c = slide.content as SlideContent;

	let slideNode: React.ReactNode;
	switch (slide.type) {
		case "cover":
			slideNode = <CoverSlide content={c} />;
			break;
		case "problem":
			slideNode = <ProblemSlide content={c} />;
			break;
		case "solution":
			slideNode = <SolutionSlide content={c} />;
			break;
		case "features":
			slideNode = <FeaturesSlide content={c} />;
			break;
		case "pricing":
			slideNode = <PricingSlide content={c} />;
			break;
		case "testimonial":
			slideNode = <TestimonialSlide content={c} />;
			break;
		case "cta":
			slideNode = <CtaSlide content={c} />;
			break;
		case "wallet":
			slideNode = <WalletSlide content={c} />;
			break;
		case "how-it-works":
			slideNode = <HowItWorksSlide content={c} />;
			break;
		case "roi":
			slideNode = <RoiSlide content={c} />;
			break;
		case "vs-comparison":
			slideNode = <VsComparisonSlide content={c} />;
			break;
		case "journey":
			slideNode = <JourneySlide content={c} />;
			break;
		case "analytics":
			slideNode = <AnalyticsSlide content={c} />;
			break;
		case "notifications":
			slideNode = <NotificationsSlide content={c} />;
			break;
		default:
			slideNode = (
				<div
					className="flex items-center justify-center h-full"
					style={{ background: "var(--slide-surface)", color: "var(--slide-text-muted)" }}
				>
					Tipo de slide desconocido: {slide.type}
				</div>
			);
	}

	return (
		<div style={{ width: "100%", height: "100%", position: "relative" }}>
			{slideNode}
			<SlideLogo type={slide.type} />
		</div>
	);
}
