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
- App móvil compartida (Xtarly Shared) y app white-label por marca (Branded)
- Apple Wallet + Google Wallet: la tarjeta aparece en el lock screen del cliente cuando está cerca del negocio
- Panel web con analytics completo: segmentos RFM, Membership Rate, Member Lift, ticket promedio, frecuencia
- Campañas de push notifications: winback, cumpleaños, urgencia de puntos, campañas manuales por segmento
- Panel cashier: solo un QR en caja — sin hardware adicional, sin app para el cajero
- Multi-sucursal: un programa para todas las sucursales, un solo dashboard
- Precios en MXN y USD, sin contrato anual, empieza gratis
- Planes: Gratis ($0, hasta 200 clientes), Shared ($499/mes), Branded ($1,999/mes)

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
        "subheadline": "Sin hardware. Sin instalaciones. Solo un QR.",
        "steps": [
          { "number": 1, "icon": "⬛", "title": "El cajero muestra el QR", "description": "Impreso o en tablet. Sin app adicional para el cajero." },
          { "number": 2, "icon": "📱", "title": "El cliente escanea", "description": "Con la cámara de su teléfono. Los puntos se suman al instante." },
          { "number": 3, "icon": "★", "title": "Aparece en su Wallet", "description": "Apple Wallet y Google Wallet. Se actualiza automáticamente." }
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
          { "number": 1, "icon": "📲", "title": "Primera visita", "description": "Escanea el QR y agrega su tarjeta a Wallet en 10 segundos." },
          { "number": 2, "icon": "⭐", "title": "Acumula [sellos/puntos]", "description": "Descripción específica al nicho de cómo y qué acumula." },
          { "number": 3, "icon": "🔔", "title": "Recibe notificaciones", "description": "Ejemplo de push específico al nicho." },
          { "number": 4, "icon": "🎁", "title": "Canjea", "description": "Recompensa específica al nicho que recibe el cliente." },
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
          { "emoji": "📱", "title": "App para tus clientes", "description": "Descripción adaptada al nicho" },
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
        "title": "Empieza gratis. Crece sin límites.",
        "plans": [
          {
            "name": "Gratis",
            "price": "$0",
            "period": "siempre",
            "highlight": false,
            "features": ["Hasta 200 clientes", "Programa de sellos o puntos", "Panel web básico", "Apple & Google Wallet"]
          },
          {
            "name": "Shared",
            "price": "$499",
            "period": "mes",
            "highlight": true,
            "features": ["Clientes ilimitados", "App Xtarly compartida", "Push notifications", "Analytics + RFM", "Campañas automáticas", "Multi-sucursal"]
          },
          {
            "name": "Branded",
            "price": "$1,999",
            "period": "mes",
            "highlight": false,
            "features": ["Todo en Shared", "App con tu nombre y logo", "En App Store y Google Play", "Soporte prioritario"]
          }
        ]
      }
    },
    {
      "type": "cta",
      "order": 14,
      "content": {
        "title": "Empieza hoy. Sin tarjeta de crédito.",
        "subtitle": "Tu programa de recompensas listo en menos de 5 minutos.",
        "ctaText": "Crear cuenta gratis",
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

	return parsed.slides;
}
