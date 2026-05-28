import { prisma as db } from "../lib/db";

const niches = [
	{ name: "Cafeterías", icon: "☕", color: "#92400e", description: "Cafeterías, coffee shops y barras de espresso" },
	{ name: "Restaurantes", icon: "🍽️", color: "#dc2626", description: "Restaurantes de todo tipo y cocinas" },
	{ name: "Pastelerías", icon: "🎂", color: "#db2777", description: "Pastelerías, reposterías y panaderías artesanales" },
	{ name: "Autolavados", icon: "🚗", color: "#2563eb", description: "Autolavados, detailing y servicio de lavado de autos" },
	{ name: "Spas y Bienestar", icon: "💆", color: "#7c3aed", description: "Spas, centros de masajes y bienestar" },
	{ name: "Gyms y Fitness", icon: "💪", color: "#16a34a", description: "Gimnasios, boxes de CrossFit y estudios de fitness" },
	{ name: "Salones de Belleza", icon: "💇", color: "#c026d3", description: "Estéticas, salones de belleza y barberías" },
	{ name: "Tiendas de Ropa", icon: "👗", color: "#0891b2", description: "Boutiques, tiendas de moda y accesorios" },
	{ name: "Farmacias y Salud", icon: "💊", color: "#059669", description: "Farmacias, boticas y consultorios" },
	{ name: "Clínicas Veterinarias", icon: "🐾", color: "#d97706", description: "Veterinarias, petshops y clínicas animales" },
];

async function seed() {
	console.log("Creando nichos...");

	for (const niche of niches) {
		const existing = await db.pitchNiche.findFirst({ where: { name: niche.name } });
		if (existing) {
			console.log(`  ⚠️  Ya existe: ${niche.icon} ${niche.name}`);
			continue;
		}
		await db.pitchNiche.create({ data: niche });
		console.log(`  ✓ ${niche.icon} ${niche.name}`);
	}

	console.log("\n✅ Nichos creados correctamente.");
	await db.$disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });
