/* page-city.jsx — service-by-city template. HTML sets window.VERTICAL + window.CITY.
   Content: STRINGS[lang].cities[VERTICAL][CITY]. */

function LocalRelevance({ data }) {
  return (
    <section className="section band-tint" id="body">
      <SectionHead eyebrow={data.eyebrow} h={data.h} />
      <Prose blocks={data.blocks} />
    </section>
  );
}

function NearbyLinks({ data }) {
  return (
    <section className="section">
      <SectionHead h={data.h} />
      <div className="link-chips">
        {data.items.map((it) => (
          <a key={it.href} className="link-chip" href={it.href}><Ico name="ph-map-pin" weight="fill" /> {it.label}</a>
        ))}
      </div>
    </section>
  );
}

function CityPage() {
  const T = useT();
  const v = window.VERTICAL || "roofing";
  const cityKey = window.CITY || "mesa";
  const c = T.cities[v][cityKey];
  const how = T.svcHow;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} h={c.hero.h} sub={c.hero.sub}
        ctaLabel={c.hero.cta} ctaHref={c.funnel} crumbs={c.crumbs} />
      <LocalRelevance data={c.local} />
      <Steps3 eyebrow={how.eyebrow} h={how.h} steps={how.steps} />
      <NearbyLinks data={c.nearby} />
      <FAQAccordion eyebrow={c.faq.eyebrow} h={c.faq.h} items={c.faq.items} />
      <CTABand h={c.cta.h} sub={c.cta.sub} ctaLabel={c.hero.cta} ctaHref={c.funnel} />
    </>
  );
}

function CityApp() {
  const v = window.VERTICAL || "roofing";
  const cityKey = window.CITY || "mesa";
  const c0 = (window.STRINGS[detectLang()] || window.STRINGS.en).cities[v][cityKey];
  return <SitePage ctaHref={c0.funnel} ctaLabel={c0.hero.cta}><CityPage /></SitePage>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<CityApp />);
