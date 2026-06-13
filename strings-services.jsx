/* strings-services.jsx — per-vertical organic service pages (EN + ES).
   ONE template; each vertical is a content entry. Roofing populated first.
   window.STRINGS[lang].services[verticalId]. */
window.STRINGS = window.STRINGS || {};
window.STRINGS.en = window.STRINGS.en || {};
window.STRINGS.es = window.STRINGS.es || {};

/* shared 3-step (reused across verticals) */
window.STRINGS.en.svcHow = { eyebrow: "How it works", h: "Three taps to a real quote.", steps: [
  { icon: "ph-house", head: "Tell us about the job", body: "A few quick taps. No forms to wrestle with." },
  { icon: "ph-users-three", head: "We match you with a vetted pro", body: "A small, local network we have personally screened." },
  { icon: "ph-phone-call", head: "Free quote, fast callback", body: "A real Arizona specialist, on the line fast." },
] };
window.STRINGS.es.svcHow = { eyebrow: "Cómo funciona", h: "Tres toques para una cotización real.", steps: [
  { icon: "ph-house", head: "Cuéntenos del trabajo", body: "Unos toques rápidos. Sin formularios complicados." },
  { icon: "ph-users-three", head: "Lo conectamos con un profesional verificado", body: "Una red local pequeña que revisamos personalmente." },
  { icon: "ph-phone-call", head: "Cotización gratis, llamada rápida", body: "Un especialista real de Arizona, en la línea rápido." },
] };

window.STRINGS.en.services = {
  roofing: {
    live: true, funnel: "Vetted Home Professionals.html", costPage: "Roofing Cost.html",
    meta: { title: "Arizona Roofing · Vetted Local Roofers | Casa Concierge",
      desc: "Tile, foam, and shingle roofing across the Phoenix Valley. Get matched with a vetted, ROC-registered Arizona roofer. Free quotes, no spam." },
    crumbs: [{ label: "Home", href: "home2.html" }, { label: "Services", href: "home2.html#services" }, { label: "Roofing" }],
    hero: { eyebrow: "Arizona roofing", h: "Roofing built for Arizona roofs.", sub: "Tile, foam, and shingle. We match you with a vetted local roofer who knows monsoons, desert heat, and how to handle an insurance claim.", cta: "Get a free quote" },
    cover: { eyebrow: "What we cover", h: "Every kind of Arizona roof.", items: [
      { icon: "ph-stack", h: "Tile roofs", b: "Concrete and clay tile repair, re-felt, and full replacement. The Valley's most common roof." },
      { icon: "ph-rectangle", h: "Foam & flat", b: "Spray foam and flat-roof recoats that stand up to UV and ponding." },
      { icon: "ph-squares-four", h: "Shingle roofs", b: "Asphalt shingle repair and replacement with heat-rated materials." },
      { icon: "ph-drop", h: "Leaks & storm damage", b: "Monsoon leak repair and storm damage, with insurance claim help." },
    ] },
    why: { eyebrow: "Why a vetted pro", h: "Arizona roofing is its own specialty.", blocks: [
      { p: "A roof in Arizona does not fail the way a roof in Ohio does. Our sun degrades underlayment and shingles faster than almost anywhere in the country, monsoon storms drive rain sideways under tile, and a flat foam roof needs a completely different skill set than a steep shingle one. A generalist who does a little of everything is exactly who you do not want up there." },
      { h: "What Arizona roofs actually need" },
      { list: ["Roofers who know tile underlayment is the real lifespan, not the tile itself", "Foam and flat-roof crews who recoat on the right schedule for our UV", "Monsoon-savvy flashing and drainage details", "Honest assessment of whether you need repair, replacement, or nothing yet"] },
      { p: "Every roofer we match you with is ROC-registered, insured, and verified before they ever get your number. You get one specialist who does your kind of roof, not a call center and not twenty robocalls." },
    ] },
    insurance: { eyebrow: "Insurance & storm", h: "Storm damage? You may only owe your deductible.", body: "Monsoon and storm damage is often covered by your homeowners policy. Our vetted roofers handle the inspection and walk the claim paperwork with you. We never advertise a 'free roof,' and we never touch your deductible. We just help you find out, honestly, whether you qualify.", note: "Insurance and claim eligibility depend on your policy and the damage. A licensed pro and your insurer make the final call." },
    faq: { eyebrow: "Roofing FAQ", h: "Arizona roofing questions.", items: [
      { q: "How long does a tile roof last in Arizona?", a: "The tile itself can last 50 years or more, but the underlayment beneath it usually needs replacing every 20 to 25 years. That underlayment is what actually keeps water out, so 'my tile looks fine' does not always mean the roof is fine." },
      { q: "Repair or replace?", a: "It depends on the age of the underlayment, the extent of damage, and your plans for the home. A good vetted roofer will tell you straight, even if the answer is 'you have a few good years left.'" },
      { q: "Do you handle insurance claims?", a: "Our vetted roofers can inspect for storm and monsoon damage and help you through the claim. Eligibility is between you and your insurer, and we never advertise a free roof or touch your deductible." },
      { q: "Is the quote really free?", a: "Yes. Getting matched and quoted costs nothing, and there is no obligation." },
    ] },
    cta: { h: "Ready for a real roof quote?", sub: "Get matched with a vetted Arizona roofer. Free, no pressure, no spam.", cta: "Get my free roof quote" },
  },
};

window.STRINGS.es.services = {
  roofing: {
    live: true, funnel: "Vetted Home Professionals.html", costPage: "Roofing Cost.html",
    meta: { title: "Techos en Arizona · Techadores locales verificados | Casa Concierge",
      desc: "Techos de teja, espuma y asfalto en el Valle del Sol. Conéctese con un techador de Arizona verificado y registrado ROC. Cotizaciones gratis, sin spam." },
    crumbs: [{ label: "Inicio", href: "home2.html" }, { label: "Servicios", href: "home2.html#services" }, { label: "Techos" }],
    hero: { eyebrow: "Techos en Arizona", h: "Techos hechos para el clima de Arizona.", sub: "Teja, espuma y asfalto. Lo conectamos con un techador local verificado que conoce los monzones, el calor del desierto y cómo manejar un reclamo de seguro.", cta: "Recibir cotización gratis" },
    cover: { eyebrow: "Qué cubrimos", h: "Todo tipo de techo de Arizona.", items: [
      { icon: "ph-stack", h: "Techos de teja", b: "Reparación, recambio de fieltro y reemplazo total de teja de concreto y barro. El techo más común del Valle." },
      { icon: "ph-rectangle", h: "Espuma y plano", b: "Espuma y recubrimientos de techo plano que resisten los rayos UV y el encharcamiento." },
      { icon: "ph-squares-four", h: "Techos de asfalto", b: "Reparación y reemplazo de tejas de asfalto con materiales para alta temperatura." },
      { icon: "ph-drop", h: "Goteras y tormentas", b: "Reparación de goteras de monzón y daño por tormenta, con ayuda para el reclamo de seguro." },
    ] },
    why: { eyebrow: "Por qué un profesional verificado", h: "Los techos de Arizona son su propia especialidad.", blocks: [
      { p: "Un techo en Arizona no falla como uno en Ohio. Nuestro sol degrada el fieltro y las tejas más rápido que casi cualquier lugar del país, las tormentas de monzón meten la lluvia de lado bajo la teja, y un techo plano de espuma necesita una habilidad totalmente distinta a uno inclinado de asfalto. Un generalista que hace un poco de todo es justo a quien no quiere allá arriba." },
      { h: "Lo que de verdad necesitan los techos de Arizona" },
      { list: ["Techadores que saben que el fieltro es la vida real del techo, no la teja", "Cuadrillas de espuma y techo plano que recubren en el momento correcto para nuestro sol", "Detalles de tapajuntas y drenaje que aguantan el monzón", "Una evaluación honesta de si necesita reparar, reemplazar o nada todavía"] },
      { p: "Cada techador que le presentamos está registrado en el ROC, asegurado y verificado antes de tener su número. Recibe un especialista que hace su tipo de techo, no un centro de llamadas ni veinte llamadas automáticas." },
    ] },
    insurance: { eyebrow: "Seguro y tormentas", h: "¿Daño por tormenta? Quizá solo deba su deducible.", body: "El daño por monzón y tormenta a menudo lo cubre su póliza de propietario. Nuestros techadores verificados hacen la inspección y lo acompañan con el papeleo del reclamo. Nunca anunciamos un 'techo gratis' ni tocamos su deducible. Solo le ayudamos a saber, con honestidad, si califica.", note: "El seguro y la elegibilidad del reclamo dependen de su póliza y del daño. Un profesional con licencia y su aseguradora deciden al final." },
    faq: { eyebrow: "Preguntas de techos", h: "Preguntas sobre techos en Arizona.", items: [
      { q: "¿Cuánto dura un techo de teja en Arizona?", a: "La teja puede durar 50 años o más, pero el fieltro debajo suele necesitar reemplazo cada 20 a 25 años. Ese fieltro es lo que de verdad detiene el agua, así que 'mi teja se ve bien' no siempre significa que el techo esté bien." },
      { q: "¿Reparar o reemplazar?", a: "Depende de la edad del fieltro, el alcance del daño y sus planes para la casa. Un buen techador verificado le dirá la verdad, aunque la respuesta sea 'le quedan unos buenos años.'" },
      { q: "¿Manejan reclamos de seguro?", a: "Nuestros techadores verificados pueden inspeccionar daño de tormenta y monzón y ayudarle con el reclamo. La elegibilidad es entre usted y su aseguradora, y nunca anunciamos un techo gratis ni tocamos su deducible." },
      { q: "¿La cotización es de verdad gratis?", a: "Sí. Conectarse y cotizar no cuesta nada, y no hay obligación." },
    ] },
    cta: { h: "¿Listo para una cotización de techo real?", sub: "Conéctese con un techador de Arizona verificado. Gratis, sin presión, sin spam.", cta: "Recibir mi cotización gratis" },
  },
};
