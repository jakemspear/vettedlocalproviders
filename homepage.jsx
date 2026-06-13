/* homepage.jsx — brand homepage app. Loads after ui.jsx + strings. */
const { useState: useStateH, useEffect: useEffectH } = React;

const FUNNEL_URL = "roofing-inspection.html";
const CITY_PAGES = { Mesa: "Roofing in Mesa.html", Gilbert: "Roofing in Gilbert.html", Chandler: "Roofing in Chandler.html" };
const WAITLIST_PAGE = "join-the-waitlist.html";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo(0, y);
}

function homepageServiceHref(service, lang) {
  if (!service) return "#";
  if (service.id === "roofing") return service.page || "#";
  const href = new URL(WAITLIST_PAGE, window.location.href);
  href.searchParams.set("service", service.id);
  href.searchParams.set("lang", lang || "en");
  return `${href.pathname}${href.search}`;
}

function saveVCardHome() {
  const a = document.createElement("a");
  a.href = "casa-concierge.vcf";
  a.download = "casa-concierge.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function Header({ scrolled }) {
  const T = useT(); const H = T.home;
  const [lang, setLang] = useLang();
  const [open, setOpen] = useStateH(false);
  const nav = [
    { k: "services", to: "services" }, { k: "howWeVet", to: "vetted" },
    { k: "areas", to: "areas" }, { k: "reviews", to: "proof" }, { k: "about", to: "about" },
  ];
  const go = (id) => { setOpen(false); scrollToId(id); };
  return (
    <header className={`hp-header${scrolled ? " solid" : ""}`}>
      <div className="hp-header-in">
        <a className="hp-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>
          <span className="hp-logo-mark"><Ico name="ph-house-line" weight="fill" /></span>
          <span className="hp-logo-txt">Casa Concierge</span>
        </a>
        <nav className="hp-nav">
          {nav.map((n) => <button key={n.k} className="hp-nav-link" onClick={() => go(n.to)}>{H.nav[n.k]}</button>)}
          <a className="hp-nav-link" href="For Pros.html">{H.nav.forPros}</a>
        </nav>
        <div className="hp-header-actions">
          <button className="lang-toggle hp-lang" onClick={() => setLang(lang === "en" ? "es" : "en")}>
            <Ico name="ph-globe" weight="bold" /> {T.otherLang}
          </button>
          <button className="btn btn-gold cta hp-quote" onClick={() => go("services")}>{H.nav.quote}</button>
          <button className="hp-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <Ico name={open ? "ph-x" : "ph-list"} weight="bold" />
          </button>
        </div>
      </div>
      {open && (
        <div className="hp-mobile-menu">
          {nav.map((n) => <button key={n.k} className="hp-mobile-link" onClick={() => go(n.to)}>{H.nav[n.k]}</button>)}
          <a className="hp-mobile-link" href="For Pros.html">{H.nav.forPros}</a>
          <button className="btn btn-gold cta" onClick={() => go("services")}>{H.nav.quote}</button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const T = useT(); const H = T.home; const motion = useMotion();
  return (
    <header className="hp-hero">
      <div className="hero-media"><div className="hero-scrim" /></div>
      <div className={`hp-hero-content${motion ? " anim" : ""}`}>
        <div className="eyebrow on-dark">{H.hero.eyebrow}</div>
        <h1 className="display hp-hero-h">{H.hero.h}</h1>
        <p className="hp-hero-sub">{H.hero.sub}</p>
        <div className="hp-hero-cta">
          <button className="btn btn-gold cta" onClick={() => scrollToId("services")}>{H.hero.ctaPrimary} <Ico name="ph-arrow-down" weight="bold" className="cta-arrow" /></button>
          <button className="btn btn-ghost-light" onClick={() => scrollToId("deals")}>{H.hero.ctaSecondary}</button>
        </div>
      </div>
    </header>
  );
}

function TrustBar() {
  const T = useT();
  return (
    <div className="trustbar">
      {META.trust.map((it) => (
        <span className={`chip${it.spam ? " spam" : ""}`} key={it.id}>
          <Ico name={it.icon} weight={it.spam ? "fill" : undefined} />
          <span className="lbl-full">{T.trust[it.id]}</span><span className="lbl-short">{T.trust[it.id + "Short"]}</span>
        </span>
      ))}
    </div>
  );
}

function ServiceCard({ s }) {
  const T = useT(); const H = T.home;
  const [lang] = useLang();
  const href = homepageServiceHref(s, lang);
  const act = () => { window.location.href = href; };
  const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } };
  return (
    <div className="svc-card" role="button" tabIndex={0} onClick={act} onKeyDown={onKey}>
      <div className="svc-top">
        <div className="svc-ico"><Ico name={s.icon} weight="duotone" /></div>
      </div>
      <div className="svc-eyebrow">{s.eyebrow}</div>
      <div className="svc-name">{s.name}</div>
      <div className="svc-desc">{s.desc}</div>
      <div className="svc-go">{H.getStarted} <Ico name="ph-arrow-right" weight="bold" /></div>
    </div>
  );
}

function MoreServices() {
  const T = useT(); const H = T.home;
  const [lang] = useLang();
  const [open, setOpen] = useStateH(false);
  const all = H.moreServices || [];
  const initial = all.slice(0, 8);
  const extra = all.slice(8);
  return (
    <div className="hp-more">
      <div className="hp-more-head">{H.moreH}</div>
      <div className="hp-chips">
        {initial.map((m) => (
          <a key={m.id} className="hp-chip" href={homepageServiceHref(m, lang)}><Ico name={m.icon} weight="bold" /> <span>{m.name}</span></a>
        ))}
      </div>
      {extra.length > 0 && (
        <React.Fragment>
          <div className={`hp-chips-extra${open ? " open" : ""}`} aria-hidden={!open}>
            <div className="hp-chips-clip">
              <div className="hp-chips-pad">
                {extra.map((m) => (
                  <a key={m.id} className="hp-chip" href={homepageServiceHref(m, lang)} tabIndex={open ? 0 : -1}><Ico name={m.icon} weight="bold" /> <span>{m.name}</span></a>
                ))}
              </div>
            </div>
          </div>
          <button className="hp-more-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? H.moreHide : H.moreShow} <Ico name={open ? "ph-caret-up" : "ph-caret-down"} weight="bold" />
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

function Services() {
  const T = useT(); const H = T.home;
  return (
    <section className="section hp-services" id="services">
      <div className="hp-sec-head">
        <div className="eyebrow">{H.nav.services}</div>
        <h2 className="display sec-h2">{H.servicesH}</h2>
        <p className="hp-sec-sub">{H.servicesSub}</p>
      </div>
      <div className="svc-grid">{H.services.map((s) => <ServiceCard key={s.id} s={s} />)}</div>
      <MoreServices />
    </section>
  );
}

function VettedBothWays() {
  const T = useT(); const x = T.exclus;
  return (
    <section className="section band-tint hp-vetted" id="vetted">
      <div className="vetted-bare">
        <h2 className="display sec-h2">{x.vettedH}</h2>
        <p className="vetted-sub">{x.vettedSub}</p>
        <div className="vetted-cols">
          <div className="vetted-col">
            <div className="vetted-col-h"><Ico name="ph-seal-check" weight="fill" /> {x.prosH}</div>
            <ul>{x.pros.map((p) => <li key={p}><Ico name="ph-check" weight="bold" /> {p}</li>)}</ul>
          </div>
          <div className="vetted-col">
            <div className="vetted-col-h"><Ico name="ph-house-line" weight="fill" /> {x.askH}</div>
            <ul>{x.ask.map((p) => <li key={p}><Ico name="ph-check" weight="bold" /> {p}</li>)}</ul>
          </div>
        </div>
        <p className="vetted-closer">{x.closer}</p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const T = useT(); const H = T.home;
  return (
    <section className="section">
      <div className="hp-sec-head"><div className="eyebrow">{H.how.eyebrow}</div><h2 className="display sec-h2">{H.how.h}</h2></div>
      <div className="hp-how-grid">
        {H.how.steps.map((s, i) => (
          <div key={i} className="hp-how-step">
            <div className="hp-how-ico"><Ico name={s.icon} weight="duotone" /></div>
            <div className="hp-how-n">{i + 1}</div>
            <div className="step-head">{s.head}</div>
            <div className="step-sub">{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  const T = useT();
  return (
    <section className="section pine" id="proof">
      <div className="stats">
        {META.stats.map((s) => <div key={s.id} className="stat"><div className="stat-n"><CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} /></div><div className="stat-l">{T.stats[s.id]}</div></div>)}
      </div>
      <div className="proof-list hp-proof-list">
        {T.testimonials.map((t) => (
          <figure key={t.name} className="proof-card">
            <Ico name="ph-quotes" weight="fill" className="proof-mark" />
            <blockquote>{t.quote}</blockquote>
            <figcaption><span className="proof-name">{t.name}</span><span className="proof-city">{t.city}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ServiceAreas() {
  const T = useT(); const H = T.home;
  return (
    <section className="section hp-areas" id="areas">
      <div className="hp-sec-head"><div className="eyebrow">{H.areas.eyebrow}</div><h2 className="display sec-h2">{H.areas.h}</h2><p className="hp-sec-sub">{H.areas.sub}</p></div>
      <div className="hp-cities">
        {H.areas.cities.map((c) => <a key={c} className="hp-city" href={CITY_PAGES[c] || "#"} onClick={CITY_PAGES[c] ? undefined : (e) => e.preventDefault()}><Ico name="ph-map-pin" weight="fill" /> {c}</a>)}
      </div>
    </section>
  );
}

function Deals() {
  const T = useT(); const H = T.home;
  const [val, setVal] = useStateH(""); const [done, setDone] = useStateH(false);
  const ok = /\S+@\S+\.\S+/.test(val);
  return (
    <section className="section band-pine hp-deals" id="deals">
      <div className="hp-deals-bare">
        <div className="hp-deals-ico"><Ico name="ph-tag" weight="duotone" /></div>
        <div className="eyebrow on-dark">{H.deals.eyebrow}</div>
        <h2 className="display sec-h2 hp-deals-h">{H.deals.h}</h2>
        <p className="hp-deals-sub">{H.deals.sub}</p>
        {done ? (
          <div className="hp-deals-done"><Ico name="ph-check-circle" weight="fill" /> {H.deals.done}</div>
        ) : (
          <form className="hp-deals-form" onSubmit={(e) => { e.preventDefault(); if (ok) setDone(true); }}>
            <div className="hp-deals-row">
              <input type="email" inputMode="email" className="input" placeholder={H.deals.emailPlaceholder} value={val} onChange={(e) => setVal(e.target.value)} />
              <button type="submit" className="btn btn-gold cta" disabled={!ok}>{H.deals.btn} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></button>
            </div>
          </form>
        )}
        <button className="hp-deals-save" onClick={saveVCardHome}><Ico name="ph-address-book" weight="bold" /> {H.deals.save}</button>
      </div>
    </section>
  );
}

function FAQ() {
  const T = useT(); const H = T.home;
  const [open, setOpen] = useStateH(0);
  return (
    <section className="section hp-faq">
      <div className="hp-sec-head"><div className="eyebrow">{H.faq.eyebrow}</div><h2 className="display sec-h2">{H.faq.h}</h2></div>
      <div className="hp-faq-list">
        {H.faq.items.map((f, i) => (
          <div key={i} className={`hp-faq-item${open === i ? " open" : ""}`}>
            <button className="hp-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span><Ico name={open === i ? "ph-minus" : "ph-plus"} weight="bold" />
            </button>
            {open === i && <p className="hp-faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const T = useT(); const H = T.home; const f = H.footer; const L = f.links;
  const [lang] = useLang();
  return (
    <footer className="hp-footer">
      <div className="hp-footer-in">
        <div className="hp-footer-brand">
          <div className="hp-logo-txt" style={{ color: "#fff" }}>Casa Concierge</div>
          <p className="hp-footer-dba">{LEGAL_DBA}</p>
          <p className="hp-footer-tag">{f.tagline}</p>
          <div className="hp-footer-roc"><Ico name="ph-seal-check" weight="fill" /> {f.roc}</div>
        </div>
        <div className="hp-footer-cols">
          <div className="hp-footer-col"><div className="hp-footer-h">{f.company}</div><a href="#vetted">{L.howWeVet}</a><a href={`mailto:${EMAIL}`}>{L.contact}</a><a href="#proof">{L.reviews}</a></div>
          <div className="hp-footer-col"><div className="hp-footer-h">{f.servicesCol}</div>{H.services.slice(0, 6).map((s) => <a key={s.id} href={homepageServiceHref(s, lang)}>{s.name}</a>)}</div>
          <div className="hp-footer-col"><div className="hp-footer-h">{f.areasCol}</div>{H.areas.cities.slice(0, 6).map((c) => <a key={c} href={CITY_PAGES[c] || "#"} onClick={CITY_PAGES[c] ? undefined : (e) => e.preventDefault()}>{c}</a>)}</div>
          <div className="hp-footer-col"><div className="hp-footer-h">{f.legal}</div><a href={PRIVACY_PAGE}>{L.privacy}</a><a href={TERMS_PAGE}>{L.terms}</a><a href={`${TERMS_PAGE}#sms-messaging`}>{L.tcpa}</a><a href={`${PRIVACY_PAGE}#cookies`}>{L.cookies}</a><a href={`${TERMS_PAGE}#accessibility`}>{L.accessibility}</a><a href={`${TERMS_PAGE}#service-disclaimer`}>{L.guarantee}</a></div>
        </div>
      </div>
      <div className="hp-footer-fine"><span>{f.addr} · {PHONE} · {f.contact}</span><span>{f.fine}</span></div>
      <div className="hp-footer-disclaimer">
        <span className="hp-footer-legal-note"><Ico name="ph-scales" weight="bold" /> {f.disclaimerNote}</span>
        <p>{f.disclaimer}</p>
      </div>
    </footer>
  );
}

function Home() {
  const [lang, setLangState] = useStateH(detectLang());
  const [scrolled, setScrolled] = useStateH(false);
  const T = window.STRINGS[lang] || window.STRINGS.en;
  const setLang = (l) => { setLangState(l); persistLang(l); document.documentElement.lang = l; };
  useEffectH(() => { document.documentElement.lang = lang; }, [lang]);
  useEffectH(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <LangCtx.Provider value={{ lang, t: T, setLang }}>
      <MotionCtx.Provider value={true}>
        <Header scrolled={scrolled} />
        <div className="above-fold">
          <Hero />
          <TrustBar />
        </div>
        <Services />
        <VettedBothWays />
        <HowItWorks />
        <Proof />
        <ServiceAreas />
        <Deals />
        <FAQ />
        <Footer />
      </MotionCtx.Provider>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
