/* page-pros.jsx — For Pros / Become a Vetted Pro. */
const { useState: useStateP } = React;

function WhyJoin() {
  const P = useT().pros.why;
  return (
    <section className="section">
      <SectionHead eyebrow={P.eyebrow} h={P.h} />
      <div className="feat-grid cols-4">
        {P.items.map((it, i) => (
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

function IntakeForm() {
  const F = useT().pros.form;
  const [d, setD] = useStateP({});
  const [done, setDone] = useStateP(false);
  const set = (k, v) => setD((s) => ({ ...s, [k]: v }));
  const licenseNotReq = d.licenseType === F.licenseTypeOpts[F.licenseTypeOpts.length - 1];
  const ok = ["company", "contactName", "email", "phone"].every((k) => (d[k] || "").trim()) && d.consent;
  if (done) {
    return (
      <section className="section" id="apply">
        <SectionHead eyebrow={F.eyebrow} h={F.h} center />
        <div className="intake">
          <div className="intake-done">
            <Ico name="ph-check-circle" weight="fill" className="intake-done-ico" />
            <div className="intake-done-h">{F.doneH}</div>
            <p className="intake-done-b">{F.doneB}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="section" id="apply">
      <SectionHead eyebrow={F.eyebrow} h={F.h} sub={F.sub} center />
      <form className="intake" onSubmit={(e) => { e.preventDefault(); if (ok) setDone(true); }}>
        <div className="intake-grid">
          <div className="field-2">
            <div className="field"><label>{F.company} <span className="req">*</span></label><input className="input" value={d.company || ""} onChange={(e) => set("company", e.target.value)} /></div>
            <div className="field"><label>{F.contactName} <span className="req">*</span></label><input className="input" value={d.contactName || ""} onChange={(e) => set("contactName", e.target.value)} /></div>
          </div>
          <div className="field-2">
            <div className="field"><label>{F.email} <span className="req">*</span></label><input type="email" className="input" value={d.email || ""} onChange={(e) => set("email", e.target.value)} /></div>
            <div className="field"><label>{F.phone} <span className="req">*</span></label><input type="tel" className="input" value={d.phone || ""} onChange={(e) => set("phone", e.target.value)} /></div>
          </div>
          <div className="field-2">
            <div className={`field${licenseNotReq ? " field-disabled" : ""}`}>
              <label>{F.licenseNum}{licenseNotReq && <span className="opt"> {F.optional}</span>}</label>
              <input className="input" value={licenseNotReq ? "" : (d.licenseNum || "")} onChange={(e) => set("licenseNum", e.target.value)} disabled={licenseNotReq} />
            </div>
            <div className="field"><label>{F.licenseType} <span className="opt">{F.optional}</span></label>
              <select className="input" value={d.licenseType || ""} onChange={(e) => set("licenseType", e.target.value)}>
                <option value="">{F.licenseTypePlaceholder}</option>
                {F.licenseTypeOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <p className="intake-help"><Ico name="ph-info" weight="bold" /> {F.licenseHelp}</p>
          <div className="field-2">
            <div className="field"><label>{F.years} <span className="opt">{F.optional}</span></label><input className="input" inputMode="numeric" value={d.years || ""} onChange={(e) => set("years", e.target.value)} /></div>
            <div className="field"><label>{F.insurance} <span className="opt">{F.optional}</span></label>
              <select className="input" value={d.insurance || ""} onChange={(e) => set("insurance", e.target.value)}>
                <option value="">—</option>
                {F.insuranceOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="field"><label>{F.trades} <span className="opt">{F.optional}</span></label><input className="input" placeholder={F.tradesPlaceholder} value={d.trades || ""} onChange={(e) => set("trades", e.target.value)} /></div>
          <div className="field"><label>{F.cities} <span className="opt">{F.optional}</span></label><input className="input" placeholder={F.citiesPlaceholder} value={d.cities || ""} onChange={(e) => set("cities", e.target.value)} /></div>
          <div className="field"><label>{F.website} <span className="opt">{F.optional}</span></label><input className="input" value={d.website || ""} onChange={(e) => set("website", e.target.value)} /></div>
          <label className="intake-consent">
            <input type="checkbox" checked={!!d.consent} onChange={(e) => set("consent", e.target.checked)} />
            <span className="consent-box"><Ico name="ph-check" weight="bold" /></span>
            <span>{F.consent}</span>
          </label>
          <button type="submit" className="btn btn-gold cta" disabled={!ok}>{F.submit} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></button>
          {!ok && <p className="submit-hint" style={{ marginTop: 2 }}>{F.hint}</p>}
        </div>
      </form>
    </section>
  );
}

function ProsPage() {
  const P = useT().pros;
  return (
    <>
      <PageHero eyebrow={P.hero.eyebrow} h={P.hero.h} sub={P.hero.sub}
        ctaLabel={P.hero.cta} ctaHref="#apply" secondaryLabel={P.hero.secondary} secondaryHref="#standards"
        crumbs={P.crumbs} />
      <WhyJoin />
      <div id="standards"><VettedRubric eyebrow={P.rubric.eyebrow} h={P.rubric.h} sub={P.rubric.sub} items={P.rubric.items} /></div>
      <Steps3 eyebrow={P.how.eyebrow} h={P.how.h} steps={P.how.steps} />
      <IntakeForm />
      <FAQAccordion eyebrow={P.faq.eyebrow} h={P.faq.h} items={P.faq.items} />
      <CTABand h={P.cta.h} sub={P.cta.sub} ctaLabel={P.cta.cta} ctaHref="#apply" />
    </>
  );
}

function ProsApp() {
  return <SitePage ctaHref="#apply" ctaLabel={(window.STRINGS[detectLang()] || window.STRINGS.en).pros.hero.cta}>
    <ProsPage />
  </SitePage>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<ProsApp />);
