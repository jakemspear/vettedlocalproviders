/* site-chrome.jsx — shared header, footer, page shell, and reusable section
   blocks for the brand-hub / SEO pages. Loads after ui.jsx + strings-home. */
const { useState: useStateC, useEffect: useEffectC } = React;

const HOMEPAGE = "index.html";
const FUNNEL = "Vetted Home Professionals.html";
const PROS_PAGE = "For Pros.html";

function saveVCardSite() {
  const v = ["BEGIN:VCARD", "VERSION:3.0", "N:;Vetted Local Providers;;;", "FN:Vetted Local Providers",
    "ORG:Vetted Local Providers", `TEL;TYPE=CELL,VOICE:${PHONE_TEL}`, "EMAIL;TYPE=INTERNET:hello@vettedlocalproviders.com",
    "URL:https://vettedlocalproviders.com", "NOTE:Your Arizona home-service concierge. Reply STOP to opt out of texts.", "END:VCARD"].join("\r\n");
  const url = URL.createObjectURL(new Blob([v], { type: "text/vcard;charset=utf-8" }));
  const a = document.createElement("a"); a.href = url; a.download = "vetted-local-providers.vcf";
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* header: nav links route to the homepage sections; logo -> homepage */
function SiteHeader({ ctaHref, ctaLabel }) {
  const T = useT(); const H = T.home;
  const [lang, setLang] = useLang();
  const [open, setOpen] = useStateC(false);
  const [scrolled, setScrolled] = useStateC(false);
  useEffectC(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const nav = [
    { k: "services", href: `${HOMEPAGE}#services` }, { k: "howWeVet", href: `${HOMEPAGE}#vetted` },
    { k: "areas", href: `${HOMEPAGE}#areas` }, { k: "reviews", href: `${HOMEPAGE}#proof` }, { k: "about", href: `${HOMEPAGE}#about` },
  ];
  return (
    <header className={`hp-header solid${scrolled ? " deep" : ""}`}>
      <div className="hp-header-in">
        <a className="hp-logo" href={HOMEPAGE}>
          <span className="hp-logo-mark"><Ico name="ph-house-line" weight="fill" /></span>
          <span className="hp-logo-txt">Vetted Local Providers</span>
        </a>
        <nav className="hp-nav">
          {nav.map((n) => <a key={n.k} className="hp-nav-link" href={n.href}>{H.nav[n.k]}</a>)}
          <a className="hp-nav-link" href={PROS_PAGE}>{H.nav.forPros || "For pros"}</a>
        </nav>
        <div className="hp-header-actions">
          <button className="lang-toggle hp-lang" onClick={() => setLang(lang === "en" ? "es" : "en")}>
            <Ico name="ph-globe" weight="bold" /> {T.otherLang}
          </button>
          <a className="btn btn-gold cta hp-quote" href={ctaHref || FUNNEL}>{ctaLabel || H.nav.quote}</a>
          <button className="hp-burger" onClick={() => setOpen(!open)} aria-label="Menu"><Ico name={open ? "ph-x" : "ph-list"} weight="bold" /></button>
        </div>
      </div>
      {open && (
        <div className="hp-mobile-menu">
          {nav.map((n) => <a key={n.k} className="hp-mobile-link" href={n.href}>{H.nav[n.k]}</a>)}
          <a className="hp-mobile-link" href={PROS_PAGE}>{H.nav.forPros || "For pros"}</a>
          <a className="btn btn-gold cta" href={ctaHref || FUNNEL}>{ctaLabel || H.nav.quote}</a>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  const T = useT(); const H = T.home; const f = H.footer; const L = f.links;
  return (
    <footer className="sp-footer">
      <div className="sp-footer-in">
        <div className="sp-footer-top">
          <a className="sp-footer-brand" href={HOMEPAGE}>Vetted Local Providers</a>
          <nav className="sp-footer-links">
            <a href={`${HOMEPAGE}#about`}>{L.about}</a>
            <a href={PROS_PAGE}>{H.nav.forPros || "For pros"}</a>
            <a href="#" onClick={(e) => e.preventDefault()}>{L.privacy}</a>
            <a href="#" onClick={(e) => e.preventDefault()}>{L.terms}</a>
            <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
          </nav>
        </div>
        <p className="sp-footer-fine">{f.fine}</p>
        <div className="sp-footer-disclaimer">
          <div className="sp-footer-legal-note"><Ico name="ph-scales" weight="bold" /> {f.disclaimerNote}</div>
          <p>{f.disclaimerShort}</p>
        </div>
      </div>
    </footer>
  );
}

/* page shell: provides locale + motion context, header, footer */
function SitePage({ ctaHref, ctaLabel, children }) {
  const [lang, setLangState] = useStateC(detectLang());
  const T = window.STRINGS[lang] || window.STRINGS.en;
  const setLang = (l) => { setLangState(l); persistLang(l); document.documentElement.lang = l; };
  useEffectC(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <LangCtx.Provider value={{ lang, t: T, setLang }}>
      <MotionCtx.Provider value={true}>
        <SiteHeader ctaHref={ctaHref} ctaLabel={ctaLabel} />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </MotionCtx.Provider>
    </LangCtx.Provider>
  );
}

/* ---------- reusable section blocks ---------- */
function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <span key={i} className="crumb">
          {c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
          {i < items.length - 1 && <Ico name="ph-caret-right" weight="bold" />}
        </span>
      ))}
    </nav>
  );
}

function PageHero({ eyebrow, h, sub, ctaLabel, ctaHref, secondaryLabel, secondaryHref, crumbs }) {
  const motion = useMotion();
  const T = useT();
  return (
    <header className="sp-hero">
      <div className="hero-media"><span className="hero-media-tag">{T.hero.photoTag}</span><div className="hero-scrim" /></div>
      <div className={`sp-hero-content${motion ? " anim" : ""}`}>
        {crumbs && <Crumbs items={crumbs} />}
        <div className="eyebrow on-dark">{eyebrow}</div>
        <h1 className="display sp-hero-h">{h}</h1>
        <p className="sp-hero-sub">{sub}</p>
        <div className="sp-hero-cta">
          <a className="btn btn-gold cta" href={ctaHref || FUNNEL}>{ctaLabel} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></a>
          {secondaryLabel && <a className="btn btn-ghost-light" href={secondaryHref || "#body"}>{secondaryLabel}</a>}
        </div>
      </div>
    </header>
  );
}

function SectionHead({ eyebrow, h, sub, center }) {
  return (
    <div className={`hp-sec-head${center ? " center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="display sec-h2">{h}</h2>
      {sub && <p className="hp-sec-sub">{sub}</p>}
    </div>
  );
}

function Steps3({ eyebrow, h, steps }) {
  return (
    <section className="section">
      <SectionHead eyebrow={eyebrow} h={h} />
      <div className="hp-how-grid">
        {steps.map((s, i) => (
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

function FAQAccordion({ eyebrow, h, items }) {
  const [open, setOpen] = useStateC(0);
  return (
    <section className="section hp-faq">
      <SectionHead eyebrow={eyebrow} h={h} />
      <div className="hp-faq-list">
        {items.map((f, i) => (
          <div key={i} className={`hp-faq-item${open === i ? " open" : ""}`}>
            <button className="hp-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{f.q}</span><Ico name={open === i ? "ph-minus" : "ph-plus"} weight="bold" />
            </button>
            {open === i && <p className="hp-faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTABand({ h, sub, ctaLabel, ctaHref }) {
  return (
    <section className="section band-pine sp-ctaband">
      <div className="sp-ctaband-in">
        <h2 className="display sec-h2">{h}</h2>
        {sub && <p className="sp-ctaband-sub">{sub}</p>}
        <a className="btn btn-gold cta" href={ctaHref || FUNNEL}>{ctaLabel} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></a>
      </div>
    </section>
  );
}

/* published vetting rubric — the real standards, reused on /pros and service pages */
function VettedRubric({ eyebrow, h, sub, items }) {
  return (
    <section className="section band-tint">
      <SectionHead eyebrow={eyebrow} h={h} sub={sub} />
      <div className="rubric-grid">
        {items.map((it, i) => (
          <div key={i} className="rubric-card">
            <div className="rubric-ico"><Ico name={it.icon} weight="duotone" /></div>
            <div className="rubric-h">{it.h}</div>
            <div className="rubric-b">{it.b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Prose({ blocks }) {
  return (
    <div className="sp-prose">
      {blocks.map((b, i) => {
        if (b.h) return <h3 key={i} className="sp-prose-h">{b.h}</h3>;
        if (b.list) return <ul key={i} className="sp-prose-list">{b.list.map((li, j) => <li key={j}><Ico name="ph-check" weight="bold" /> {li}</li>)}</ul>;
        return <p key={i} className="sp-prose-p">{b.p}</p>;
      })}
    </div>
  );
}

Object.assign(window, {
  HOMEPAGE, FUNNEL, PROS_PAGE, saveVCardSite,
  SiteHeader, SiteFooter, SitePage, Crumbs, PageHero, SectionHead, Steps3, FAQAccordion, CTABand, VettedRubric, Prose,
});
