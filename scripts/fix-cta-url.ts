import { prisma as db } from "../lib/db";

async function run() {
	const slides = await db.pitchSlide.findMany({ where: { type: "cta" } });
	console.log(`Found ${slides.length} CTA slides`);

	for (const slide of slides) {
		const content = slide.content as Record<string, unknown>;
		if (content.ctaUrl === "https://www.xtarly.com/auth/signup") {
			console.log(`  ✓ Already correct: ${slide.id}`);
			continue;
		}
		await db.pitchSlide.update({
			where: { id: slide.id },
			data: { content: { ...content, ctaUrl: "https://www.xtarly.com/auth/signup" } },
		});
		console.log(`  ✓ Updated: ${slide.id} (was: ${content.ctaUrl})`);
	}

	console.log("\n✅ Done.");
	await db.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
