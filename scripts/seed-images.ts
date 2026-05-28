import { prisma as db } from "../lib/db";

const nicheImages: Record<string, string> = {
	"Cafeterías": "/images/niches/cafeterias.webp",
	"Restaurantes": "/images/niches/restaurantes.webp",
	"Pastelerías": "/images/niches/pastelerias.webp",
	"Autolavados": "/images/niches/autolavados.webp",
	"Spas y Bienestar": "/images/niches/spas.webp",
	"Gyms y Fitness": "/images/niches/gyms.webp",
	"Salones de Belleza": "/images/niches/salones-belleza.webp",
	"Tiendas de Ropa": "/images/niches/tiendas-ropa.webp",
	"Farmacias y Salud": "/images/niches/farmacias.webp",
	"Clínicas Veterinarias": "/images/niches/veterinarias.webp",
};

async function run() {
	const niches = await db.pitchNiche.findMany();

	for (const niche of niches) {
		const imageUrl = nicheImages[niche.name];
		if (!imageUrl) {
			console.log(`  ⚠️  Sin imagen para: ${niche.name}`);
			continue;
		}
		await db.pitchNiche.update({ where: { id: niche.id }, data: { imageUrl } });
		console.log(`  ✓ ${niche.icon} ${niche.name} → ${imageUrl}`);
	}

	console.log("\n✅ Imágenes asignadas.");
	await db.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
