import OpenAI from "openai";

function getOpenAI() {
	return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export interface SlideContent {
	[key: string]: unknown;
}

export interface GeneratedSlide {
	type:
		| "cover"
		| "problem"
		| "solution"
		| "features"
		| "pricing"
		| "testimonial"
		| "cta"
		| "wallet"
		| "how-it-works"
		| "roi"
		| "vs-comparison"
		| "journey"
		| "analytics"
		| "notifications";
	order: number;
	content: SlideContent;
}

const SYSTEM_PROMPT = `Eres el mejor consultor de ventas B2B de lealtad para negocios mexicanos y latinoamericanos.
Conoces profundamente la psicología de retención de clientes, los programas de lealtad, y la plataforma Xtarly Rewards al 100%.

SOBRE XTARLY REWARDS:
- Programa de puntos, sellos (stamps) o niveles VIP totalmente configurable
- App móvil compartida (Xtarly Rewards) y app white-label por marca (Branded)
- Apple Wallet + Google Wallet: la tarjeta aparece en el lock screen del cliente cuando está cerca del negocio
- Panel web con analytics completo: segmentos RFM, Membership Rate, Member Lift, ticket promedio, frecuencia
- Campañas de push notifications: winback, cumpleaños, urgencia de puntos, campañas manuales por segmento
- Xtarly Cashier: app móvil iOS/Android que el cajero usa para escanear el QR del cliente, ingresar el monto y confirmar en 5 segundos. Sin hardware adicional.
- Multi-sucursal: un programa para todas las sucursales, un solo dashboard
- Precios en MXN y USD, sin contrato anual, prueba gratis 14 días
- Planes: Wallet ($19 USD/mes), Shared ($29 USD/mes), Branded ($99 USD/mes), Premium ($299 USD/mes)

FLUJO CORRECTO (CRÍTICO — nunca invertir los roles):
1. INSCRIPCIÓN (una vez): el cliente escanea el QR de inscripción del negocio (impreso en caja o mesa) → llena el formulario → agrega su tarjeta a Apple/Google Wallet o descarga la app Xtarly Rewards.
2. CADA COMPRA: el cliente abre su Wallet o app → muestra su QR personal al cajero → el CAJERO escanea el QR con Xtarly Cashier → ingresa el monto → confirma → puntos/sellos sumados al instante → el cliente recibe push y su Wallet se actualiza.
3. CANJE: el cliente selecciona una recompensa en su app → la app genera un QR de canje temporal → lo muestra al cajero → el cajero lo escanea con Xtarly Cashier → confirma → puntos deducidos.
REGLA DE ORO: es el CAJERO quien escanea el QR del cliente con Xtarly Cashier, NO al revés. El cliente solo muestra su código.

FLUJO PSICOLÓGICO (respetar este orden):
Hook → Dolor → Solución → Simplicidad → Diferenciador (Wallet) → Validación (Journey) →
Inteligencia (Analytics) → Re-engagement (Push) → ROI → Comparativa → Features → Prueba social → Precio → Acción

REGLAS DE COPY:
- Tú al dueño del negocio, siempre
- Máximo 12 palabras en el headline
- Lenguaje simple: no "solución de fidelización multi-tenant", sí "programa de recompensas para tu negocio"
- Números realistas para México (MXN, frecuencias reales por nicho)
- Testimonios que suenen como habla real un dueño de negocio mexicano

Responde SOLO con JSON válido, sin texto adicional, sin markdown.`;

function buildUserPrompt(nicheName: string, customInstructions?: string): string {
	return `Genera una presentación de ventas de Xtarly Rewards para el nicho: "${nicheName}".
${customInstructions ? `\nContexto adicional: ${customInstructions}` : ""}

Genera exactamente 14 slides en este orden y con esta estructura JSON:

{
  "slides": [
    {
      "type": "cover",
      "order": 1,
      "content": {
        "headline": "Headline poderoso específico al nicho (máx 12 palabras)",
        "subheadline": "Propuesta de valor en 1 oración",
        "tagline": "Xtarly Rewards"
      }
    },
    {
      "type": "problem",
      "order": 2,
      "content": {
        "title": "El problema real de [nicho]",
        "points": [
          { "emoji": "😟", "text": "Dolor específico del nicho con dato real (ej: frecuencia, % de abandono)" },
          { "emoji": "💸", "text": "Costo económico del problema para este negocio" },
          { "emoji": "👻", "text": "El cliente anónimo: no sabes quién es ni cómo recuperarlo" }
        ]
      }
    },
    {
      "type": "solution",
      "order": 3,
      "content": {
        "title": "Xtarly Rewards: la forma moderna de fidelizar",
        "description": "1-2 oraciones de cómo Xtarly resuelve el problema de este nicho específico.",
        "benefitPoints": ["Beneficio 1 simple y directo", "Beneficio 2", "Beneficio 3"]
      }
    },
    {
      "type": "how-it-works",
      "order": 4,
      "content": {
        "headline": "Tan simple que tu cajero lo aprende en 2 minutos.",
        "subheadline": "Sin hardware extra. Solo la app Xtarly Cashier en el teléfono del cajero.",
        "steps": [
          { "number": 1, "icon": "📲", "title": "El cliente muestra su QR", "description": "Abre su app o Wallet y muestra su código al cajero. Sin tarjetas físicas." },
          { "number": 2, "icon": "📷", "title": "El cajero escanea y registra", "description": "Xtarly Cashier en iOS o Android. Ingresa el monto y confirma en 5 segundos." },
          { "number": 3, "icon": "⭐", "title": "Puntos sumados al instante", "description": "Notificación push al cliente. Su Wallet se actualiza automáticamente." }
        ]
      }
    },
    {
      "type": "wallet",
      "order": 5,
      "content": {
        "headline": "Vive en el bolsillo de tu cliente. Siempre.",
        "subheadline": "La tarjeta aparece en su lock screen cuando pasa cerca de tu negocio. Sin abrir ninguna app.",
        "benefits": [
          "Nunca se olvida en casa — vive en Apple y Google Wallet",
          "Notificación de proximidad automática al pasar enfrente",
          "Se actualiza en cada visita sin que el cliente haga nada",
          "Se agrega en 10 segundos la primera vez"
        ],
        "stat": "El diferenciador que las tarjetas de papel nunca podrán ofrecer.",
        "notificationText": "Notificación específica al nicho — ej para cafetería: 'Estás cerca de Café La Viga ☕ — tienes 8 sellos, te falta 1!'"
      }
    },
    {
      "type": "journey",
      "order": 6,
      "content": {
        "headline": "La experiencia que tus clientes van a amar.",
        "subheadline": "De desconocido a cliente fiel — en 5 momentos.",
        "moments": [
          { "number": 1, "icon": "📲", "title": "Primera visita", "description": "Escanea el QR de inscripción del negocio → agrega su tarjeta a Wallet o descarga la app. 10 segundos." },
          { "number": 2, "icon": "⭐", "title": "Acumula en cada visita", "description": "Muestra su QR al cajero. El cajero escanea con Xtarly Cashier y suma [sellos/puntos] al instante." },
          { "number": 3, "icon": "🔔", "title": "Recibe notificaciones", "description": "Ejemplo de push específico al nicho y al momento (proximidad, cumpleaños, winback)." },
          { "number": 4, "icon": "🎁", "title": "Canjea su recompensa", "description": "Genera un QR de canje desde la app y lo muestra al cajero. Confirmado en segundos." },
          { "number": 5, "icon": "💛", "title": "Regresa más seguido", "description": "Mensaje emocional específico al nicho." }
        ]
      }
    },
    {
      "type": "analytics",
      "order": 7,
      "content": {
        "headline": "Tu negocio bajo una sola vista.",
        "subheadline": "Clientes, frecuencia, retención y ticket promedio — en tiempo real.",
        "kpis": [
          { "label": "Clientes activos", "value": "342", "delta": "+18 este mes", "positive": true },
          { "label": "Membership rate", "value": "34%", "delta": "+4% vs mes anterior", "positive": true },
          { "label": "Member lift", "value": "+28%", "delta": "vs clientes sin programa", "positive": true },
          { "label": "Ticket promedio", "value": "$[ticket realista MXN para el nicho]", "delta": "+$[delta razonable] con loyalty", "positive": true }
        ]
      }
    },
    {
      "type": "notifications",
      "order": 8,
      "content": {
        "headline": "Habla con tus clientes cuando más importa.",
        "subheadline": "Push directo a su teléfono. Sin algoritmo. Sin costo adicional.",
        "notifications": [
          { "type": "proximity", "title": "Xtarly Rewards", "body": "Notificación de proximidad específica al nicho", "time": "ahora" },
          { "type": "birthday", "title": "Xtarly Rewards", "body": "Notificación de cumpleaños con recompensa específica al nicho", "time": "8:00 AM" },
          { "type": "winback", "title": "Xtarly Rewards", "body": "Reactivación: menciona días sin visita + incentivo del nicho", "time": "ayer" },
          { "type": "campaign", "title": "Xtarly Rewards", "body": "Campaña específica: día especial, temporada o promoción del nicho", "time": "lun 9:00" }
        ],
        "stat": "CTR de push en loyalty: 8.1% — 8× más que email. Incluido en todos los planes."
      }
    },
    {
      "type": "roi",
      "order": 9,
      "content": {
        "headline": "El programa que se paga a sí mismo.",
        "subheadline": "Ejemplo con números reales de ${nicheName}:",
        "dailyVisits": 100,
        "avgTicket": 200,
        "enrollmentRate": 30,
        "frequencyLift": 25,
        "planCost": 499
      }
    },
    {
      "type": "vs-comparison",
      "order": 10,
      "content": {
        "headline": "Las tarjetas de papel ya no funcionan.",
        "subheadline": "Compara lo que tienes hoy con lo que puede tener tu negocio.",
        "variant": "paper"
      }
    },
    {
      "type": "features",
      "order": 11,
      "content": {
        "title": "Todo lo que incluye Xtarly Rewards",
        "features": [
          { "emoji": "🎯", "title": "3 programas a tu medida", "description": "Sellos por visita, Puntos por monto de compra o Niveles VIP Bronze→Gold. Tú decides cuál encaja con tu negocio." },
          { "emoji": "💳", "title": "Apple & Google Wallet", "description": "Tarjeta digital que vive en el teléfono del cliente" },
          { "emoji": "📊", "title": "Dashboard analytics", "description": "Segmentos RFM, frecuencia, ticket, retención en tiempo real" },
          { "emoji": "🔔", "title": "Push notifications", "description": "Winback, cumpleaños, campañas — automáticos y segmentados" }
        ]
      }
    },
    {
      "type": "testimonial",
      "order": 12,
      "content": {
        "quote": "Testimonio creíble específico al nicho con resultado concreto en número. Debe sonar como habla real un dueño de negocio mexicano, no como texto corporativo.",
        "author": "Nombre mexicano",
        "business": "Nombre del negocio, Ciudad mexicana"
      }
    },
    {
      "type": "pricing",
      "order": 13,
      "content": {
        "title": "Precios simples. Crece sin límites.",
        "plans": [
          {
            "name": "Wallet",
            "price": "19 US$",
            "period": "mes",
            "highlight": false,
            "trial": "14 días de prueba gratis",
            "features": [
              "Sin app móvil — tarjetas en Apple Wallet y Google Wallet",
              "Notificaciones personalizadas y por geolocalización",
              "Hasta 300 transacciones / mes incluidas",
              "$0.05 USD por transacción adicional",
              "Analíticas avanzadas con KPIs y RFM"
            ]
          },
          {
            "name": "Shared",
            "price": "29 US$",
            "period": "mes",
            "highlight": true,
            "trial": "14 días de prueba gratis",
            "features": [
              "Tarjetas digitales en Apple Wallet y Google Wallet",
              "App marketplace compartida (sin marca blanca)",
              "Hasta 600 transacciones / mes incluidas",
              "$0.05 USD por transacción adicional",
              "Dashboard completo con KPIs y RFM"
            ]
          },
          {
            "name": "Branded",
            "price": "99 US$",
            "period": "mes",
            "highlight": false,
            "features": [
              "Tu propia app marca blanca (basada en plantilla)",
              "Hasta 2,000 transacciones / mes incluidas",
              "$0.05 USD por transacción adicional",
              "Dashboard completo con KPIs y RFM",
              "Notificaciones por WhatsApp Business"
            ]
          },
          {
            "name": "Premium",
            "price": "299 US$",
            "period": "mes",
            "highlight": false,
            "features": [
              "App móvil totalmente personalizada (diseño a medida)",
              "Hasta 6,000 transacciones / mes incluidas",
              "$0.05 USD por transacción adicional",
              "Notificaciones por WhatsApp Business",
              "REST API, webhooks y onboarding prioritario"
            ]
          },
          {
            "name": "Founder Lifetime",
            "price": "799 US$",
            "lifetime": true,
            "highlight": false,
            "features": [
              "Sin cuota mensual recurrente, nunca",
              "Todas las funciones del plan Branded",
              "Limitado a los primeros founders — cohorte limitada"
            ]
          }
        ]
      }
    },
    {
      "type": "cta",
      "order": 14,
      "content": {
        "title": "14 días gratis. Sin compromisos.",
        "subtitle": "Tu programa de recompensas listo en menos de 5 minutos.",
        "ctaText": "Empezar gratis",
        "ctaUrl": "https://xtarly.com",
        "contact": {
          "whatsapp": "+52 55 0000 0000",
          "email": "hola@xtarly.com",
          "web": "xtarly.com"
        }
      }
    }
  ]
}`;
}

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

export async function generatePitchSlides(
	nicheName: string,
	customInstructions?: string,
): Promise<GeneratedSlide[]> {
	const response = await getOpenAI().chat.completions.create({
		model: "gpt-4o",
		messages: [
			{ role: "system", content: SYSTEM_PROMPT },
			{ role: "user", content: buildUserPrompt(nicheName, customInstructions) },
		],
		response_format: { type: "json_object" },
		temperature: 0.65,
	});

	const raw = response.choices[0]?.message?.content ?? "{}";
	const parsed = JSON.parse(raw) as { slides?: GeneratedSlide[] };

	if (!parsed.slides || !Array.isArray(parsed.slides)) {
		throw new Error("La IA no devolvió slides válidos");
	}

	return parsed.slides.map((slide) => {
		if (slide.type === "solution" && NICHE_SOLUTION_IMAGES[nicheName]) {
			return { ...slide, content: { ...slide.content, imageUrl: NICHE_SOLUTION_IMAGES[nicheName] } };
		}
		if (slide.type === "problem" && NICHE_PROBLEM_IMAGES[nicheName]) {
			return { ...slide, content: { ...slide.content, imageUrl: NICHE_PROBLEM_IMAGES[nicheName] } };
		}
		return slide;
	});
}
