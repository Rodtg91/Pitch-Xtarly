interface CtaContent {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaUrl?: string;
	contact?: {
		whatsapp?: string;
		email?: string;
		web?: string;
	};
}

export function CtaSlide({ content }: { content: CtaContent }) {
	return (
		<div className="flex flex-col items-center justify-center h-full px-16 py-12 text-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
			<h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{content.title}</h2>
			<p className="text-xl text-indigo-200 mb-10">{content.subtitle}</p>

			<a
				href={content.ctaUrl ?? "#"}
				target="_blank"
				rel="noopener noreferrer"
				className="bg-white text-indigo-900 font-bold text-xl px-10 py-4 rounded-full hover:bg-indigo-50 transition-colors mb-12"
			>
				{content.ctaText}
			</a>

			{content.contact && (
				<div className="flex flex-wrap justify-center gap-8 text-indigo-200">
					{content.contact.whatsapp && (
						<div className="flex items-center gap-2">
							<span className="text-xl">📱</span>
							<span className="text-lg">{content.contact.whatsapp}</span>
						</div>
					)}
					{content.contact.email && (
						<div className="flex items-center gap-2">
							<span className="text-xl">✉️</span>
							<span className="text-lg">{content.contact.email}</span>
						</div>
					)}
					{content.contact.web && (
						<div className="flex items-center gap-2">
							<span className="text-xl">🌐</span>
							<span className="text-lg">{content.contact.web}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
