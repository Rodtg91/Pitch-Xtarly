import { prisma as db } from "../lib/db";

async function run() {
	const pitches = await db.pitch.findMany({
		include: { niche: true, slides: { orderBy: { order: "asc" } } },
	});
	console.log("Total pitches:", pitches.length);
	for (const p of pitches) {
		console.log(`\n[${p.niche.name}] ${p.title}`);
		for (const s of p.slides) {
			const c = s.content as Record<string, unknown>;
			console.log(`  ${s.type} → imageUrl: ${c.imageUrl ?? "(none)"}`);
		}
	}
	await db.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
