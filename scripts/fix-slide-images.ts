import { prisma as db } from "../lib/db";

const NICHE_SOLUTION_IMAGES: Record<string, string> = {
	"Cafeterías": "/images/presentation/SolutionCafeteria.webp",
	"Restaurantes": "/images/presentation/SolutionRestaurantes.webp",
	"Pastelerías": "/images/presentation/SolutionPastelerias.webp",
	"Autolavados": "/images/presentation/SolutionAutolavados.webp",
	"Spas y Bienestar": "/images/presentation/SolutionSpa.webp",
	"Gyms y Fitness": "/images/presentation/SolutionGym.webp",
	"Salones de Belleza": "/images/presentation/SolutionSalonBelleza.webp",
	"Tiendas de Ropa": "/images/presentation/SolutionBoutique.webp",
	"Farmacias y Salud": "/images/presentation/SolutionFarmacia.webp",
	"Clínicas Veterinarias": "/images/presentation/SolutionVeterinaria.webp",
};

const NICHE_PROBLEM_IMAGES: Record<string, string> = {
	"Cafeterías": "/images/presentation/ProblemCafeteria.webp",
	"Restaurantes": "/images/presentation/ProblemRestaurantes.webp",
	"Pastelerías": "/images/presentation/ProblemPastelerias.webp",
	"Autolavados": "/images/presentation/ProblemAutolavados.webp",
	"Spas y Bienestar": "/images/presentation/ProblemSpa.webp",
	"Gyms y Fitness": "/images/presentation/ProblemGym.webp",
	"Salones de Belleza": "/images/presentation/ProblemSalonBelleza.webp",
	"Tiendas de Ropa": "/images/presentation/ProblemBoutique.webp",
	"Farmacias y Salud": "/images/presentation/ProblemFarmacia.webp",
	"Clínicas Veterinarias": "/images/presentation/ProblemVeterinaria.webp",
};

async function run() {
	const pitches = await db.pitch.findMany({
		include: {
			niche: true,
			slides: { where: { type: { in: ["solution", "problem"] } } },
		},
	});

	let updated = 0;
	for (const pitch of pitches) {
		const nicheName = pitch.niche.name;
		for (const slide of pitch.slides) {
			const imageUrl =
				slide.type === "solution"
					? NICHE_SOLUTION_IMAGES[nicheName]
					: NICHE_PROBLEM_IMAGES[nicheName];

			if (!imageUrl) {
				console.log(`  ⚠️  Sin imagen para nicho "${nicheName}" (slide ${slide.type})`);
				continue;
			}

			const content = slide.content as Record<string, unknown>;
			if (content.imageUrl === imageUrl) { continue; }

			await db.pitchSlide.update({
				where: { id: slide.id },
				data: { content: { ...content, imageUrl } },
			});
			console.log(`  ✓ [${pitch.title}] slide ${slide.type} → ${imageUrl}`);
			updated++;
		}
	}

	console.log(`\n✅ ${updated} slides actualizados.`);
	await db.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
