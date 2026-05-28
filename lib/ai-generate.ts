import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface SlideContent {
	[key: string]: unknown;
}

export interface GeneratedSlide {
	type: "cover" | "problem" | "solution" | "features" | "pricing" | "testimonial" | "cta";
	order: number;
	content: SlideContent;
}

const SYSTEM_PROMPT = `Eres un experto en ventas B2B para pequeñas y medianas empresas en México y LATAM.
Tu objetivo es generar presentaciones de ventas persuasivas para Xtarly Rewards: una plataforma de lealtad y puntos para clientes (similar a una tarjeta de puntos digital).

Características clave de Xtarly:
- Programa de puntos, sellos o niveles (tiers) totalmente personalizable
- App móvil white-label para los clientes del negocio
- Panel de control web para el dueño del negocio
- Estadísticas de retención y comportamiento de clientes
- Cupones, recompensas y notificaciones push
- Integración con punto de venta (QR, POS)
- Precios: Plan Gratis (básico), Shared $499/mes (multi-tenant app), Branded $1,999/mes (app propia)

Responde SOLO con JSON válido, sin texto adicional, sin markdown.`;

function buildUserPrompt(nicheName: string, customInstructions?: string): string {
	return `Genera una presentación de ventas de Xtarly Rewards para el nicho: "${nicheName}".
${customInstructions ? `\nInstrucciones adicionales: ${customInstructions}` : ""}

Genera entre 7 y 9 slides con esta estructura exacta en JSON:

{
  "slides": [
    {
      "type": "cover",
      "order": 1,
      "content": {
        "headline": "Título impactante relacionado al nicho",
        "subheadline": "Subtítulo breve con propuesta de valor",
        "tagline": "Xtarly Rewards"
      }
    },
    {
      "type": "problem",
      "order": 2,
      "content": {
        "title": "Los retos de [nicho]",
        "points": [
          { "emoji": "😟", "text": "Dolor real del nicho" },
          { "emoji": "💸", "text": "Otro dolor" },
          { "emoji": "📉", "text": "Tercer dolor" }
        ]
      }
    },
    {
      "type": "solution",
      "order": 3,
      "content": {
        "title": "Xtarly Rewards: Tu solución",
        "description": "Párrafo corto explicando cómo Xtarly resuelve los dolores anteriores para este nicho específico.",
        "benefitPoints": ["Beneficio 1", "Beneficio 2", "Beneficio 3"]
      }
    },
    {
      "type": "features",
      "order": 4,
      "content": {
        "title": "Todo lo que incluye",
        "features": [
          { "emoji": "📱", "title": "App para tus clientes", "description": "Descripción breve adaptada al nicho" },
          { "emoji": "📊", "title": "Panel de control", "description": "Descripción breve" },
          { "emoji": "🎁", "title": "Recompensas y cupones", "description": "Descripción breve" },
          { "emoji": "🔔", "title": "Notificaciones push", "description": "Descripción breve adaptada al nicho" }
        ]
      }
    },
    {
      "type": "pricing",
      "order": 5,
      "content": {
        "title": "Planes y precios",
        "plans": [
          { "name": "Gratis", "price": "$0", "period": "siempre", "highlight": false, "features": ["Hasta 100 clientes", "Programa de puntos básico", "Panel web"] },
          { "name": "Shared", "price": "$499", "period": "mes", "highlight": true, "features": ["Clientes ilimitados", "App Xtarly compartida", "Cupones y recompensas", "Estadísticas avanzadas"] },
          { "name": "Branded", "price": "$1,999", "period": "mes", "highlight": false, "features": ["Todo en Shared", "App con tu marca propia", "Notificaciones push", "Soporte prioritario"] }
        ]
      }
    },
    {
      "type": "testimonial",
      "order": 6,
      "content": {
        "quote": "Testimonio creíble y específico al nicho sobre el impacto de Xtarly en su negocio. Menciona resultados concretos (ej. % de clientes que regresan).",
        "author": "Nombre del dueño",
        "business": "Nombre del negocio, Ciudad"
      }
    },
    {
      "type": "cta",
      "order": 7,
      "content": {
        "title": "¿Listo para fidelizar a tus clientes?",
        "subtitle": "Empieza gratis hoy mismo, sin tarjeta de crédito",
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
	const response = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{ role: "system", content: SYSTEM_PROMPT },
			{ role: "user", content: buildUserPrompt(nicheName, customInstructions) },
		],
		response_format: { type: "json_object" },
		temperature: 0.7,
	});

	const raw = response.choices[0]?.message?.content ?? "{}";
	const parsed = JSON.parse(raw) as { slides?: GeneratedSlide[] };

	if (!parsed.slides || !Array.isArray(parsed.slides)) {
		throw new Error("La IA no devolvió slides válidos");
	}

	return parsed.slides;
}
