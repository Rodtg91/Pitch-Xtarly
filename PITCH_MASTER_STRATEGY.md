# Xtarly Rewards — Arquitectura Maestra de Presentación Comercial

> Documento estratégico. Nivel: Apple × Stripe × Toast × Shopify.
> Tropicalizable a cualquier nicho en <30 minutos.

---

## TABLA DE CONTENIDOS

1. [Análisis Estratégico Profundo](#1-análisis-estratégico-profundo)
2. [FASE 1 — Narrativa y Flujo Psicológico](#fase-1--narrativa-y-flujo-psicológico)
3. [FASE 2 — Diseño Pantalla por Pantalla](#fase-2--diseño-pantalla-por-pantalla)
4. [FASE 3 — Sistema Modular](#fase-3--sistema-modular)
5. [FASE 4 — Tropicalización por Nicho](#fase-4--tropicalización-por-nicho)
6. [FASE 5 — Dirección Visual](#fase-5--dirección-visual)
7. [FASE 6 — Assets Necesarios](#fase-6--assets-necesarios)
8. [FASE 7 — Output Final y Roadmap](#fase-7--output-final-y-roadmap)

---

## 1. ANÁLISIS ESTRATÉGICO PROFUNDO

### 1.1 Psicología de Retención: La Economía del Cliente Fiel

**La regla del 5%:** Según Bain & Company, aumentar la retención de clientes en solo 5% incrementa las ganancias entre 25% y 95%. Esta es la estadística que abre puertas.

**El cliente anónimo vs. el cliente identificado:**

| Dimensión | Cliente Anónimo | Cliente Identificado |
|---|---|---|
| Frecuencia de visita | No medible | Trackeable y optimizable |
| Ticket promedio | No medible | Incrementable con campañas |
| Lifetime Value | Desconocido | Calculable (LTV = frecuencia × ticket × meses activos) |
| Capacidad de winback | Imposible | Push notification + wallet update |
| Segmentación | Ninguna | RFM completo (Recencia, Frecuencia, Monto) |
| Costo de retención | Cero control | Campañas dirigidas con ROI medible |

**El costo oculto del cliente anónimo:**
- Una cafetería con 200 visitas/día: si solo 20% de clientes está identificado, el 80% restante (160 visitas) podrían estar comprando también en la competencia y el dueño no lo sabe.
- Sin identificación, **no hay fidelización posible**. Solo esperanza.
- El dueño invierte en redes sociales para atraer clientes nuevos (costo de adquisición alto) cuando los clientes existentes son 5-7x más baratos de retener.

### 1.2 La Economía de los Programas de Loyalty

**Frecuencia de visita — el multiplicador real:**
- Si un cliente visita 1x/mes y lo conviertes a 1.5x/mes: +50% de ingresos por ese cliente sin un solo peso en marketing.
- "Member lift" típico en negocios con loyalty activo: +25-40% más visitas en clientes enrolled vs. no enrolled.

**Ticket promedio y gamificación:**
- Los clientes cerca de alcanzar un sello o nivel gastan más para "completarlo" (efecto de progresión).
- "Café grande por un sello extra" → el cliente pide el café grande aunque normalmente pida el chico.
- Puntos con vencimiento generan urgencia de visita antes de que expiren.

**Loyalty fatigue — el problema de los programas viejos:**
- Tarjetas físicas: 60% se pierden, 30% se olvidan en casa, 80% de usuarios abandona en 3 meses.
- Apps viejas: fricción altísima en onboarding (registro largo, no tiene iPhone compatible, requiere datos bancarios).
- Programas de puntos opacos: "¿cuántos puntos tengo? ¿para qué sirven?" → abandono.

**La solución Xtarly: fricción cero en adopción:**
- QR en caja → scanner de cámara → se abre la app store o la wallet → listo.
- El cliente no necesita recordar nada: la tarjeta vive en Apple/Google Wallet y aparece **automáticamente** cuando entra al negocio (geofencing de Wallet).
- El cajero no necesita formación compleja: solo escanea el QR del cliente.

### 1.3 Diferencias entre Tipos de Programa

**Sellos (Stamps):**
- Ideal para: alta frecuencia + ticket bajo (cafeterías, autolavados, pastelerías, salones)
- Psicología: progresión visual clara → "me faltan 2 sellos para el café gratis"
- Riesgo de abuso: bajo con QR (vs. tarjeta física que el cajero podría sellar múltiples veces)
- Benchmark: 10 compras = 1 gratis es el estándar que funciona

**Puntos (Points):**
- Ideal para: ticket medio-alto + variedad de productos (restaurantes, tiendas de ropa, farmacias)
- Psicología: acumulación aspiracional → "ya tengo $200 en puntos"
- Ventaja: flexible, permite campañas de puntos dobles, bonos por producto
- Benchmark: $1 gastado = 1 punto; 100 puntos = $10 de descuento (10% cashback efectivo)

**Niveles VIP (Tiers):**
- Ideal para: negocios con amplio rango de gasto o servicios premium (spas, gyms, restaurantes fine)
- Psicología: estatus social + exclusividad → "soy cliente Platinum"
- Ventaja: los clientes top reciben beneficios top → se sienten especiales → no se van
- Benchmark: Bronze → Silver → Gold → Platinum

**Combinación óptima por nicho:** Ver Fase 4.

### 1.4 Wallet Marketing: El Arma Secreta

Apple Wallet y Google Wallet son los diferenciadores más poderosos de Xtarly y los más infrautilizados del mercado:

- **Notificaciones de proximidad (Geofencing):** cuando el cliente pasa frente al negocio, le aparece en pantalla de bloqueo la tarjeta de loyalty con su saldo. Sin necesidad de que abra una app. Esto es **imposible** con tarjetas físicas y pocas apps lo ofrecen.
- **Wallet updates silenciosas:** actualizar puntos, sellos, o nivel directamente en la tarjeta sin que el cliente abra nada.
- **Zero friction:** el cliente agrega la tarjeta una vez y nunca más necesita instalar, actualizar, o recordar.
- **Branding premium:** una tarjeta de wallet bien diseñada comunica "este negocio es serio".

### 1.5 Push Notifications: El Canal de Re-engagement

- Costo: $0 (incluido en el plan).
- CTR típico de push en loyalty: 4-8x más alto que email.
- Casos de uso accionables:
  - **Winback:** "Hace 30 días que no te vemos, tu café favorito te espera + 10 puntos extra"
  - **Urgencia:** "Tus puntos vencen en 3 días"
  - **Gamificación:** "¡Te falta 1 sello para tu recompensa!"
  - **Campaña estacional:** "Lunes de doble puntos, solo hoy"
  - **Cumpleaños:** "Hoy es tu día — tienes una sorpresa esperándote"

### 1.6 RFM y Segmentación: Data Ownership

RFM = Recencia + Frecuencia + Monto Gastado.

Este análisis, que hasta hace poco solo tenían empresas Fortune 500, Xtarly lo da automáticamente:

| Segmento RFM | Descripción | Acción recomendada |
|---|---|---|
| Champions | Compran seguido, hace poco, gastan mucho | Recompénsalos, pídeles referidos |
| Loyal Customers | Compran regularmente | Ofréceles upgrade a VIP |
| At Risk | Antes eran buenos, llevan tiempo sin venir | Campaña winback urgente |
| Lost | No han venido en 90+ días | Oferta agresiva o reconquista |
| New Customers | Primer o segunda visita | Onboarding especial, 2x puntos |

**El argumento de venta:** "Hoy, ¿sabes quiénes son tus mejores 20 clientes? ¿Sabes cuáles están a punto de irse? Con Xtarly, sí puedes saberlo."

---

## FASE 1 — NARRATIVA Y FLUJO PSICOLÓGICO

### 1.1 La Narrativa Maestra

**El arco narrativo en 3 actos:**

**ACTO I — El Problema (Slides 1-5):** El negocio está perdiendo dinero sin saberlo. Sus clientes son fantasmas. La tarjeta física falló. Las apps viejas fallaron.

**ACTO II — La Transformación (Slides 6-16):** Xtarly convierte clientes anónimos en clientes conocidos, medidos, retenidos. QR → Wallet → Push → Analytics → Campañas.

**ACTO III — El Cierre (Slides 17-22):** ROI demostrable, plan de acción, precios claros, empieza hoy gratis.

---

### 1.2 Flujo Psicológico Completo

```
FOMO          → "¿Cuántos clientes nunca volvieron?"
    ↓
DOLOR         → Visualizar la pérdida real (en pesos)
    ↓
VERGÜENZA     → "Las tarjetas de papel son del pasado"
    ↓
CURIOSIDAD    → "¿Cómo lo hacen los grandes?"
    ↓
SORPRESA      → "Esto existe y está al alcance de mi negocio"
    ↓
CONFIANZA     → Ver cómo funciona, es simple
    ↓
DESEO         → Imaginar su negocio con esto
    ↓
LÓGICA        → ROI, números, validación racional
    ↓
PRUEBA SOCIAL → Otros negocios ya lo tienen
    ↓
URGENCIA      → "Mientras no lo tienes, la competencia te gana"
    ↓
ACCIÓN        → Empezar gratis hoy, sin tarjeta
```

---

### 1.3 Orden Perfecto de Slides (Arquitectura Maestra — 22 slides)

| # | Tipo | Emoción Target | Objeción que Elimina |
|---|---|---|---|
| 1 | Cover — Hook | Curiosidad / Tensión | N/A — apertura |
| 2 | La verdad fría | FOMO + Incomodidad | "Mis clientes sí regresan" |
| 3 | El costo real | Dolor cuantificado | "No es tan importante" |
| 4 | El cliente anónimo | Frustración + Empatía | "No necesito datos" |
| 5 | La tarjeta física falló | Liberación | "Ya tengo tarjetas de puntos" |
| 6 | Xtarly — La nueva era | Alivio + Esperanza | "¿Qué lo hace diferente?" |
| 7 | Cómo funciona | Confianza + Claridad | "¿Es complicado?" |
| 8 | Wallet Magic | Sorpresa + Deseo | "¿Los clientes lo van a usar?" |
| 9 | Customer Journey | Empatía + Validación | "Mis clientes no descargan apps" |
| 10 | Experiencia cajero | Tranquilidad | "Mi personal no lo va a usar" |
| 11 | Dashboard Analytics | Control + Poder | "¿Qué hago con los datos?" |
| 12 | Segmentos RFM | Inteligencia | "¿Cómo uso eso en la práctica?" |
| 13 | Push Notifications | Urgencia / FOMO | "¿Cómo recupero clientes perdidos?" |
| 14 | Campañas automáticas | Ahorro de tiempo | "No tengo tiempo para marketing" |
| 15 | Gamificación | Diversión + Deseo | "¿Los clientes van a participar?" |
| 16 | Multi-sucursal | Escalabilidad | "Tengo más de una tienda" |
| 17 | ROI Proof | Certeza + Codicia | "¿Cuánto me va a costar?" |
| 18 | vs. Tarjetas físicas | Superioridad | "Las tarjetas me funcionan bien" |
| 19 | vs. Competencia | Diferenciación | "¿Por qué Xtarly y no otro?" |
| 20 | White label / Branded | Status + Ambición | "Quiero mi propia app" |
| 21 | Planes y precios | Accesibilidad | "Debe ser muy caro" |
| 22 | CTA — Cierre | Urgencia + Acción | "Lo voy a pensar" |

---

## FASE 2 — DISEÑO PANTALLA POR PANTALLA

### SLIDE 1 — Cover / Hook

| Campo | Contenido |
|---|---|
| **Objetivo** | Generar tensión inmediata + identidad de marca |
| **Headline** | `¿Cuántos de tus clientes de hoy nunca van a regresar?` |
| **Subheadline** | `La mayoría de negocios lo desconoce. Los que sí lo saben, lo están cambiando.` |
| **Tagline** | `Xtarly Rewards — [Nombre del Nicho]` |
| **Visual** | Full-bleed dark background (#1B1638), foto lifestyle del nicho con overlay 40%, logo Xtarly brillante centrado-superior, headline centrado en blanco con gradiente en palabra clave |
| **Animación** | Partículas/sparkles flotando sutilmente del logo. Headline aparece con fade-up staggered |
| **Jerarquía** | Logo → Headline (80px bold) → Subheadline (24px) → Tagline (14px capslock) |
| **Emoción target** | Tensión + curiosidad existencial |
| **CTA implícito** | Ninguno — solo atrapa |

---

### SLIDE 2 — La Verdad Fría

| Campo | Contenido |
|---|---|
| **Objetivo** | Cuantificar la pérdida para hacer el problema tangible |
| **Headline** | `El 70% de tus clientes son desconocidos` |
| **Subheadline** | `No tienes su nombre. No tienes su número. No puedes contactarlos. Cuando se van, se van para siempre.` |
| **Visual** | Split visual: lado izquierdo fondo oscuro con estadística grande en gradiente neon; lado derecho: foto de cajero recibiendo pago anónimo (cliente de espaldas) |
| **Dato clave** | `Solo el 27% de clientes deja sus datos en un negocio local sin incentivo.` (fuente: Bond Loyalty Report) |
| **Elemento gráfico** | 100 siluetas de personas; 73 en gris apagado, 27 en gradiente cyan-violet-magenta |
| **Animación** | Siluetas grises aparecen primero, luego las de color se iluminan |
| **Emoción target** | FOMO + incomodidad |
| **Objeción eliminada** | "Mis clientes sí regresan solos" |

---

### SLIDE 3 — El Costo Real

| Campo | Contenido |
|---|---|
| **Objetivo** | Hacer el costo tangible en pesos mexicanos |
| **Headline** | `Estás perdiendo $[X] al mes sin saberlo` |
| **Subheadline** | `Cada cliente que no regresa es ingreso que dejaste ir. El problema no es la atracción — es la retención.` |
| **Visual** | Calculadora visual interactiva conceptual: "Si tienes 100 clientes/día × ticket $150 × visitan 1x/mes = $15,000/mes. Con loyalty, visitan 1.4x/mes = $21,000/mes. Diferencia: $6,000/mes." |
| **Storytelling** | "Un restaurante con 80 clientes al día, ticket promedio $200. Si el 30% de esos clientes se identificara y visitara 30% más frecuente... son $48,000 pesos extra al mes. Sin invertir en publicidad." |
| **Elemento gráfico** | Gráfica de barras mostrando ingreso actual vs. ingreso con loyalty activo |
| **Animación** | Las barras crecen animadas; la barra de "con Xtarly" crece más lento, dramáticamente |
| **Emoción target** | Dolor cuantificado → urgencia de actuar |
| **Funcionalidad Xtarly** | Member lift analytics, frecuencia de visita |

---

### SLIDE 4 — El Cliente Anónimo

| Campo | Contenido |
|---|---|
| **Objetivo** | Crear empatía con el problema de la invisibilidad |
| **Headline** | `Tu mejor cliente entró hoy. ¿Lo reconociste?` |
| **Subheadline** | `Sin un programa de lealtad, cada visita empieza desde cero. No hay historia. No hay relación.` |
| **Visual** | Dos columnas: "Sin Xtarly" (silueta borrosa, pregunta marks, sin datos) vs. "Con Xtarly" (foto de cliente real, nombre, visitas, último pedido, puntos, segmento) |
| **Dato clave** | "Los clientes identificados gastan 67% más que los anónimos" — Harvard Business Review |
| **Animación** | Silueta borrosa se "revela" y aparece el perfil completo del cliente |
| **Emoción target** | Empatía + revelación |
| **Funcionalidad Xtarly** | Customer profiles, registro, formularios personalizados |

---

### SLIDE 5 — La Tarjeta Física Falló

| Campo | Contenido |
|---|---|
| **Objetivo** | Desacreditar la "solución" existente del prospecto |
| **Headline** | `Las tarjetas de papel ya no funcionan.` |
| **Subheadline** | `Tu cliente las pierde. Las olvida. Y nunca te dan datos.` |
| **Visual** | Foto artística de tarjetas de sellos arrugadas, olvidadas, sucias; una cae dramáticamente al piso. Colores desaturados, mood de "viejo". |
| **Estadísticas** | 3 iconos: "60% se pierden o rompen" / "Sin datos del cliente" / "Fáciles de falsificar" |
| **Contraste** | Pequeño mockup de wallet card brillante Xtarly apareciendo desde la esquina como el "nuevo camino" |
| **Animación** | Tarjeta física se desvanece; wallet card aparece con glow |
| **Emoción target** | Liberación del pasado |
| **Objeción eliminada** | "Ya tengo tarjetas de puntos" |

---

### SLIDE 6 — Xtarly: La Nueva Era

| Campo | Contenido |
|---|---|
| **Objetivo** | Reveal de solución — el momento de alivio |
| **Headline** | `Xtarly Rewards. Tu programa de lealtad, sin complicaciones.` |
| **Subheadline** | `Convierte clientes anónimos en fans identificados, medidos y retenidos. Sin código. Sin contratos. En 5 minutos.` |
| **Visual** | Hero shot: iPhone con la app de Xtarly (o app nicho) mostrando puntos/sellos, pantalla luminosa, fondo muy oscuro con gradiente de marca. Logo grande con efecto glow. Mascota Xtarly celebrando en esquina (opcional). |
| **Puntos clave** | 3 bullets: "Programa configurable en minutos" / "App para tus clientes incluida" / "Dashboard con todo el negocio" |
| **Animación** | Reveal dramático: fondo negro → gradiente brand aparece → iPhone hace zoom-in suave |
| **Emoción target** | Alivio + esperanza + deseo |
| **Funcionalidades Xtarly** | Core platform overview |

---

### SLIDE 7 — Cómo Funciona (3 pasos)

| Campo | Contenido |
|---|---|
| **Objetivo** | Demostrar simplicidad operativa |
| **Headline** | `Tan simple que tu cajero lo aprende en 2 minutos.` |
| **Visual** | 3 pasos con iconografía grande y mockup de cada paso: |
| **Paso 1** | Icono QR → "El cajero muestra el QR de la compra" — mockup: tablet con QR en caja |
| **Paso 2** | Icono teléfono → "El cliente escanea y suma puntos/sellos automáticamente" — mockup: mano escaneando QR |
| **Paso 3** | Icono wallet/star → "Los puntos aparecen en su app y en su wallet" — mockup: pantalla de wallet actualizada |
| **Storytelling** | "No hay nada que instalar en tu caja. No hay hardware que comprar. Solo un código QR impreso o en pantalla." |
| **Animación** | Cada paso aparece con flecha conectora; mockups se revelan en secuencia |
| **Emoción target** | Confianza + "yo puedo hacer esto" |
| **Objeción eliminada** | "¿Es complicado de operar?" |

---

### SLIDE 8 — Wallet Magic

| Campo | Contenido |
|---|---|
| **Objetivo** | El momento "wow" — diferenciador que nadie más tiene |
| **Headline** | `Vive en el bolsillo de tu cliente. Siempre.` |
| **Subheadline** | `Tu tarjeta de lealtad aparece en Apple Wallet y Google Wallet. Automáticamente. Sin que el cliente tenga que abrir ninguna app.` |
| **Visual** | Hero: iPhone con notificación de lock screen apareciendo (blur background de exterior de negocio): "Estás cerca de Café La Viga — tienes 8 sellos 🌟". Debajo: mockup de tarjeta wallet con branding del negocio (sello animado, puntos, nivel). |
| **Dato killer** | "La tarjeta aparece cuando el cliente pasa frente a tu negocio. ¿Cuántos clientes entran solo porque se la recordaste?" |
| **3 beneficios** | "Nunca se olvida en casa" / "Notificaciones de proximidad sin instalar nada" / "Actualización automática de puntos" |
| **Animación** | Lock screen con notificación "drop in" animada; cartas de wallet flipean mostrando diseños de distintos nichos |
| **Emoción target** | Sorpresa + deseo inmediato |
| **Funcionalidad Xtarly** | Apple Wallet, Google Wallet, Wallet notifications por proximidad |
| **Objeción eliminada** | "Los clientes no van a descargar una app" |

---

### SLIDE 9 — Customer Journey

| Campo | Contenido |
|---|---|
| **Objetivo** | Mostrar la experiencia del cliente final de principio a fin |
| **Headline** | `La experiencia que tus clientes van a amar.` |
| **Visual** | Timeline horizontal o vertical con 5 momentos: |
| **Momento 1** | "Primera visita → Escanea el QR → Agrega la tarjeta a su Wallet en 10 segundos" |
| **Momento 2** | "Acumula sellos/puntos con cada visita → Ve su progreso en tiempo real" |
| **Momento 3** | "Recibe push cuando está cerca o cuando tiene sellos por completar" |
| **Momento 4** | "Alcanza su recompensa → Canjea en caja con un QR" |
| **Momento 5** | "Siente que lo conoces → Regresa más seguido" |
| **Mockups necesarios** | App home screen (sellos), notificación push, pantalla de canje, wallet card |
| **Emoción target** | Empatía + validación ("así se ve en la práctica") |
| **Funcionalidad Xtarly** | Sellos, puntos, canje, push notifications, wallet |

---

### SLIDE 10 — Experiencia Cajero

| Campo | Contenido |
|---|---|
| **Objetivo** | Eliminar el miedo de "mi staff no lo va a usar" |
| **Headline** | `Para el cajero, es solo un scan.` |
| **Subheadline** | `El panel de cajero es tan simple como una calculadora.` |
| **Visual** | Mockup del panel cashier web en tablet/iPad: QR grande centrado, botón "Registrar compra", historial simple. Foto: cajero joven sonriendo escaneando el teléfono de un cliente con tablet. |
| **3 puntos** | "No necesita app adicional" / "Solo ingresa el monto y escanea" / "Listo en 5 segundos" |
| **Storytelling** | "Capacitar a un cajero nuevo toma 5 minutos. Menos que enseñarles a usar la caja." |
| **Animación** | Demo screen recording del flujo cajero en 15 segundos |
| **Emoción target** | Tranquilidad / "esto no va a crear caos en mi operación" |
| **Funcionalidad Xtarly** | Panel cashier, UX cajero, QR scan |

---

### SLIDE 11 — Dashboard Analytics

| Campo | Contenido |
|---|---|
| **Objetivo** | Mostrar el poder de tener datos propios |
| **Headline** | `Tu negocio bajo una sola vista.` |
| **Subheadline** | `Clientes nuevos. Frecuencia. Retención. Ticket promedio. Todo en tiempo real.` |
| **Visual** | Screenshot del dashboard Xtarly con: gráfica de visitas (curva creciente), KPI cards (Total Members, Active Members, Membership Rate, Member Lift, Avg Ticket), mini mapa de calor horario, tabla top 10 clientes |
| **4 KPIs destacados** | `Membership Rate: 34%` / `Member Lift: +28%` / `Avg Monthly Visits: 2.7` / `Churn Risk Alerts: 12` |
| **Storytelling** | "Por primera vez, sabes quiénes son tus clientes más valiosos. Y quiénes están a punto de irse." |
| **Animación** | Dashboard "se construye" — las gráficas crecen animadas, números hacen count-up |
| **Emoción target** | Control + poder + inteligencia |
| **Funcionalidad Xtarly** | Dashboard analytics, membership rate, member lift, customer analytics |

---

### SLIDE 12 — Segmentos RFM

| Campo | Contenido |
|---|---|
| **Objetivo** | Demostrar la inteligencia que el dueño nunca tuvo |
| **Headline** | `¿Quiénes son tus mejores clientes? Ahora puedes saberlo.` |
| **Visual** | Matriz RFM visual: cuadrícula coloreada con Champions (verde brillante), Loyal (azul), At Risk (amarillo), Lost (rojo suave). Cada celda con número de clientes. Al hacer tap/hover, muestra acciones sugeridas. |
| **Ejemplo práctico** | "12 clientes At Risk este mes. ¿Ya les mandaste su cupón de regreso?" → botón "Crear campaña" |
| **Datos ejemplo** | Champions: 47 clientes / Loyal: 123 / At Risk: 38 / New: 89 / Lost: 21 |
| **Storytelling** | "Antes necesitabas un analista de datos para esto. Ahora lo hace Xtarly automáticamente cada semana." |
| **Animación** | Cada celda de la matriz aparece secuencialmente con animación de "pop" |
| **Emoción target** | Asombro + "esto es lo que necesitaba" |
| **Funcionalidad Xtarly** | Segmentos RFM, customer analytics |

---

### SLIDE 13 — Push Notifications

| Campo | Contenido |
|---|---|
| **Objetivo** | Mostrar el canal de marketing más poderoso incluido |
| **Headline** | `Habla con tus clientes cuando más importa.` |
| **Subheadline** | `Push notifications directas a su teléfono. Sin spam. Sin algoritmo. Sin costo adicional.` |
| **Visual** | 4 mockups de notificaciones push en iPhone: |
| **Notif 1** | Winback: "Ana, hace 21 días que no te vemos 😢 Tienes 50 puntos esperándote." |
| **Notif 2** | Urgencia: "Tus sellos vencen en 3 días — ¡ya casi tienes tu café gratis!" |
| **Notif 3** | Campaña: "Hoy lunes: puntos dobles en todo el menú ☕" |
| **Notif 4** | Cumpleaños: "¡Feliz cumpleaños! 🎂 Tienes una sorpresa en tu próxima visita" |
| **Dato** | "CTR promedio de push en loyalty: 8.1% vs 1.2% del email" |
| **Animación** | Notificaciones "caen" desde arriba del teléfono en secuencia |
| **Emoción target** | Urgencia + deseo de recuperar clientes perdidos |
| **Funcionalidad Xtarly** | Push notifications, campañas, winback automático |

---

### SLIDE 14 — Campañas y Automatización

| Campo | Contenido |
|---|---|
| **Objetivo** | Vender que el marketing sucede solo |
| **Headline** | `Tu marketing en piloto automático.` |
| **Subheadline** | `Campañas que se activan solas. Sin agencia. Sin diseñador. Sin tiempo.` |
| **Visual** | 6 tarjetas de campaña tipo "cards" en grid: |
| **Card 1** | Cumpleaños automático (se activa el día exacto) |
| **Card 2** | Winback a 21 días sin visita (se activa solo) |
| **Card 3** | "Puntos por vencer" 5 días antes |
| **Card 4** | "Lunes de doble puntos" recurrente |
| **Card 5** | "Falta 1 sello" cuando el cliente está a 1 de completar |
| **Card 6** | Campaña manual por segmento (ej. solo VIP Gold) |
| **Emoción target** | Ahorro de tiempo + paz mental |
| **Objeción eliminada** | "No tengo tiempo para hacer marketing" |
| **Funcionalidad Xtarly** | Campañas, automatización, push notifications, segmentos |

---

### SLIDE 15 — Gamificación

| Campo | Contenido |
|---|---|
| **Objetivo** | Mostrar cómo los programas crean hábito de visita |
| **Headline** | `Los clientes regresan porque quieren completar su progreso.` |
| **Subheadline** | `Sellos. Puntos. Niveles VIP. El sistema que convierte cada visita en un mini juego que todos quieren ganar.` |
| **Visual** | 3 tracks paralelos: |
| **Track Sellos** | Mockup de tarjeta con 8/10 sellos llenos (2 vacíos gris) → "Recompensa: Café gratis" |
| **Track Puntos** | Progress bar de puntos: 340/500 → nivel de reward |
| **Track Niveles** | Insignias Bronze/Silver/Gold con beneficios desbloqueados por nivel |
| **Dato** | "El 73% de clientes regresa antes de lo planeado cuando sabe que está cerca de su siguiente recompensa" |
| **Animación** | El sello número 9 se "llena" con animación de confetti y sparkles de marca |
| **Emoción target** | Diversión + deseo de participar |
| **Funcionalidad Xtarly** | Sistema de sellos, puntos, niveles VIP, gamificación |

---

### SLIDE 16 — Multi-sucursal

| Campo | Contenido |
|---|---|
| **Objetivo** | Mostrar escalabilidad para cadenas y franquicias |
| **Headline** | `Un programa. Todas tus sucursales. Un solo panel.` |
| **Subheadline** | `El cliente acumula en cualquier sucursal. Tú controlas todo desde un solo dashboard.` |
| **Visual** | Mapa de ciudad con pins de múltiples sucursales; cada pin con nombre + KPI de esa sucursal. Dashboard mostrando vista consolidada + comparativa por sucursal. |
| **Casos de uso** | "Cadena de 3 cafeterías" / "Franquicia de 8 autolavados" / "Spa con 2 sedes" |
| **Emoción target** | Escalabilidad + control centralizado |
| **Funcionalidad Xtarly** | Multi-sucursal, panel unificado |

---

### SLIDE 17 — ROI Proof

| Campo | Contenido |
|---|---|
| **Objetivo** | Cerrar la brecha lógica — esto se paga solo |
| **Headline** | `El programa que se paga a sí mismo.` |
| **Subheadline** | `Ejemplo real: Si el 30% de tus clientes se identifica y visita 25% más seguido, el ROI supera 10x el costo del plan.` |
| **Visual** | Calculadora visual con 3 escenarios (conservador, realista, optimista): inputs (visitas/día, ticket promedio) → output (ingreso adicional mensual vs. costo del plan) |
| **Ejemplo concreto** | "Restaurante: 120 visitas/día × $220 ticket × 30 días = $792,000/mes. Con 30% clientes identificados y +20% frecuencia = $871,200/mes. Ganancia extra: $79,200 vs. costo plan $499." |
| **ROI visual** | "ROI estimado: 15,870%" en grande con gradiente de marca |
| **Dato** | "El costo del plan Shared es menor que 1 día de ventas para la mayoría de negocios." |
| **Animación** | Calculadora se "llena" de números, ROI número hace count-up dramático |
| **Emoción target** | Certeza + codicia (en sentido positivo) |
| **Objeción eliminada** | "¿Cuánto cuesta y vale la pena?" |

---

### SLIDE 18 — vs. Tarjetas Físicas

| Campo | Contenido |
|---|---|
| **Objetivo** | Cerrar la objeción del "ya tengo tarjetas" |
| **Headline** | `Las tarjetas de papel cuestan más de lo que crees.` |
| **Visual** | Tabla comparativa lado a lado: |

| Criterio | Tarjeta de Papel | Xtarly Rewards |
|---|---|---|
| Costo de impresión | $X/1000 unidades | $0 |
| Datos del cliente | ❌ Ninguno | ✅ Nombre, celular, historial |
| Reactivación | ❌ Imposible | ✅ Push notification |
| Wallet digital | ❌ No | ✅ Apple + Google Wallet |
| Analytics | ❌ No | ✅ Dashboard completo |
| Riesgo de fraude | ❌ Alto (sellos manuales) | ✅ QR verificado |
| Campañas | ❌ Imposible | ✅ Segmentadas automáticas |

| **Emoción target** | Superioridad clara |
| **Objeción eliminada** | "Las tarjetas me funcionan bien" |

---

### SLIDE 19 — vs. Competencia

| Campo | Contenido |
|---|---|
| **Objetivo** | Posicionamiento diferenciado |
| **Headline** | `No todas las apps de loyalty son iguales.` |
| **Visual** | Tabla comparativa (sin nombrar competidores, usar categorías genéricas): "Apps caras de EEUU" / "Apps básicas sin wallet" / "Desarrollos a medida" / **Xtarly Rewards** |

| Criterio | Apps caras EEUU | Apps básicas | A medida | **Xtarly** |
|---|---|---|---|---|
| Apple/Google Wallet | ✅ | ❌ | Variable | ✅ |
| RFM Analytics | Variable | ❌ | Variable | ✅ |
| Multi-nicho | ❌ | Básico | Variable | ✅ |
| Precios LATAM | ❌ muy caro | Básico | Variable | ✅ MXN/USD |
| Onboarding < 5 min | ❌ | Variable | ❌ meses | ✅ |
| Sin contrato | ❌ | Variable | ❌ | ✅ |
| White label app | ❌ | ❌ | ✅ caro | ✅ |

| **Emoción target** | Claridad de superioridad |

---

### SLIDE 20 — White Label / Branded Plan

| Campo | Contenido |
|---|---|
| **Objetivo** | Vender el plan premium para negocios con aspiración de marca |
| **Headline** | `Tu propia app de recompensas. Con tu nombre. Con tu logo.` |
| **Subheadline** | `Disponible en App Store y Google Play. Sin contratar desarrolladores.` |
| **Visual** | Side-by-side: iPhone con app "Café La Hacienda Rewards" (branded) vs. "Xtarly Rewards" (shared). Las dos funcionando, las dos con wallet, las dos con full analytics. |
| **Para quién** | "Para negocios que quieren un producto premium con su identidad de marca. Cadenas, franquicias, marcas establecidas." |
| **Lo que incluye** | App Store listing con tu logo / Nombre personalizado / Colores de tu marca / Dominio propio / Todo lo del plan Shared |
| **Precio** | Desde $1,999/mes (framing: "menos que el sueldo de un desarrollador junior por 1 día") |
| **Emoción target** | Status + ambición + "los grandes hacen esto" |
| **Funcionalidad Xtarly** | App branded, white label, multi-tenant |

---

### SLIDE 21 — Planes y Precios

| Campo | Contenido |
|---|---|
| **Objetivo** | Hacer accesible el primer paso (plan gratis) |
| **Headline** | `Empieza gratis. Crece sin límites.` |
| **Visual** | 3 cards de plan: |

| Plan | Gratis | **Shared ⭐** | Branded |
|---|---|---|---|
| Precio | $0 | $499/mes | $1,999/mes |
| Clientes | Hasta 200 | Ilimitados | Ilimitados |
| App | Web-only | App Xtarly Shared | App propia con tu marca |
| Wallet | ✅ | ✅ | ✅ |
| Push notifications | ❌ | ✅ | ✅ |
| RFM Analytics | Básico | ✅ Completo | ✅ Completo |
| Multi-sucursal | ❌ | ✅ | ✅ |
| Campañas | ❌ | ✅ | ✅ |
| White label app | ❌ | ❌ | ✅ |

| **Framing de precio** | "$499/mes = $16/día = 2 cafés" — menos que atraer 3 clientes nuevos en Instagram |
| **CTA principal** | Shared (botón con gradiente de marca) |
| **Animación** | Card Shared "levita" o tiene glow comparado con las otras |
| **Emoción target** | Accesibilidad + lógica |
| **Objeción eliminada** | "Debe ser muy caro" |

---

### SLIDE 22 — CTA Final

| Campo | Contenido |
|---|---|
| **Objetivo** | Convertir en este momento |
| **Headline** | `Empieza hoy. Sin tarjeta de crédito.` |
| **Subheadline** | `Tu primer programa de recompensas listo en menos de 5 minutos.` |
| **Visual** | Full-bleed gradiente de marca (cyan→violet→magenta). Logo grande con glow. Mascota Xtarly celebrando. QR para escanear ahora. |
| **3 ganchos finales** | "Sin contratos" / "Sin instalaciones" / "Sin técnicos" |
| **Datos de contacto** | WhatsApp directo / Email / xtarly.com |
| **CTA primario** | Botón grande: "Crear cuenta gratis" |
| **CTA secundario** | "Agendar demo de 15 min" |
| **Urgencia** | "Cada día sin loyalty es un cliente perdido para siempre" |
| **Emoción target** | Urgencia + bajo riesgo percibido |
| **Objeción eliminada** | "Lo voy a pensar" |

---

## FASE 3 — SISTEMA MODULAR

### El Principio 75/25

**75% reutilizable (core deck):** Todo el análisis económico, la arquitectura de plataforma, la demostración de wallet, analytics, push, gamificación, comparativas, y precios.

**25% tropicalizable (nicho deck):** Hero image, headline del Cover, problema específico del nicho, customer journey con screenshots del nicho, ejemplos de recompensas, KPIs relevantes, testimonial, colores y fotografía.

---

### Módulos Core (no cambian)

```
MÓDULO A — Economía de Retención (Slides 2-4)
  → Estadísticas universales de loyalty
  → Solo cambia el ejemplo numérico con datos del nicho

MÓDULO B — La Tarjeta Física Falló (Slide 5)
  → 100% reutilizable

MÓDULO C — Wallet Magic (Slide 8)
  → Solo cambia el nombre del negocio en la notificación

MÓDULO D — Experiencia Cajero (Slide 10)
  → 100% reutilizable (el flujo es idéntico en todos los nichos)

MÓDULO E — Dashboard + RFM (Slides 11-12)
  → Solo cambia la foto de perfil de clientes (nicho)

MÓDULO F — Push Notifications (Slide 13)
  → Cambia el producto mencionado ("café" → "servicio de spa")

MÓDULO G — Gamificación (Slide 15)
  → Cambia la recompensa en el mockup

MÓDULO H — ROI Calculator (Slide 17)
  → Solo cambian los números del ejemplo

MÓDULO I — Comparativas (Slides 18-19)
  → 100% reutilizable

MÓDULO J — Planes y Precios (Slide 21)
  → 100% reutilizable

MÓDULO K — CTA (Slide 22)
  → Solo cambia el contacto/NPS si es presentación específica
```

### Módulos Nicho (cambian por vertical)

```
MÓDULO X1 — Cover (Slide 1)
  → Hero image del nicho + headline específico

MÓDULO X2 — Problema específico (Slide 2.5, insertar entre 2 y 3)
  → Pain points propios del nicho (ej: "cafeterías: 40% de clientes no regresa a la segunda semana")

MÓDULO X3 — Customer Journey (Slide 9)
  → Screenshots con el producto/servicio del nicho

MÓDULO X4 — Campañas del nicho (Slide 14)
  → Ejemplos de campañas relevantes al nicho

MÓDULO X5 — Testimonial/Case Study (Slide entre 19 y 20)
  → Historia real o ejemplo del nicho

MÓDULO X6 — CTA nicho (Slide 22 variante)
  → Copy específico: "La cafetería que fideliza es la que dura"
```

---

### Cómo tropicalizar una presentación nueva

1. Tomar el deck master (22 slides)
2. Reemplazar Módulos X1-X6 con la versión del nicho
3. En MÓDULOS A, F, G, H: actualizar el ejemplo de producto/servicio mencionado
4. Ajustar colores del hero (mantener paleta Xtarly como base, añadir acento del nicho)
5. Agregar fotos lifestyle correctas
6. Listo: presentación tropicalizada en <30 min

---

## FASE 4 — TROPICALIZACIÓN POR NICHO

---

### NICHO 1: CAFETERÍAS

**Perfil del negocio:**
- Frecuencia: 3-15x/mes (alta frecuencia, clientes de rutina)
- Ticket: $60-$180 MXN
- Competencia: Starbucks (que SÍ tiene loyalty), cafeterías vecinas
- Horario pico: 7-10am, 2-4pm
- Comportamiento: clientes de hábito, "mi café de siempre"

**Por qué la retención es crítica:**
La cafetería vive de la rutina matutina. Perder a un cliente de rutina = perder $1,800-$5,400/año por cliente. El problema: cuando prueban la cafetería de enfrente por curiosidad, si no hay un programa de loyalty, se quedan.

**Tipo de programa ideal:**
- **Sellos (10x1):** "10 cafés = 1 café gratis" — psicología perfecta para hábito diario
- **Punch upgrade:** "en tu sello 5, upgradeas tu tamaño gratis"
- **Nivel VIP:** "Gold Members reciben su café favorito preparado antes de que lleguen (pedido digital)"

**Recompensas que funcionan:**
- Café gratis (por sellos)
- Pastelito o croissant gratis
- Descuento en el "combo del mes"
- Acceso anticipado a sabores de temporada
- "Café del barista" — producto exclusivo para nivel Gold

**Campañas killer:**
- "Lunes de doble sellos" (activa visitas en el día más lento)
- "Winback: hace 10 días que no te tomamos" + push con imagen del café favorito
- "Ya tienes 9 sellos — solo te falta 1 ☕" (enviado viernes pm para activar visita fin de semana)
- "Cumpleaños del cliente" — café gratis ese día
- "Nueva bebida de temporada — disponible para VIPs este viernes"

**KPIs más importantes:**
- Membership Rate (% de visitas que escanean vs. total)
- Visits per Member per Month
- Member Lift (% más frecuente que no-members)
- Morning vs Afternoon split

**Objeciones típicas del dueño:**
- "Mis clientes ya son fieles" → "¿Puedes demostrarlos? ¿Tienes su nombre?"
- "La gente no va a escanear" → "Starbucks: 55% de sus ventas son de miembros"
- "Es complicado para mis baristas" → Demo del panel cashier en 2 min

**Hero section específica:**
- Foto: manos de barista preparando café de especialidad, cliente al fondo con teléfono en mano viendo la app
- Headline: "Que tu café de las mañanas tenga nombre, apellido y 10 sellos ganados."
- Ambiente: cálido, matutino, luz de amanecer, tonos ámbar

**Colores complementarios:** ámbar #E5A158 (ya en brand) + café #6B4226 como acento de lifestyle. Mantener dark brand para slides tech.

**Push examples para cafetería:**
- "☕ Buenos días, Ana. Ya tienes 8 sellos — ¡estás a 2 de tu café gratis!"
- "🌙 Hoy cerramos a las 9pm. ¿Vienes por tu lunes de doble sellos?"
- "Ana, hace 7 días que no te vemos. Tu macchiato favorito te extraña 💛"

---

### NICHO 2: RESTAURANTES

**Perfil del negocio:**
- Frecuencia: 1-4x/mes
- Ticket: $180-$600 MXN
- Rango amplio: desde fondas hasta casual dining
- Competencia: apps de delivery (Uber Eats captura cliente, no el restaurante)
- Problema crítico: las apps de delivery "roban" la relación con el cliente

**Por qué la retención es crítica:**
El restaurante tiene el peor trato con plataformas de delivery: paga 25-30% de comisión, pierde la identidad del cliente (no sabe quién ordenó), y no puede hacer retargeting. Con Xtarly, el cliente es del restaurante, no de Uber.

**Tipo de programa ideal:**
- **Puntos por monto:** $1 gastado = 1 punto; 500 pts = $50 descuento
- **Nivel VIP:** Bronze → Silver → Gold (comida gratis en cumpleaños, mesa preferente, entrada exclusiva)
- **Stamps para días especiales:** "10 almuerzos de martes = 1 almuerzo gratis"

**Recompensas que funcionan:**
- Postre gratis al alcanzar nivel
- Botella de vino en cumpleaños (para Silver+)
- Mesa preferente sábado sin reservación (Gold)
- 2x1 en martes (para activar día lento)
- "Chef's special" exclusivo para miembros VIP ese mes

**Campañas killer:**
- "Martes sin colas — puntos dobles. Solo para miembros."
- "Cumpleaños del cliente" → "¡Feliz cumpleaños! Este mes tu postre va por cuenta de la casa."
- "Nuevo menú de temporada — pruébalo antes que nadie (Solo Gold Members)"
- "Hace 30 días que no te vemos — mesa disponible para ti este viernes"
- "¡Tu saldo de puntos está por vencer! Úsalos antes del 31."

**KPIs más importantes:**
- Frecuencia mensual (vs. benchmark de 1.2x/mes)
- Ticket promedio miembro vs. no-miembro
- Day-of-week distribution (identificar días muertos)
- RFM Champions (top 50 clientes)

**Hero section:**
- Foto: mesa elegante, platos bien presentados, cliente mirando su teléfono con app de loyalty
- Headline: "Que la reservación sea tuya. Que el cliente también sea tuyo."
- Tono: premium, experiencial, warm

**Objeciones:**
- "Las plataformas de delivery me traen más clientes" → "A un costo del 28%. Y ellos se quedan con los datos."
- "Mi restaurante no es de cadena" → "Los mejores restaurantes del mundo tienen loyalty. Desde Nobu hasta la taquería de la esquina que lleva 20 años."

---

### NICHO 3: PASTELERÍAS

**Perfil:**
- Frecuencia: 2-6x/mes (más en temporadas)
- Ticket: $80-$400 MXN
- Temporadas pico: San Valentín, Día de Muertos, Navidad, Día de la Madre
- Comportamiento: compras emocionales + rutina semanal

**Tipo de programa ideal:**
- **Sellos + puntos combinados:** sellos para la rutina semanal (café + pieza), puntos para pedidos especiales
- **Niveles para Xmas/temporadas:** "Gold members tienen acceso anticipado al catálogo navideño"

**Recompensas:**
- Pieza de pastelería gratis (10 sellos)
- Descuento en pastel de cumpleaños (por nivel)
- Diseño personalizado incluido (Gold)
- Acceso anticipado a ediciones limitadas de temporada

**Campañas killer:**
- "Precuenta Día de la Madre" → "Aparta tu pastel ahora + 200 puntos extra"
- "Viernes de temporada" → push con foto del nuevo producto estrella
- "Cumpleaños del cliente" → "Hoy tienes un 15% en tu pastel de cumpleaños"
- "San Valentín Countdown" → 14 días de push con beneficio distinto por día

**Visuales:**
- Fondos cálidos, pastel, tonos rosa-durazno-crema
- Fotos de pasteles artísticos + manos sosteniendo la app
- Hero: pasteles hermosos con warm bokeh lighting

---

### NICHO 4: AUTOLAVADOS

**Perfil:**
- Frecuencia: 2-4x/mes (muy regular, hábito)
- Ticket: $100-$600 MXN
- Competencia directa: el autolavado de enfrente
- Diferenciación casi imposible: el servicio es casi idéntico en todos lados
- Problema: **el loyalty program ES el diferenciador**

**Por qué Xtarly es especialmente poderoso aquí:**
En autolavados, la lealtad se compra fácil. El cliente no tiene una relación emocional con el negocio — solo quiere comodidad y precio. Con sellos, creas una razón económica para que vuelva al mismo lugar.

**Tipo de programa ideal:**
- **Sellos (5x1):** "5 lavados = 1 lavado gratis" — frecuencia perfecta para completar en 2 meses
- **Membresía mensual digital:** "ilimitados por $599/mes" — registrable en la app con wallet pass

**Recompensas:**
- Lavado express gratis (5 sellos)
- Detallado interior con descuento (Silver)
- "Lavado del mes" al precio de express (promo mensual)
- Cera gratis con cada 3er lavado (Gold)

**Campañas killer:**
- "Lluvia llegó a CDMX hoy 🌧️ — lunes de doble sellos" (campañas climáticas manuales)
- "Tu auto está sucio 😅 — hace 15 días que no te vemos"
- "Prepara tu auto para el puente — puntos dobles este jueves y viernes"

**KPI diferenciador:**
- Retención mensual: ¿qué % de clientes del mes pasado volvió este mes?

**Hero:**
- Foto: auto reluciente saliendo del lavado, cliente en el carro viendo su teléfono (sello completado)
- Headline: "Cada lavado cuenta. Tu próximo lavado gratis está más cerca de lo que crees."
- Tonos: azul agua, blanco brillante, gotas de agua

---

### NICHO 5: SPAS Y WELLNESS

**Perfil:**
- Frecuencia: 1-2x/mes (premium)
- Ticket: $400-$2,500 MXN
- Comportamiento: decisión emocional, regalo frecuente, autocuidado
- Cliente típico: mujeres 28-45, NSE BC+

**Por qué loyalty es transformador aquí:**
Un cliente de spa que visita 1x/mes y gasta $800 = $9,600/año. Si lo fidelizas a 1.3x/mes = $12,480/año. Diferencia: $2,880/año por cliente. Con 100 clientes activos en loyalty = $288,000 anuales extra.

**Tipo de programa ideal:**
- **Niveles VIP (3 niveles):** Jade → Cristal → Diamante
- **Puntos por monto:** cada $100 = 10 puntos; 500 puntos = tratamiento facial básico
- **Cumpleaños sagrado:** tratamiento de 30 min gratis en el mes del cumpleaños

**Recompensas:**
- Upgrade de tratamiento (30 → 60 min) al alcanzar nivel
- Copa de vino incluida (Cristal+)
- Tratamiento facial exclusivo "solo para miembros" mensual
- Descuento en productos de spa (Gold)
- Sesión de bienvenida gratis al enrollarse

**Campañas killer:**
- "Cuídate este lunes 💆‍♀️ — 20% en masajes relajantes para miembros"
- "Hace un mes que no te mimas — tienes 300 puntos que puedes usar esta semana"
- "Tu nivel Cristal está a solo 2 visitas — descubre tus beneficios exclusivos"
- "Semana del Bienestar — lunes a jueves, puntos x3 en cualquier tratamiento"

**Emoción a vender:** exclusividad, autocuidado merecido, "eres nuestra cliente VIP"

**Hero:**
- Foto: mujer en tratamiento de spa, ambiente sereno, velas, pétalos, luz suave
- Headline: "Cada momento de paz merece su recompensa."
- Tonos: crema, nude, lavanda, dorado suave — sobre dark background con gradiente suave

---

### NICHO 6: GYMS Y FITNESS

**Perfil:**
- Frecuencia: 4-20x/mes (variable — alta fricción de hábito)
- Ticket: membresía $400-$1,800/mes + suplementos + clases especiales
- Problema único: el cliente ya PAGA mensualidad — la retención es renovación, no visita
- Reto: muchos se inscriben en enero, dejan de ir en marzo, y cancelan en abril

**Tipo de programa ideal:**
- **Puntos por asistencia:** +10 pts por cada visita registrada
- **Puntos por compra:** suplementos, proteínas, clases especiales
- **Niveles por asistencia mensual:** "asististe 12+ veces este mes → nivel Warrior → mes gratis en 6 meses"
- **Retos gamificados:** "30 días seguidos → premio especial"

**Recompensas:**
- Mes de membresía con descuento (por puntos acumulados)
- Clase de yoga/spinning gratis
- Camiseta del gym (Silver+)
- Sesión de nutrición gratis (Gold)
- Acceso a horarios exclusivos (Platinum)

**Campañas killer:**
- "Lleva 3 semanas sin verte 💪 — ¿Volvemos a la rutina?" + notif de proximidad al pasar enfrente
- "Challenge de enero: 20 visitas en el mes = 1 mes gratis en febrero"
- "Renovación anticipada = 15% OFF + 500 puntos extra"
- "Tu racha de asistencias: 12 días consecutivos 🔥 — ¡no la rompas!"

**KPI diferenciador:**
- Retention rate mensual (% de membresías renovadas)
- Average sessions per member per month
- Churn prediction (clientes con baja asistencia las últimas 2 semanas)

**Hero:**
- Foto: atleta con airpods mirando su teléfono con achievement desbloqueado en la app
- Headline: "Cada rep cuenta. Cada visita suma."
- Tonos: negro intenso, neón verde/cyan, energía

---

### NICHO 7: SALONES DE BELLEZA

**Perfil:**
- Frecuencia: 1-4x/mes según servicio (tinte, corte, manicure)
- Ticket: $250-$2,500 MXN
- Comportamiento: muy relacionado con la estilista, no con el salón
- Problema crítico: si se va la estilista, se va el cliente

**Por qué Xtarly es crítico aquí:**
El loyalty program ata al cliente al NEGOCIO, no a la estilista. Con puntos y wallet, el cliente tiene razones para volver al salón independientemente de quién lo atienda.

**Tipo de programa ideal:**
- **Sellos por servicio:** 10 servicios = 1 servicio gratis (se puede configurar por tipo de servicio)
- **Puntos por monto:** para servicios de mayor precio (tinte, extensiones)
- **Niveles:** Bronze → Rose Gold → Diamond

**Recompensas:**
- Servicio básico gratis (10 sellos)
- Tratamiento capilar gratis (Rose Gold)
- Manicure sin cargo en cumpleaños (Diamond)
- Descuento en productos (compra de productos del salón)
- Primera cita sin cargo de cancelación (Diamond)

**Campañas killer:**
- "Tu tinte está listo para retocar 🎨 — ya pasaron 6 semanas, agenda ahora y suma puntos"
- "Cumpleaños 🎂 — este mes tu manicure va por nuestra cuenta"
- "Viernes de spa capilar — solo para miembros Diamond"
- "Recomienda a una amiga y gana 200 puntos (referral campaign)"

**Diferenciador clave:**
- El cliente lleva su historial de servicios en el wallet (recordatorio de cuándo necesita retocar)
- Notificación automática "Han pasado 6 semanas desde tu último tinte — ¿Agendamos?"

**Hero:**
- Foto: mano perfectamente manicurada sosteniendo iPhone con la app (nail art visible + loyalty screen)
- Headline: "Tu belleza tiene nombre. Y ahora, recompensas."
- Tonos: rose gold, nude, negro elegante

---

### NICHO 8: TIENDAS DE ROPA

**Perfil:**
- Frecuencia: 1-3x/mes (alta correlación con quincenas y temporadas)
- Ticket: $300-$3,000 MXN
- Competencia directa: apps de delivery de moda (Shein, Zara app)
- Problema: compras impulsivas, poca fidelización natural
- Oportunidad: los clientes VIP gastan 3-5x más

**Tipo de programa ideal:**
- **Puntos por monto:** $1 gastado = 2 puntos (generoso para incentivar gasto)
- **Niveles:** Silver → Gold → VIP Elite con early access a colecciones
- **Cashback efectivo:** 500 puntos = $100 de descuento

**Recompensas:**
- Cashback en siguiente compra
- Early access a colección nueva (VIP Elite solo)
- Evento privado de moda (VIP Elite)
- Envío gratis (para Silver+)
- Personal shopper session (Gold+)

**Campañas killer:**
- "Nueva colección de primavera 🌸 — preventa exclusiva para Gold Members mañana a las 10am"
- "Puntos dobles en denim este fin de semana"
- "Hace 45 días que no visitas — tienes $200 en puntos esperándote"
- "Quincena 💰 — triple puntos 14 y 15 de cada mes"
- "Tu nivel Gold está a $1,200 de distancia — sube esta semana"

**Diferenciador de aspiración:**
Los clientes VIP sienten que pertenecen a un "club exclusivo" de la marca. Esto es especialmente poderoso en boutiques independientes que compiten con grandes cadenas: el trato personalizado + loyalty digital = experiencia premium que Zara no puede replicar.

**Hero:**
- Foto: mujer joven y cool mirando ropa en tienda, sosteniendo iPhone con "450 puntos earned" en pantalla
- Headline: "Moda que te conoce. Recompensas que te quedan perfectas."
- Tonos: negro, blanco, dorado, minimalista fashion

---

### NICHO 9: FARMACIAS

**Perfil:**
- Frecuencia: 2-6x/mes (varía enormemente por tipo de cliente)
- Ticket: $150-$1,200 MXN
- Comportamiento: compras de necesidad + bienestar rutinario
- Competencia directa: Farmacias del Ahorro (que SÍ tiene loyalty masivo), Similares, Benavides
- Problema: el cliente va a donde está el descuento (muy precio-sensitivo)

**Por qué loyalty transforma farmacias independientes:**
Las farmacias de cadena tienen loyalty pero son impersonales. Una farmacia independiente puede usar Xtarly para crear una relación más personal: "el farmacéutico que me conoce + recompensas digitales" = ventaja imposible de replicar para las cadenas.

**Tipo de programa ideal:**
- **Puntos por compra:** $1 = 1 punto; 200 puntos = $20 de descuento (10% efectivo)
- **Puntos dobles en vitaminas/suplementos** (margen más alto)
- **Medicamento del mes:** producto específico con puntos extra (para mover inventario)

**Recompensas:**
- Descuento en próxima compra
- Vitaminas o suplemento básico gratis (Silver)
- Consulta grápida gratis si tienen médico (Gold)
- Entrega a domicilio gratis con puntos (si ofrecen)

**Campañas killer:**
- "Temporada de gripe 🤧 — vitamina C con puntos dobles esta semana"
- "Tu medicamento habitual está en promoción — canjea tus puntos hoy"
- "Diabetes Awareness Month — puntos x3 en glucómetros y tiras"
- "Hace 30 días que no te vemos — ¿cómo está tu salud? 10 puntos de bienvenida"

**KPI diferenciador:**
- Repeat purchase rate (medicamento crónico)
- Cross-sell rate (cliente de medicamentos que también compra vitaminas)

**Hero:**
- Foto: farmacéutico amable entregando medicamento con tablet mostrando puntos del cliente
- Headline: "Tu farmacia de confianza. Con recompensas que cuidan tu bolsillo y tu salud."
- Tonos: verde farmacia, blanco limpio, azul confianza — sobre dark brand

---

### NICHO 10: CLÍNICAS VETERINARIAS

**Perfil:**
- Frecuencia: 2-8x/año (baja frecuencia pero alta lealtad emocional)
- Ticket: $300-$3,500 MXN
- Comportamiento: decisión emocional intensa (el dueño ama a su mascota)
- Oportunidad: el amor por las mascotas hace que el gasto sea casi inelástico
- Único caso de loyalty donde el cliente felicita a SU MASCOTA, no a sí mismo

**Tipo de programa ideal:**
- **Sellos por visita:** 5 consultas = 1 consulta básica gratis
- **Puntos por gasto:** para cirugías, vacunas, productos
- **Perfil de mascota en wallet:** nombre del perro/gato, vacunas vigentes, próxima cita

**Recompensas:**
- Consulta general gratis (5 sellos)
- Baño y corte con descuento (Silver)
- Vacuna gratis al mes (Gold — vacunas de bajo costo que el dueño valora mucho)
- Microchip gratis al inscribirse (programa de bienvenida)

**Campañas killer (totalmente diferenciadoras):**
- "¡Feliz cumpleaños Rocky! 🐶 Tu consulta de cumpleaños incluye un regalo especial"
- "Temporada de vacunación antirrábica — agenda con tus puntos"
- "Rocky tiene 8 meses — hora de su primera esterilización. Tienes un descuento esperándote."
- "Hace 4 meses que Rocky no viene a revisión — ¿todo bien?"
- "Semana de pulgas y garrapatas 🦟 — puntos x2 en tratamientos preventivos"

**Diferenciador único:**
La tarjeta de wallet puede tener la FOTO de la mascota, el nombre, y el historial de vacunas. Esto es algo que ninguna app de loyalty general ofrece y que crea un vínculo emocional brutal.

**Notificaciones de salud (killer feature):**
"Rocky cumple 12 meses en 2 semanas. Es momento de sus vacunas anuales. Agenda ahora y usa tus puntos."

**Hero:**
- Foto: veterinaria sonriente con cachorro, dueño al lado mirando teléfono con wallet de Rocky
- Headline: "Cuida a quien más quieres. Acumula recompensas en cada visita."
- Tonos: verde jade suave, warm beige, blanco, foto cálida lifestyle

---

## FASE 5 — DIRECCIÓN VISUAL

### 5.1 Sistema Visual Maestro

**El principio:** Xtarly se siente como si Apple hubiera diseñado un producto de lealtad para negocios mexicanos. Premium tech + calidez humana.

**Sistema de doble tema (Dark / Light):**

La app pitch soporta tema oscuro (default) y tema claro (`html.light`). Los slides se dividen en dos categorías según cómo responden al tema:

**Slides de marca (siempre oscuro/gradiente — `--brand-gradient-bg`):**
- Cover (#1) — apertura cinematográfica
- Testimonial — prueba social con peso emocional
- CTA (último) — clímax visual de conversión
- *Razón: estos slides son "momentos" de la narrativa. Su fuerza viene del contraste y la dramaturgia visual. El gradiente brand ES la identidad, no una opción de tema.*

**Slides de contenido (se adaptan al tema):**
- Problem, Solution, Features, Pricing — usan CSS vars `--slide-*`
- Dark mode: fondos `#08090e` / `#0f1117`, texto `#f8f9fa` / `#9ca3b0`
- Light mode: fondos `#f5f7fa` / `#ffffff`, texto `#111827` / `#6b7280`
- Las cards del plan destacado siempre usan `--brand-gradient-bg` (es el producto premium, no contenido neutro)

**Variables CSS por slides (definidas en `globals.css`):**
```css
--slide-bg            → fondo principal del slide
--slide-surface       → fondo de cards y elementos contenedor
--slide-surface-2     → nivel más elevado (tooltips, popovers)
--slide-border        → bordes sutiles
--slide-text          → texto principal
--slide-text-secondary → texto de apoyo
--slide-text-muted    → texto placeholder, notas
--slide-accent-subtle → fondo tenue con acento de marca
--slide-accent-border → borde con acento de marca
--slide-cyan-subtle   → fondo tenue cyan (para elementos Wallet/tech)
--slide-cyan-border   → borde cyan (para tarjetas Wallet)
```

**Identidad visual dual (por tipo de contenido):**
- **Tech/Premium (slides de plataforma):** Fondos dark, gradiente de marca, UI mockups flotando, glassmorphism suave, elementos neon cyan-violet-magenta
- **Humano/Cálido (slides de lifestyle):** Fotografías de personas reales en contexto de negocio, luz natural, composición cercana, fondos del nicho

---

### 5.2 Tipografía

**Sistema:**
```
HERO HEADLINES:    Geist Sans 700, -0.03em tracking, 64-96px
SUBHEADLINES:      Geist Sans 400, -0.01em, 20-28px
LABELS/CAPTIONS:   Geist Sans 500, uppercase, 0.08em tracking, 12-14px
DATOS/STATS:       Geist Sans 800 o 900, para números impactantes
MOCKUPS/UI:        Geist Sans (igual que la web app real)
MONO (códigos QR): Geist Mono
```

**Regla tipográfica:** Máximo 2 pesos tipográficos por slide. El contraste viene del tamaño, no del peso.

---

### 5.3 Sistema de Color por Contexto

**Slides de análisis/problema:**
- Background: #0D0B1A (más oscuro que brand, crea tensión)
- Texto: #FAFAFE
- Acentos: gris apagado + solo 1 color de marca para el dato clave
- Mood: sobrio, serio, la realidad duele

**Slides de solución/features:**
- Background: #1B1638 (dark brand)
- Gradiente de marca completo para highlights
- UI mockups con glassmorphism: `rgba(255,255,255,0.06)` con `backdrop-blur`
- Border: `rgba(98,229,255,0.15)` (cyan suave)

**Slides de hero/nicho:**
- Foto full-bleed con overlay `rgba(27,22,56,0.6)`
- Texto en blanco puro
- Logo/tagline con glow de cyan suave

**Slides de ROI/números:**
- El número grande en gradiente `linear-gradient(135deg, #62E5FF, #7C5CFF, #E94FE6)`
- Background oscuro para maximizar contraste

**Slides de CTA:**
- Full gradiente de marca
- Texto blanco
- Máximo contraste

---

### 5.4 Mockups y Renders

**Estilo de mockups:**
- iPhones 15 Pro (modelo canónico) en perspective view suave (5-10° tilt)
- No usar marcos de teléfono demasiado realistas — usarlos como "ventanas" al contenido
- Floating: los iPhones flotan sobre el fondo con sombra suave `box-shadow: 0 30px 80px rgba(0,0,0,0.5)`
- Escala: ocupar 50-70% del slide, no 100%
- Múltiples iPhones: en composición diagonal o dispersa, no en fila
- Screen recording: para el cajero, mostrar gif/video del flujo real

**Tipos de mockup necesarios:**
1. iPhone — App home (sellos visuales, nombre del usuario, puntos)
2. iPhone — Wallet card (con datos del negocio)
3. iPhone — Lock screen con notificación push
4. iPhone — Pantalla de canje (QR generado)
5. Tablet/iPad — Panel cashier (QR grande de compra)
6. MacBook — Dashboard analytics
7. iPhone — Customer journey 5 pantallas
8. iPhone — Push notification de cumpleaños
9. Apple Watch — Wallet card (para slide de wallet)

---

### 5.5 Fotografía Lifestyle

**Reglas:**
- Solo fotografía con personas reales en contexto de negocio mexicano
- Luz natural preferentemente, no estudio
- Manos protagonistas: la mano del cliente sosteniendo el teléfono con la app
- Ángulo: close-up de manos + blur del negocio al fondo (bokeh warm)
- Evitar fotos genéricas de banco de imágenes con modelos obviamente extranjeros
- Momento preferido: el instante de scan (cliente escaneando QR del cajero)

**Por nicho:**
- Cafetería: manos sosteniendo taza + teléfono con sello 9/10
- Restaurante: mesa con platillo + teléfono al lado mostrando puntos
- Autolavado: auto reluciente, mano con teléfono, luz reflejada
- Spa: manos cuidadas sobre fondo suave, teléfono con nivel VIP
- Gym: mano sujetando botella de agua + teléfono con achievement
- Veterinaria: mano del dueño acariciando mascota + teléfono con perfil del pet

---

### 5.6 Glassmorphism y Efectos Visuales

**Cards de features/stats:**
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(20px);
border: 1px solid rgba(98, 229, 255, 0.12);
border-radius: 20px;
```

**Glow de marca en elementos destacados:**
```css
box-shadow: 0 0 40px rgba(98, 229, 255, 0.2), 0 0 80px rgba(124, 92, 255, 0.1);
```

**Gradiente de texto (para stats y headlines impactantes):**
```css
background: linear-gradient(135deg, #62E5FF 0%, #7C5CFF 50%, #E94FE6 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

### 5.7 Animaciones

**Permitidas:**
- Fade-in staggered (elementos aparecen con delay de 0.1-0.15s entre sí)
- Float suave para mockups (translateY 0→-8px, 3s loop)
- Count-up para números de impacto (ROI, porcentajes)
- Scale-in para logos y badges
- Slide-up para texto

**Para momentos de celebración (wallet, gamificación, CTA):**
- Partículas sparkle flotando (usando colores de marca)
- Confetti muy suave con paleta brand
- Glow pulsante en elementos CTA

**Prohibidas:**
- Rotaciones rápidas
- Flashes / blink
- Parallax agresivo que distraiga del mensaje

---

## FASE 6 — ASSETS NECESARIOS

### 6.1 Screenshots del Producto Real (Prioridad 1)

Estas screenshots se toman directamente de la app Xtarly en producción:

| Asset | Pantalla | Prioridad |
|---|---|---|
| `ss-app-home-stamps` | App mobile: home con 8/10 sellos de café | 🔴 Alta |
| `ss-app-home-points` | App mobile: home con 340 puntos, progress bar | 🔴 Alta |
| `ss-app-wallet-add` | Pantalla de "Agregar a Apple Wallet" | 🔴 Alta |
| `ss-app-rewards-list` | Lista de recompensas disponibles | 🔴 Alta |
| `ss-app-scan-qr` | QR de canje generado | 🔴 Alta |
| `ss-dashboard-overview` | Dashboard web: KPIs, gráficas | 🔴 Alta |
| `ss-dashboard-rfm` | Segmentos RFM en dashboard | 🟡 Media |
| `ss-dashboard-customers` | Lista de clientes con RFM badge | 🟡 Media |
| `ss-cashier-panel` | Panel cashier con QR grande | 🔴 Alta |
| `ss-cashier-success` | Confirmación de sello/puntos sumados | 🔴 Alta |
| `ss-wallet-card-generic` | Wallet card genérica Xtarly | 🔴 Alta |
| `ss-wallet-card-nicho` | Wallet card con nombre de negocio ejemplo | 🟡 Media |
| `ss-push-notification` | Notificación push en lockscreen | 🔴 Alta |
| `ss-notifications-list` | Lista de campañas/notificaciones en dashboard | 🟡 Media |
| `ss-program-config` | Configuración del programa (sellos/puntos/niveles) | 🟢 Baja |
| `ss-analytics-frequency` | Gráfica de frecuencia de visita | 🟡 Media |

---

### 6.2 Mockups de Dispositivos (para Slide Viewer)

| Asset | Descripción |
|---|---|
| `mockup-iphone-app-stamps` | iPhone 15 Pro con home de sellos (cafetería) |
| `mockup-iphone-wallet-lockscreen` | iPhone con notificación de wallet en lockscreen |
| `mockup-iphone-push` | iPhone con push notification visible |
| `mockup-ipad-cashier` | iPad con panel cashier abierto |
| `mockup-macbook-dashboard` | MacBook con dashboard analytics |
| `mockup-watch-wallet` | Apple Watch con wallet card |
| `mockup-iphone-journey-1` | iPhone — primer scan QR |
| `mockup-iphone-journey-2` | iPhone — sellos acumulados |
| `mockup-iphone-journey-3` | iPhone — recompensa lista |

---

### 6.3 Fotografía Lifestyle (por Nicho)

Cada nicho requiere 3-5 fotos:

**Por foto necesaria (multiplica × 10 nichos = 30-50 fotos):**
1. Hero principal (horizontal, para portada)
2. Cliente escaneando QR (manos en primer plano)
3. Momento de uso/consumo del producto/servicio
4. Cajero / staff usando el panel
5. Wallet card visible en teléfono en contexto del negocio

---

### 6.4 Gráficas y Comparativas

| Asset | Tipo |
|---|---|
| `chart-retention-economics` | "5% más retención = 25-95% más ganancia" — Bain |
| `chart-anonymous-vs-identified` | 100 siluetas con % coloridas |
| `chart-frequency-lift` | Barras: antes vs después de loyalty |
| `chart-roi-calculator` | Calculadora visual animable |
| `chart-rfm-matrix` | Matriz RFM con segmentos y colores |
| `chart-member-lift` | Ticket promedio miembro vs. no-miembro |
| `table-vs-paper-cards` | Comparativa Xtarly vs. tarjeta física |
| `table-vs-competition` | Comparativa Xtarly vs. categorías competencia |
| `table-pricing` | Cards de planes con jerarquía visual |

---

### 6.5 Videos y Animaciones

| Asset | Duración | Uso |
|---|---|---|
| `video-qr-scan-flow` | 10-15s | Demo del flujo completo QR → puntos |
| `video-wallet-add` | 8-10s | Agregar tarjeta a Apple Wallet |
| `video-push-arrive` | 5-8s | Notificación llegando al lock screen |
| `video-dashboard-tour` | 20-30s | Tour rápido del dashboard |
| `animation-stamps-complete` | 3-5s | El último sello se llena + confetti |
| `animation-level-up` | 3-5s | Upgrade de nivel con partículas |
| `animation-points-countup` | 2-3s | Número de puntos subiendo |

---

## FASE 7 — OUTPUT FINAL Y ROADMAP

### 7.1 Arquitectura Final de la App Pitch

**Deck Maestro (22 slides):**
```
/slides
  core/          → 14 slides reutilizables (B, C, D, E, F, G, H, I, J, K)
  nicho/         → 6 slides tropicalizables por nicho (X1-X6)
  generated/     → Deck completo generado para cada nicho
```

**Tipos de slide a agregar al sistema actual (actualmente: 7 tipos):**

```typescript
// Nuevos tipos necesarios:
"hook"          → Slide 1 — Cover dramático
"cold-truth"    → Slide 2 — La verdad fría con siluetas
"cost-calc"     → Slide 3 — Calculadora de costo real
"anonymous"     → Slide 4 — Anónimo vs. identificado
"old-way"       → Slide 5 — Tarjetas físicas fallaron
"how-it-works"  → Slide 7 — 3 pasos visuales
"wallet"        → Slide 8 — Wallet Magic
"journey"       → Slide 9 — Customer journey
"cashier"       → Slide 10 — Experiencia cajero
"analytics"     → Slide 11 — Dashboard screenshot
"rfm"           → Slide 12 — Segmentos RFM
"notifications" → Slide 13 — Push notifications
"automation"    → Slide 14 — Campañas automáticas
"gamification"  → Slide 15 — Gamificación
"multi-branch"  → Slide 16 — Multi-sucursal
"roi"           → Slide 17 — ROI Calculator
"vs-old"        → Slide 18 — vs. tarjetas físicas
"vs-competition"→ Slide 19 — vs. competencia
"white-label"   → Slide 20 — White label/Branded
// pricing y testimonial y cta ya existen
```

---

### 7.2 Prompt Engineering para Generación con AI

El prompt actual (7-9 slides, básico) debe expandirse a 20-22 slides usando el nuevo sistema de tipos. El modelo debe recibir:

1. El deck master como "plantilla mental"
2. Los datos específicos del nicho (frecuencia, ticket, tipo de programa, recompensas, campañas)
3. Instrucción de qué módulos core reutilizar y qué módulos nicho adaptar

**Nuevo SYSTEM_PROMPT:**
```
Eres el mejor consultor de ventas B2B de loyalty para negocios mexicanos.
Conoces profundamente la psicología de retención de clientes, los programas de lealtad, 
y la plataforma Xtarly Rewards al 100%.

Tu objetivo es generar una presentación comercial que cierre negocios, 
siguiendo el flujo psicológico: FOMO → Dolor → Curiosidad → Confianza → Deseo → ROI → Acción.

La presentación tiene 22 slides en orden fijo. Tu trabajo es:
1. Para slides core (B-K): solo adaptar ejemplos numéricos y productos al nicho
2. Para slides nicho (X1-X6): crear contenido completamente específico al nicho
3. Mantener siempre el flujo emocional de la narrativa
4. Copy must be: cercano, claro, en tú, máx 18 palabras por headline
```

---

### 7.3 Roadmap de Producción

**Semana 1 — Assets Críticos:**
- [ ] Screenshots del producto real: app, cashier, dashboard, wallet (prioridad 🔴)
- [ ] Mockup base de iPhone 15 Pro con las screenshots
- [ ] Gráficas core: siluetas anónimas, barras de retención, ROI calculator

**Semana 2 — Slides Core:**
- [ ] Implementar 8 nuevos tipos de slide en el slide viewer
- [ ] Actualizar el AI prompt a 22 slides con los nuevos tipos
- [ ] Deck master generado para cafeterías (primer nicho de prueba)

**Semana 3 — Assets Lifestyle:**
- [ ] Sesión de fotos: cafetería (nicho base)
- [ ] Mockups de iPhone/iPad con fotos en contexto
- [ ] Video del flujo QR → sello → wallet

**Semana 4 — Tropicalización:**
- [ ] Activar generación para los 10 nichos
- [ ] Fotografía lifestyle para los 5 nichos prioritarios
- [ ] Slide viewer responsive y optimizado para ventas en iPad

**Semana 5-6 — Refinamiento:**
- [ ] A/B test de headlines por nicho
- [ ] Modo "presentación" fullscreen sin distracciones
- [ ] Offline cache para presentar sin internet (ya hay PWA base)
- [ ] Analytics de qué slides se detienen más tiempo (señal de interés)

---

### 7.4 KPIs de la Presentación Como Producto

La app pitch en sí es un activo de ventas. Medir:

- **Completion rate:** % de pitches generados que se ven hasta el final
- **Slide dwell time:** qué slides retienen más tiempo (señal de interés real)
- **Share rate:** % de presentaciones compartidas (vía `/p/[slug]`)
- **Lead conversion:** de presentación vista → contacto iniciado
- **Top niche:** qué nicho genera más presentaciones y conversaciones
- **Best headline:** qué copy del Cover genera más engagement

---

### 7.5 La Presentación Como Canal de Ventas Autónomo

Una vez terminada, la URL pública `/p/[slug]` de cada pitch se convierte en un asset de ventas que el dueño de negocio puede ver solo, a su ritmo, desde su teléfono:

- Se puede compartir por WhatsApp ("Aquí está la info que te mencioné")
- Se puede mostrar en iPad durante una visita presencial
- Se puede incrustar en un email de seguimiento
- El prospecto puede volver a verla cuantas veces quiera
- Con analytics, sabes si la vio completa o se detuvo en el slide de precios

**Esta es la diferencia entre vender y escalar ventas.**

---

## COPY MASTER POR SECCIÓN (Headlines y Subheadlines)

### Headlines del Cover por Nicho

| Nicho | Headline |
|---|---|
| Cafeterías | "Que tu café de las mañanas tenga nombre, apellido y 10 sellos ganados." |
| Restaurantes | "Que la reservación sea tuya. Y el cliente también." |
| Pastelerías | "Cada pieza cuenta. Cada cliente también." |
| Autolavados | "Cada lavado cuenta. Tu próximo lavado gratis está más cerca." |
| Spas | "Cada momento de paz merece su recompensa." |
| Gyms | "Cada rep cuenta. Cada visita suma." |
| Salones | "Tu belleza tiene nombre. Y ahora, recompensas." |
| Tiendas de ropa | "Moda que te conoce. Recompensas que te quedan perfectas." |
| Farmacias | "Tu farmacia de confianza. Con recompensas que cuidan tu bolsillo." |
| Veterinarias | "Cuida a quien más quieres. Acumula recompensas en cada visita." |

### El Cierre (para todos los nichos)

> "Mientras sigues pensándolo, tus mejores clientes están visitando el negocio de enfrente.
> Y ese negocio ya tiene su programa de recompensas.
> 
> Empieza hoy. Es gratis. En 5 minutos."

---

*Documento generado: 2026-05-28 | Xtarly Rewards — Arquitectura Maestra Comercial*
*Para uso interno de producción y ventas. No distribuir.*
