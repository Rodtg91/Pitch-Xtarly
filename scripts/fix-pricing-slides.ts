import { prisma as db } from "../lib/db";

const NEW_PLANS = [
	{
		name: "Wallet", price: "19 US$", period: "mes", highlight: false,
		trial: "14 días de prueba gratis",
		features: [
			"Sin app móvil — tarjetas en Apple Wallet y Google Wallet",
			"Notificaciones personalizadas y por geolocalización",
			"Hasta 300 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Analíticas avanzadas con KPIs y RFM",
		],
	},
	{
		name: "Shared", price: "29 US$", period: "mes", highlight: true,
		trial: "14 días de prueba gratis",
		features: [
			"Tarjetas digitales en Apple Wallet y Google Wallet",
			"App marketplace compartida (sin marca blanca)",
			"Hasta 600 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Dashboard completo con KPIs y RFM",
		],
	},
	{
		name: "Branded", price: "99 US$", period: "mes", highlight: false,
		features: [
			"Tu propia app marca blanca (basada en plantilla)",
			"Hasta 2,000 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Dashboard completo con KPIs y RFM",
			"Notificaciones por WhatsApp Business",
		],
	},
	{
		name: "Premium", price: "299 US$", period: "mes", highlight: false,
		features: [
			"App móvil totalmente personalizada (diseño a medida)",
			"Hasta 6,000 transacciones / mes incluidas",
			"$0.05 USD por transacción adicional",
			"Notificaciones por WhatsApp Business",
			"REST API, webhooks y onboarding prioritario",
		],
	},
	{
		name: "Founder Lifetime", price: "799 US$", lifetime: true, highlight: false,
		features: [
			"Sin cuota mensual recurrente, nunca",
			"Todas las funciones del plan Branded",
			"Limitado a los primeros founders — cohorte limitada",
		],
	},
];

async function run() {
	const slides = await db.pitchSlide.findMany({ where: { type: "pricing" } });
	console.log(`Found ${slides.length} pricing slides`);

	for (const slide of slides) {
		const content = slide.content as Record<string, unknown>;
		await db.pitchSlide.update({
			where: { id: slide.id },
			data: {
				content: {
					...content,
					plans: NEW_PLANS,
				},
			},
		});
		console.log(`  ✓ Updated slide ${slide.id}`);
	}

	console.log("\n✅ All pricing slides updated.");
	await db.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
