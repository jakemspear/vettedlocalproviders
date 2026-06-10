/* landing.jsx — screen 1. Exported to window. */
const { useState: useStateL, useEffect: useEffectL } = React;

function LangToggle() {
  const [lang, setLang] = useLang();
  const T = useT();
  return (
    <button className="lang-toggle" onClick={() => setLang(lang === "en" ? "es" : "en")}
      aria-label={T.otherLang}>
      <Ico name="ph-globe" weight="bold" /> {T.otherLang}
    </button>
  );
}

function HeroMedia() {
  const T = useT();
  return (
    <div className="hero-media" role="img" aria-label="Arizona home, placeholder image">
      <span className="hero-media-tag">{T.hero.photoTag}</span>
      <div className="hero-scrim" />
    </div>
  );
}

function Hero({ offer, onStart }) {
  const motion = useMotion();
  const T = useT();
  return (
    <header className="hero">
      <HeroMedia />
      <LangToggle />
      <div className={`hero-content${motion ? " anim" : ""}`}>
        <div className="eyebrow on-dark">{offer.eyebrow}</div>
        <h1 className="display hero-h1">{offer.headline}</h1>
        <p className="hero-sub">{offer.subhead}</p>
        <button className="btn btn-gold cta" onClick={onStart}>
          {offer.cta} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" />
        </button>
        <p className="hero-micro"><Ico name="ph-clock" /> {T.hero.micro}</p>
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
          <span className="lbl-full">{T.trust[it.id]}</span>
          <span className="lbl-short">{T.trust[it.id + "Short"]}</span>
        </span>
      ))}
    </div>
  );
}

function Exclusivity() {
  const T = useT();
  const x = T.exclus;
  return (
    <>
      <section className="section band-pine deals-band">
        <div className="deals-grid">
          <div className="deals-main">
            <Ico name="ph-tag" weight="duotone" className="deals-ico" />
            <h2 className="display sec-h2">{x.dealsH}</h2>
            <p className="deals-body">{x.dealsBody}</p>
          </div>
          <aside className="deals-aside">
            <div className="deals-examples">
              <div className="deals-examples-h">{x.dealsExamplesH}</div>
              {x.dealsExamples.map((d) => (
                <div className="deal-ex" key={d.label}>
                  <div className="deal-ex-ico"><Ico name={d.icon} weight="duotone" /></div>
                  <div className="deal-ex-body">
                    <div className="deal-ex-label">{d.label}</div>
                    <div className="deal-ex-sub">{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section band-tint vetted-band">
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
      </section>
    </>
  );
}

function HowItWorks() {
  const motion = useMotion();
  const T = useT();
  const [ref, seen] = useInView({ threshold: 0.25 });
  return (
    <section className="section" ref={ref}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>{T.how.eyebrow}</div>
      <h2 className="display sec-h2">{T.how.h}</h2>
      <div className={`steps${motion ? " stagger" : ""}${seen || !motion ? " in" : ""}`}>
        {META.steps.map((s, i) => (
          <div key={s.id} className="step-row" style={{ "--i": i }}>
            <div className="step-num"><span>{s.n}</span></div>
            <div className="step-line" />
            <div className="step-body">
              <div className="step-ico"><Ico name={s.icon} /></div>
              <div>
                <div className="step-head">{T.how.steps[s.id].head}</div>
                <div className="step-sub">{T.how.steps[s.id].body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsStrip() {
  const T = useT();
  return (
    <div className="stats">
      {META.stats.map((s) => (
        <div key={s.id} className="stat">
          <div className="stat-n"><CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} /></div>
          <div className="stat-l">{T.stats[s.id]}</div>
        </div>
      ))}
    </div>
  );
}

function Proof() {
  const T = useT();
  return (
    <section className="section pine">
      <StatsStrip />
      <div className="proof-list">
        {T.testimonials.map((t) => (
          <figure key={t.name} className="proof-card">
            <Ico name="ph-quotes" weight="fill" className="proof-mark" />
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className="proof-name">{t.name}</span>
              <span className="proof-city">{t.city}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Concierge() {
  const T = useT();
  return (
    <section className="section concierge">
      <div className="concierge-grid">
        <div className="concierge-main">
          <Ico name="ph-medal" weight="duotone" className="concierge-ico" />
          <h2 className="display sec-h2">{T.concierge.h}</h2>
          <p className="concierge-body">{T.concierge.body}</p>
        </div>
        <aside className="concierge-aside">
          <div className="concierge-card">
            <div className="concierge-card-h"><Ico name="ph-shield-check" weight="fill" /> {T.concierge.cardH}</div>
            <div className="concierge-points">
              {T.concierge.points.map((p) => (
                <div className="cp" key={p}><Ico name="ph-check-circle" weight="fill" /> {p}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Footer() {
  const T = useT();
  return (
    <footer className="footer">
      <div className="footer-brand">{BRAND}</div>
      <div className="footer-meta">{T.footer.meta}</div>
      <div className="footer-links">
        <a href="#privacy">{T.footer.privacy}</a>
        <span>·</span>
        <a href="#terms">{T.footer.terms}</a>
        <span>·</span>
        <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
      </div>
      <div className="footer-fine">{T.footer.fine}</div>
      <div className="footer-disclaimer">
        <span className="footer-legal-note"><Ico name="ph-scales" weight="bold" /> {T.footer.disclaimerNote}</span>
        <p>{T.footer.disclaimerShort}</p>
      </div>
    </footer>
  );
}

function Landing({ offer, onStart }) {
  const T = useT();
  const [sticky, setSticky] = useStateL(false);

  useEffectL(() => {
    const onScroll = () => setSticky(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="screen-enter landing">
      <div className="above-fold">
        <Hero offer={offer} onStart={onStart} />
        <TrustBar />
      </div>
      <div className="desk-wrap">
        <HowItWorks />
        <Exclusivity />
      </div>
      <div className="divider" />
      <Proof />
      <Concierge />
      <p className="brand-seed">{T.exclus.brandSeed}</p>
      <Footer />

      {sticky && (
        <div className="sticky-cta">
          <div className="sticky-inner">
            <button className="btn btn-gold cta" onClick={onStart}>
              {offer.cta} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Landing });
