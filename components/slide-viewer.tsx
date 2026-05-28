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

export function SlideViewer({ slide }: { slide: Slide }) {
	const c = slide.content as SlideContent;

	switch (slide.type) {
		case "cover":
			return <CoverSlide content={c} />;
		case "problem":
			return <ProblemSlide content={c} />;
		case "solution":
			return <SolutionSlide content={c} />;
		case "features":
			return <FeaturesSlide content={c} />;
		case "pricing":
			return <PricingSlide content={c} />;
		case "testimonial":
			return <TestimonialSlide content={c} />;
		case "cta":
			return <CtaSlide content={c} />;
		case "wallet":
			return <WalletSlide content={c} />;
		case "how-it-works":
			return <HowItWorksSlide content={c} />;
		case "roi":
			return <RoiSlide content={c} />;
		case "vs-comparison":
			return <VsComparisonSlide content={c} />;
		case "journey":
			return <JourneySlide content={c} />;
		case "analytics":
			return <AnalyticsSlide content={c} />;
		case "notifications":
			return <NotificationsSlide content={c} />;
		default:
			return (
				<div
					className="flex items-center justify-center h-full"
					style={{ background: "var(--slide-surface)", color: "var(--slide-text-muted)" }}
				>
					Tipo de slide desconocido: {slide.type}
				</div>
			);
	}
}
