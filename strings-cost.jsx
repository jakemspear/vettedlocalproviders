/* strings-cost.jsx — cost guides per service (EN + ES).
   Price ranges are CLEARLY-MARKED PLACEHOLDERS to be validated against the
   client's partner pricing + local market data before launch. Do not treat
   as final figures. STRINGS[lang].cost[verticalId]. */
window.STRINGS = window.STRINGS || {};
window.STRINGS.en = window.STRINGS.en || {};
window.STRINGS.es = window.STRINGS.es || {};

window.STRINGS.en.cost = {
  roofing: {
    funnel: "Vetted Home Professionals.html", servicePage: "Roofing.html",
    meta: { title: "What Does a Roof Cost in Arizona? (2026 Guide) | Vetted Local Providers",
      desc: "Honest Arizona roof cost ranges for tile, foam, and shingle, plus what drives the price and how to avoid overpaying. No pressure, no spam." },
    crumbs: [{ label: "Home", href: "Homepage.html" }, { label: "Roofing", href: "Roofing.html" }, { label: "Cost guide" }],
    hero: { eyebrow: "Roofing cost guide", h: "What does a roof cost in Arizona?", sub: "An honest look at tile, foam, and shingle pricing in the Valley, what moves the number, and how to avoid overpaying. No pressure to buy.", cta: "Get a real quote for my home" },
    placeholderNote: "The ranges below are placeholders pending validation against partner pricing and current Arizona market data. Replace with verified figures before launch. Every roof is different, so treat these as ballpark only.",
    table: { eyebrow: "Ballpark ranges", h: "Arizona roof cost ranges.", head: { label: "Roof type", val: "Typical range (2,000 sq ft home)" }, rows: [
      { label: "Shingle (asphalt)", val: "$X,XXX – $XX,XXX", sub: "Most budget-friendly, shorter lifespan in AZ sun" },
      { label: "Tile re-felt (reuse tile)", val: "$X,XXX – $XX,XXX", sub: "Reuses existing tile, replaces the underlayment" },
      { label: "New concrete tile", val: "$XX,XXX – $XX,XXX", sub: "Full tear-off and new tile" },
      { label: "Foam / flat recoat", val: "$X,XXX – $X,XXX", sub: "Recoat on a UV-based schedule" },
      { label: "Foam / flat replacement", val: "$XX,XXX – $XX,XXX", sub: "Full spray-foam system" },
    ] },
    factors: { eyebrow: "What affects the price", h: "What actually moves the number.", blocks: [
      { h: "Size and pitch" },
      { p: "Roofers price by the square (100 square feet) and by complexity. A big single-story Mesa home has more roof area than a compact two-story, and a steep or cut-up roof with lots of valleys and penetrations costs more to do right." },
      { h: "Material and underlayment" },
      { p: "Tile versus shingle versus foam is the obvious driver, but underlayment grade matters just as much in Arizona. A premium underlayment costs more up front and buys you years of extra life under our sun, which is usually the better long-run value on a tile roof." },
      { h: "Tear-off and surprises" },
      { p: "Removing old layers, repairing damaged decking, and updating flashing all add to the job. A good roofer inspects first and tells you about likely surprises before you sign, not after." },
      { h: "Arizona-specific factors" },
      { list: ["Heat-rated and UV-resistant materials cost more but last longer here", "Monsoon-grade flashing and drainage details", "HOA-mandated tile profiles or colors in master-planned communities", "Permit and inspection fees by city"] },
    ] },
    avoid: { eyebrow: "Avoid overpaying", h: "How to not get fleeced.", items: [
      { icon: "ph-files", h: "Get more than one quote", b: "Even with a vetted pro, a second opinion confirms scope and price. Honest roofers expect it." },
      { icon: "ph-eye", h: "Insist on a written scope", b: "Underlayment grade, tear-off, flashing, and warranty should be in writing, not implied." },
      { icon: "ph-warning-octagon", h: "Be wary of 'free roof' pitches", b: "Anyone promising a free roof or to waive your insurance deductible is a red flag in Arizona." },
      { icon: "ph-shield-check", h: "Verify license and insurance", b: "Confirm an active ROC license and current insurance. We verify this before we ever match you." },
    ] },
    insurance: { eyebrow: "Insurance & financing", h: "When insurance or financing applies.", body: "If your roof was damaged by a monsoon or storm, your homeowners policy may cover much of the cost, and you would typically owe your deductible. Separately, many roofers offer financing so you can pay monthly instead of all at once. We never advertise a free roof and never touch your deductible. We help you understand, honestly, what applies to your situation.", note: "Coverage and financing depend on your policy, your lender, and your roof. A licensed pro and your insurer make the final call." },
    faq: { eyebrow: "Cost FAQ", h: "Roof cost questions.", items: [
      { q: "Why is tile more than shingle?", a: "Tile material and labor cost more up front, but tile lasts far longer in Arizona sun, and on many homes a re-felt that reuses your existing tile is cheaper than a full shingle replacement. The right comparison is lifetime cost, not just the sticker." },
      { q: "Is the cheapest quote the best deal?", a: "Not usually. The cheapest bid often skimps on underlayment grade or skips flashing details that matter most in our climate. Compare scope, not just the bottom-line number." },
      { q: "Can I finance a roof?", a: "Often yes. Many vetted roofers offer monthly payment options. Ask for the terms in writing." },
      { q: "Is the quote free?", a: "Yes. Getting matched and quoted by a vetted Arizona roofer costs nothing, with no obligation." },
    ] },
    cta: { h: "Want a real number for your roof?", sub: "Skip the ballpark. Get a free, no-pressure quote for your actual home from a vetted Arizona roofer.", cta: "Get a real quote for my home" },
  },
};

window.STRINGS.es.cost = {
  roofing: {
    funnel: "Vetted Home Professionals.html", servicePage: "Roofing.html",
    meta: { title: "¿Cuánto cuesta un techo en Arizona? (Guía 2026) | Vetted Local Providers",
      desc: "Rangos honestos de precios de techos en Arizona para teja, espuma y asfalto, qué mueve el precio y cómo evitar pagar de más. Sin presión, sin spam." },
    crumbs: [{ label: "Inicio", href: "Homepage.html" }, { label: "Techos", href: "Roofing.html" }, { label: "Guía de precios" }],
    hero: { eyebrow: "Guía de precios de techos", h: "¿Cuánto cuesta un techo en Arizona?", sub: "Una mirada honesta a los precios de teja, espuma y asfalto en el Valle, qué mueve el número y cómo evitar pagar de más. Sin presión para comprar.", cta: "Recibir una cotización real" },
    placeholderNote: "Los rangos siguientes son marcadores pendientes de validar con los precios de los socios y datos actuales del mercado de Arizona. Reemplazar con cifras verificadas antes del lanzamiento. Cada techo es distinto, tómelos solo como referencia.",
    table: { eyebrow: "Rangos aproximados", h: "Rangos de precios de techos en Arizona.", head: { label: "Tipo de techo", val: "Rango típico (casa de 185 m²)" }, rows: [
      { label: "Asfalto (shingle)", val: "$X,XXX – $XX,XXX", sub: "Lo más económico, menor vida bajo el sol de AZ" },
      { label: "Recambio de fieltro (reusar teja)", val: "$X,XXX – $XX,XXX", sub: "Reusa la teja, reemplaza el fieltro" },
      { label: "Teja de concreto nueva", val: "$XX,XXX – $XX,XXX", sub: "Demolición total y teja nueva" },
      { label: "Recubrimiento espuma / plano", val: "$X,XXX – $X,XXX", sub: "Recubrimiento según los rayos UV" },
      { label: "Reemplazo espuma / plano", val: "$XX,XXX – $XX,XXX", sub: "Sistema completo de espuma" },
    ] },
    factors: { eyebrow: "Qué afecta el precio", h: "Qué mueve de verdad el número.", blocks: [
      { h: "Tamaño e inclinación" },
      { p: "Los techadores cotizan por cuadro (unos 9 m²) y por complejidad. Una casa grande de un piso en Mesa tiene más área de techo que una compacta de dos pisos, y un techo inclinado o con muchos valles y penetraciones cuesta más hacerlo bien." },
      { h: "Material y fieltro" },
      { p: "Teja contra asfalto contra espuma es lo obvio, pero el grado del fieltro importa igual en Arizona. Un fieltro premium cuesta más al inicio y le da años extra de vida bajo nuestro sol, que suele ser el mejor valor a largo plazo en un techo de teja." },
      { h: "Demolición y sorpresas" },
      { p: "Quitar capas viejas, reparar la cubierta dañada y actualizar el tapajuntas suman al trabajo. Un buen techador inspecciona primero y le avisa de probables sorpresas antes de firmar, no después." },
      { h: "Factores propios de Arizona" },
      { list: ["Materiales resistentes al calor y a los rayos UV cuestan más pero duran más aquí", "Detalles de tapajuntas y drenaje a prueba de monzón", "Perfiles o colores de teja exigidos por la HOA en comunidades planificadas", "Tarifas de permiso e inspección por ciudad"] },
    ] },
    avoid: { eyebrow: "Evite pagar de más", h: "Cómo no dejarse engañar.", items: [
      { icon: "ph-files", h: "Pida más de una cotización", b: "Aun con un profesional verificado, una segunda opinión confirma alcance y precio. Los techadores honestos lo esperan." },
      { icon: "ph-eye", h: "Exija un alcance por escrito", b: "Grado del fieltro, demolición, tapajuntas y garantía deben estar por escrito, no implícitos." },
      { icon: "ph-warning-octagon", h: "Cuidado con el 'techo gratis'", b: "Quien promete un techo gratis o perdonar su deducible es una señal de alerta en Arizona." },
      { icon: "ph-shield-check", h: "Verifique licencia y seguro", b: "Confirme una licencia ROC activa y seguro vigente. Nosotros lo verificamos antes de conectarlo." },
    ] },
    insurance: { eyebrow: "Seguro y financiamiento", h: "Cuándo aplica el seguro o el financiamiento.", body: "Si su techo se dañó por un monzón o tormenta, su póliza de propietario puede cubrir gran parte del costo, y normalmente usted debería su deducible. Aparte, muchos techadores ofrecen financiamiento para pagar mensual en lugar de todo de una vez. Nunca anunciamos un techo gratis ni tocamos su deducible. Le ayudamos a entender, con honestidad, qué aplica a su situación.", note: "La cobertura y el financiamiento dependen de su póliza, su prestamista y su techo. Un profesional con licencia y su aseguradora deciden al final." },
    faq: { eyebrow: "Preguntas de precio", h: "Preguntas sobre el costo del techo.", items: [
      { q: "¿Por qué la teja cuesta más que el asfalto?", a: "El material y la mano de obra de la teja cuestan más al inicio, pero la teja dura mucho más bajo el sol de Arizona, y en muchas casas un recambio de fieltro que reusa su teja es más barato que un reemplazo total de asfalto. La comparación correcta es el costo de por vida, no solo el precio inicial." },
      { q: "¿La cotización más barata es la mejor?", a: "Casi nunca. La oferta más barata a menudo escatima en el grado del fieltro o salta detalles de tapajuntas que más importan en nuestro clima. Compare el alcance, no solo el número final." },
      { q: "¿Puedo financiar un techo?", a: "A menudo sí. Muchos techadores verificados ofrecen pagos mensuales. Pida los términos por escrito." },
      { q: "¿La cotización es gratis?", a: "Sí. Conectarse y cotizar con un techador verificado de Arizona no cuesta nada, sin obligación." },
    ] },
    cta: { h: "¿Quiere un número real para su techo?", sub: "Olvide el aproximado. Reciba una cotización gratis y sin presión para su casa real de un techador verificado de Arizona.", cta: "Recibir una cotización real" },
  },
};
