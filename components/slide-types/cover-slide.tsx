interface CoverContent {
	headline: string;
	subheadline: string;
	tagline?: string;
}

export function CoverSlide({ content }: { content: CoverContent }) {
	return (
		<div className="flex flex-col items-center justify-center h-full text-center px-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
			<div className="mb-6 text-indigo-300 font-semibold tracking-widest uppercase text-sm">
				{content.tagline ?? "Xtarly Rewards"}
			</div>
			<h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
				{content.headline}
			</h1>
			<p className="text-xl md:text-2xl text-indigo-200 max-w-3xl">
				{content.subheadline}
			</p>
		</div>
	);
}
