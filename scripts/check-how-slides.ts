import { prisma as db } from "../lib/db";

async function run() {
	const slides = await db.pitchSlide.findMany({
		where: { type: "how-it-works" },
		take: 3,
	});
	for (const s of slides) {
		const c = s.content as Record<string, unknown>;
		console.log("stepImages:", c.stepImages);
	}
	await db.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
