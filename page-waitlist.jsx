function getWaitlistContent(lang, serviceId) {
  const serviceLabels = {
    en: {
      default: "this service",
      solar: "Solar",
      hvac: "AC & HVAC",
      windows: "Windows",
      bathroom: "Bathroom Remodel",
      kitchen: "Kitchen Remodel",
      pool: "Pool",
      pest: "Pest & Scorpion Control",
      gutters: "Gutters",
      siding: "Siding",
      garage: "Garage Doors",
      foundation: "Foundation Repair",
      insulation: "Insulation",
      poolservice: "Pool Service",
      landscape: "Desert Landscaping",
      tree: "Tree Service",
      plumbing: "Plumbing",
      electrical: "Electrical",
      water: "Water Treatment",
      alarms: "Home Security",
      flooring: "Flooring",
      painting: "Painting",
      epoxy: "Garage Epoxy",
      housecleaning: "House Cleaning",
      windowcleaning: "Window Cleaning",
    },
    es: {
      default: "este servicio",
      solar: "Solar",
      hvac: "Aire acondicionado",
      windows: "Ventanas",
      bathroom: "Remodelación de baño",
      kitchen: "Remodelación de cocina",
      pool: "Piscina",
      pest: "Control de plagas y escorpiones",
      gutters: "Canaletas",
      siding: "Revestimiento",
      garage: "Puertas de garaje",
      foundation: "Reparación de cimientos",
      insulation: "Aislamiento",
      poolservice: "Servicio de piscina",
      landscape: "Jardinería desértica",
      tree: "Servicio de árboles",
      plumbing: "Plomería",
      electrical: "Electricidad",
      water: "Tratamiento de agua",
      alarms: "Seguridad del hogar",
      flooring: "Pisos",
      painting: "Pintura",
      epoxy: "Epóxico de garaje",
      housecleaning: "Limpieza de casa",
      windowcleaning: "Limpieza de ventanas",
    },
  };

  const copy = {
    en: {
      eyebrow: "Coming soon",
      title: "Join the waitlist for {service}",
      sub: "We're still lining up the right vetted providers before we open this category publicly.",
      body: [
        "We only launch a service once we have the right local fit, pricing structure, and provider standards in place.",
        "Join the deals list today and we'll let you know when this category is officially available in Arizona.",
      ],
      primary: "Join the deals list",
      secondary: "Back to homepage",
      bulletTitle: "What happens next",
      bullets: [
        "We keep building the provider bench behind the scenes.",
        "You'll hear from us when the service is ready to open.",
        "We only roll it out once we can stand behind the experience.",
      ],
    },
    es: {
      eyebrow: "Muy pronto",
      title: "Únase a la lista para {service}",
      sub: "Todavía estamos reuniendo a los profesionales verificados correctos antes de abrir esta categoría al público.",
      body: [
        "Solo lanzamos un servicio cuando tenemos el ajuste local correcto, la estructura de precios adecuada y los estándares de proveedores bien definidos.",
        "Únase hoy a la lista de ofertas y le avisaremos cuando esta categoría esté disponible oficialmente en Arizona.",
      ],
      primary: "Unirme a la lista",
      secondary: "Volver al inicio",
      bulletTitle: "Qué sigue",
      bullets: [
        "Seguimos armando la red de proveedores tras bambalinas.",
        "Le avisaremos cuando el servicio esté listo para abrir.",
        "Solo lo lanzamos cuando podemos respaldar la experiencia.",
      ],
    },
  };

  const locale = lang === "es" ? "es" : "en";
  const serviceName = serviceLabels[locale][serviceId] || serviceLabels[locale].default;
  const template = copy[locale];
  return { ...template, serviceName, title: template.title.replace("{service}", serviceName) };
}

function WaitlistPage() {
  const [lang] = useLang();
  const params = new URLSearchParams(window.location.search);
  const content = getWaitlistContent(lang, params.get("service"));
  const browseLabel = lang === "es" ? "Ver más servicios" : "Browse more services";
  const dealsHref = lang === "es" ? "home2.html?lang=es#deals" : "home2.html#deals";
  const servicesHref = lang === "es" ? "home2.html?lang=es#services" : "home2.html#services";

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        h={content.title}
        sub={content.sub}
        ctaLabel={content.primary}
        ctaHref={dealsHref}
        crumbs={[
          { label: lang === "es" ? "Inicio" : "Home", href: lang === "es" ? "home2.html?lang=es" : "home2.html" },
          { label: content.serviceName },
        ]}
        secondaryLabel={content.secondary}
        secondaryHref={servicesHref}
      />
      <section className="section" id="body">
        <div className="sp-split">
          <div className="sp-prose">
            {content.body.map((paragraph) => <p key={paragraph} className="sp-prose-p">{paragraph}</p>)}
          </div>
          <aside className="sp-aside">
            <div className="sp-aside-h">{content.bulletTitle}</div>
            {content.bullets.map((item) => (
              <div key={item} className="sp-aside-link">
                <span>{item}</span>
                <Ico name="ph-check-circle" weight="fill" />
              </div>
            ))}
            <a className="btn btn-gold cta" href={dealsHref} style={{ marginTop: 18 }}>{content.primary}</a>
            <a className="btn btn-ghost" href={servicesHref} style={{ marginTop: 10 }}>{browseLabel}</a>
          </aside>
        </div>
      </section>
    </>
  );
}

function WaitlistApp() {
  const lang0 = detectLang();
  const home = (window.STRINGS[lang0] || window.STRINGS.en).home;
  const ctaHref = lang0 === "es" ? "home2.html?lang=es#deals" : "home2.html#deals";
  return <SitePage ctaHref={ctaHref} ctaLabel={home?.deals?.btn || "Join the deals list"}><WaitlistPage /></SitePage>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<WaitlistApp />);
