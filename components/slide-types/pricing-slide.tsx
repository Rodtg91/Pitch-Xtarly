import { cn } from "@/lib/utils";

interface Plan {
	name: string;
	price: string;
	period: string;
	highlight: boolean;
	features: string[];
}

interface PricingContent {
	title: string;
	plans: Plan[];
}

export function PricingSlide({ content }: { content: PricingContent }) {
	return (
		<div className="flex flex-col justify-center h-full px-16 py-12 bg-gray-950">
			<h2 className="text-4xl md:text-5xl font-bold text-white mb-10">{content.title}</h2>
			<div className="grid grid-cols-3 gap-6">
				{content.plans.map((plan, i) => (
					<div
						key={i}
						className={cn(
							"rounded-2xl p-6 flex flex-col border",
							plan.highlight
								? "bg-indigo-600 border-indigo-400 scale-105"
								: "bg-gray-900 border-gray-800",
						)}
					>
						{plan.highlight && (
							<div className="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-3">
								Más popular
							</div>
						)}
						<div className="text-xl font-bold text-white mb-1">{plan.name}</div>
						<div className="mb-4">
							<span className="text-4xl font-bold text-white">{plan.price}</span>
							<span className={cn("text-sm ml-1", plan.highlight ? "text-indigo-200" : "text-gray-400")}>
								/{plan.period}
							</span>
						</div>
						<ul className="space-y-2 flex-1">
							{plan.features.map((f, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<span className={plan.highlight ? "text-indigo-200" : "text-indigo-400"}>✓</span>
									<span className={plan.highlight ? "text-white" : "text-gray-300"}>{f}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
