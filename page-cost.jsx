/* page-cost.jsx — cost guide template. HTML sets window.VERTICAL.
   Content: STRINGS[lang].cost[VERTICAL]. */

function CostTable({ data, placeholderNote }) {
  const T = useT();
  const phTag = (T === window.STRINGS.es) ? "Marcador" : "Placeholder";
  return (
    <section className="section">
      <SectionHead eyebrow={data.eyebrow} h={data.h} />
      <div className="cost-table">
        <div className="cost-row head"><div className="cost-label">{data.head.label}</div><div className="cost-val">{data.head.val}</div></div>
        {data.rows.map((r, i) => (
          <div key={i} className="cost-row">
            <div><div className="cost-label">{r.label}</div><div className="cost-sub">{r.sub}</div></div>
            <div className="cost-val">{r.val} <span className="placeholder-tag">{phTag}</span></div>
          </div>
        ))}
      </div>
      <div className="cost-note"><Ico name="ph-info" weight="fill" /> {placeholderNote}</div>
    </section>
  );
}

function Factors({ data }) {
  return (
    <section className="section band-tint">
      <SectionHead eyebrow={data.eyebrow} h={data.h} />
      <Prose blocks={data.blocks} />
    </section>
  );
}

function Avoid({ data }) {
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

function InsuranceFin({ data }) {
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

function CostPage() {
  const T = useT();
  const id = window.VERTICAL || "roofing";
  const c = T.cost[id];
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} h={c.hero.h} sub={c.hero.sub}
        ctaLabel={c.hero.cta} ctaHref={c.funnel} crumbs={c.crumbs} />
      <CostTable data={c.table} placeholderNote={c.placeholderNote} />
      <Factors data={c.factors} />
      <Avoid data={c.avoid} />
      <InsuranceFin data={c.insurance} />
      <FAQAccordion eyebrow={c.faq.eyebrow} h={c.faq.h} items={c.faq.items} />
      <CTABand h={c.cta.h} sub={c.cta.sub} ctaLabel={c.hero.cta} ctaHref={c.funnel} />
    </>
  );
}

function CostApp() {
  const id = window.VERTICAL || "roofing";
  const c0 = (window.STRINGS[detectLang()] || window.STRINGS.en).cost[id];
  return <SitePage ctaHref={c0.funnel} ctaLabel={c0.hero.cta}><CostPage /></SitePage>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<CostApp />);
