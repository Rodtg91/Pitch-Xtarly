import { CtaSlide } from "./slide-types/cta-slide";
import { CoverSlide } from "./slide-types/cover-slide";
import { FeaturesSlide } from "./slide-types/features-slide";
import { PricingSlide } from "./slide-types/pricing-slide";
import { ProblemSlide } from "./slide-types/problem-slide";
import { SolutionSlide } from "./slide-types/solution-slide";
import { TestimonialSlide } from "./slide-types/testimonial-slide";

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
		default:
			return (
				<div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
					Tipo de slide desconocido: {slide.type}
				</div>
			);
	}
}
