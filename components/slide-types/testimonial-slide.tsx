interface TestimonialContent {
	quote: string;
	author: string;
	business: string;
}

export function TestimonialSlide({ content }: { content: TestimonialContent }) {
	return (
		<div className="flex flex-col items-center justify-center h-full px-20 py-12 text-center bg-gradient-to-br from-purple-950 to-indigo-950">
			<div className="text-6xl text-indigo-400 mb-8">"</div>
			<p className="text-2xl md:text-3xl text-white leading-relaxed mb-10 max-w-4xl">
				{content.quote}
			</p>
			<div className="w-16 h-px bg-indigo-500 mb-6" />
			<p className="text-xl font-semibold text-white">{content.author}</p>
			<p className="text-indigo-300">{content.business}</p>
		</div>
	);
}
