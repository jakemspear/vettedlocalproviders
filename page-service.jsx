/* page-service.jsx — per-vertical organic service page template.
   HTML sets window.VERTICAL (e.g. "roofing"); content comes from
   STRINGS[lang].services[VERTICAL]. */

function CoverGrid({ data }) {
  return (
    <section className="section">
      <SectionHead eyebrow={data.eyebrow} h={data.h} />
      <div className="feat-grid">
        {data.items.map((it, i) => (
          <div key={i} className="feat-card">
            <div className="feat-ico"><Ico name={it.icon} weight="duotone" /></div>
            <div className="feat-h">{it.h}</div>
            <div className="feat-b">{it.b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyVetted({ data, costPage, cities, citiesLabel, costLabel }) {
  return (
    <section className="section band-tint" id="body">
      <div className="sp-split">
        <div>
          <SectionHead eyebrow={data.eyebrow} h={data.h} />
          <Prose blocks={data.blocks} />
        </div>
        <aside className="sp-aside">
          <div className="sp-aside-h">{citiesLabel}</div>
          {cities.map((c) => (
            <a key={c.href} className="sp-aside-link" href={c.href}>{c.label} <Ico name="ph-arrow-right" weight="bold" /></a>
          ))}
          {costPage && <a className="sp-aside-link" href={costPage}>{costLabel} <Ico name="ph-arrow-right" weight="bold" /></a>}
        </aside>
      </div>
    </section>
  );
}

function InsuranceBlock({ data }) {
  return (
    <section className="section">
      <div className="sp-prose">
        <div className="eyebrow" style={{ marginBottom: 10 }}>{data.eyebrow}</div>
        <h2 className="display sec-h2">{data.h}</h2>
        <p className="sp-prose-p">{data.body}</p>
        <div className="cost-note"><Ico name="ph-info" weight="fill" /> {data.note}</div>
      </div>
    </section>
  );
}

function ServicePage() {
  const T = useT();
  const id = window.VERTICAL || "roofing";
  const s = T.services[id];
  const how = T.svcHow;
  const homeT = T.home;
  const serviceName = s.crumbs[s.crumbs.length - 1].label;
  const inWord = (T === window.STRINGS.es) ? "en" : "in";
  // only link cities whose pages actually exist (phasing: top cities first)
  const BUILT_CITIES = (window.BUILT_CITIES && window.BUILT_CITIES[id]) || ["Mesa", "Gilbert", "Chandler"];
  const cityLinks = BUILT_CITIES.map((c) => ({
    label: `${serviceName} ${inWord} ${c}`,
    href: `${capFile(id)} in ${c}.html`,
  }));
  const ctaHref = s.live ? s.funnel : "home2.html#deals";
  const ctaLabel = s.live ? s.hero.cta : (homeT.liveBadge && homeT.soonBadge ? homeT.soonBadge : s.hero.cta);

  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} h={s.hero.h} sub={s.hero.sub}
        ctaLabel={ctaLabel} ctaHref={ctaHref} crumbs={s.crumbs} secondaryLabel={null} />
      <CoverGrid data={s.cover} />
      <WhyVetted data={s.why} costPage={s.costPage}
        cities={cityLinks}
        citiesLabel={homeT.areas.h} costLabel={costLabelFor(T, id)} />
      <Steps3 eyebrow={how.eyebrow} h={how.h} steps={how.steps} />
      {s.insurance && <InsuranceBlock data={s.insurance} />}
      <FAQAccordion eyebrow={s.faq.eyebrow} h={s.faq.h} items={s.faq.items} />
      <CTABand h={s.cta.h} sub={s.cta.sub} ctaLabel={ctaLabel} ctaHref={ctaHref} />
    </>
  );
}

function capFile(id) {
  // roofing -> "Roofing" for filenames like "Roofing in Mesa.html"
  return id.charAt(0).toUpperCase() + id.slice(1);
}
function costLabelFor(T, id) {
  return T === window.STRINGS.es ? `Guía de precios de ${T.services[id].crumbs.slice(-1)[0].label.toLowerCase()}` : `${T.services[id].crumbs.slice(-1)[0].label} cost guide`;
}

function ServiceApp() {
  const id = window.VERTICAL || "roofing";
  const lang0 = detectLang();
  const s0 = (window.STRINGS[lang0] || window.STRINGS.en).services[id];
  const ctaHref = s0.live ? s0.funnel : "home2.html#deals";
  return <SitePage ctaHref={ctaHref} ctaLabel={s0.hero.cta}><ServicePage /></SitePage>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<ServiceApp />);
