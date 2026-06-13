/* home3.jsx - Arizona-local redesign MOCK (de-Makase'd direction), served at /home3.
   Standalone prototype. Reuses ui.jsx primitives, i18n.jsx constants, and the
   cc- section styles from concierge.css; new pieces live under home3.css (h3-).

   What's intentionally different from the live homepage:
   - Warm Phoenix-local hero (no dark slab, no rotating trade word)
   - One-field ADDRESS GATE on the CTAs: in-area -> chat w/ address pre-filled,
     out-of-area -> waitlist (so we never pay an agent to talk to who we can't serve)
   - "Built for Arizona homes" trust band (local moat Makase can't copy)
   - A text->done timeline replacing the iMessage chat mockup */

const TEL_HREF = `tel:${PHONE_TEL}`;

/* Greater Phoenix ZIP prefixes we currently serve (mock list) */
const METRO_ZIP3 = new Set(["850", "851", "852", "853", "855"]);
const METRO_CITIES = [
  "phoenix", "mesa", "tempe", "chandler", "gilbert", "scottsdale", "glendale",
  "peoria", "surprise", "goodyear", "avondale", "queen creek", "buckeye",
  "fountain hills", "paradise valley", "apache junction", "maricopa", "sun city",
  "cave creek", "litchfield", "el mirage", "tolleson", "ahwatukee",
];
function findZip(s) { const m = (s || "").match(/\b(\d{5})\b/); return m ? m[1] : null; }
function inServiceArea(s) {
  const zip = findZip(s);
  if (zip) return METRO_ZIP3.has(zip.slice(0, 3));
  const t = (s || "").toLowerCase();
  return METRO_CITIES.some((c) => t.includes(c));
}
function smsWithAddress(addr) {
  const body = encodeURIComponent(`Hi Casa Concierge! My home is at ${addr}. I need help with `);
  return `sms:${PHONE_TEL}?&body=${body}`;
}

/* ── desert horizon art (subtle, no photo dependency) ───────────── */
function DesertArt() {
  return (
    <svg className="h3-hero-art" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 150 Q360 110 720 140 T1440 130 V220 H0 Z" fill="#E6C99B" opacity=".55" />
      <path d="M0 178 Q420 150 860 172 T1440 168 V220 H0 Z" fill="#D9A86F" opacity=".5" />
      {/* saguaros */}
      <g fill="#B9764A" opacity=".4">
        <path d="M148 220 V120 a10 10 0 0 1 20 0 v100 Z M158 150 q-22 2-22-22 0-14 8-14 6 0 6 12 0 8 8 8 Z M158 138 q22 2 22-26 0-14-8-14-6 0-6 12 0 12 8 12 Z" />
        <path d="M1238 220 V140 a9 9 0 0 1 18 0 v80 Z M1247 166 q-18 2-18-18 0-12 7-12 5 0 5 10 0 7 6 7 Z" />
      </g>
    </svg>
  );
}

/* ── one-field address gate ─────────────────────────────────────── */
function AddressGate({ mode, onClose }) {
  const [addr, setAddr] = useState("");
  const [stage, setStage] = useState("ask");   // ask | out
  const [bad, setBad] = useState(false);
  const verb = mode === "call" ? "call" : "text";
  const submit = () => {
    if (!addr.trim()) { setBad(true); return; }
    if (inServiceArea(addr)) {
      window.location.href = mode === "call" ? TEL_HREF : smsWithAddress(addr.trim());
      onClose();
    } else {
      setStage("out");
    }
  };
  return (
    <div className="h3-gate-veil" onClick={onClose}>
      <div className="h3-gate" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {stage === "ask" ? (
          <React.Fragment>
            <div className="h3-gate-top">
              <span className="h3-gate-ico"><Ico name="ph-map-pin" weight="duotone" /></span>
              <button className="h3-gate-x" onClick={onClose} aria-label="Close"><Ico name="ph-x" weight="bold" /></button>
            </div>
            <div className="h3-gate-h">First, where's your home?</div>
            <p className="h3-gate-sub">We're serving Greater Phoenix right now. Drop your address or ZIP and we'll start the {verb} with it already in hand, no thumb-typing it later.</p>
            <div className="h3-gate-field">
              <input
                className={`h3-gate-input${bad ? " bad" : ""}`}
                type="text"
                inputMode="text"
                autoFocus
                placeholder="Home address or ZIP"
                value={addr}
                onChange={(e) => { setAddr(e.target.value); setBad(false); }}
                onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              />
              <button className="btn btn-clay cta" onClick={submit}>
                {mode === "call" ? "Call Your Concierge" : "Text Your Concierge"} <Ico name={mode === "call" ? "ph-phone" : "ph-chat-circle-dots"} weight="bold" />
              </button>
            </div>
            <p className="h3-gate-fine">
              By continuing you agree to receive messages about your request and to our{" "}
              <a href={TERMS_PAGE}>Terms</a> and <a href={PRIVACY_PAGE}>Privacy Policy</a>. Msg &amp; data rates may apply · Reply STOP to opt out.
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="h3-gate-top">
              <span className="h3-gate-out-ico"><Ico name="ph-hourglass-medium" weight="duotone" /></span>
              <button className="h3-gate-x" onClick={onClose} aria-label="Close"><Ico name="ph-x" weight="bold" /></button>
            </div>
            <div className="h3-gate-h">We're not in your area yet</div>
            <p className="h3-gate-sub">Casa Concierge is live across Greater Phoenix and expanding fast. Join the waitlist and you'll be first to know the day we reach your neighborhood.</p>
            <a className="btn btn-clay cta" href="join-the-waitlist.html">Join the waitlist <Ico name="ph-arrow-right" weight="bold" /></a>
            <button className="h3-gate-back" onClick={() => setStage("ask")}><Ico name="ph-arrow-left" weight="bold" /> Try a different address</button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

/* ── header ──────────────────────────────────────────────────────── */
function Header({ scrolled, onCta }) {
  return (
    <header className={`h3-header${scrolled ? " solid" : ""}`}>
      <div className="h3-header-in">
        <a className="h3-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="h3-logo-mark"><Ico name="ph-house-line" weight="fill" /></span>
          <span className="h3-logo-txt">Casa Concierge</span>
        </a>
        <button className="btn btn-clay cta h3-header-cta" onClick={() => onCta("text")}>Text Your Concierge <Ico name="ph-chat-circle-dots" weight="bold" /></button>
        <button className="h3-burger" onClick={() => onCta("text")} aria-label="Text your concierge"><Ico name="ph-chat-circle-dots" weight="bold" /></button>
      </div>
    </header>
  );
}

/* ── hero ────────────────────────────────────────────────────────── */
function Hero({ onCta }) {
  const micro = [
    { icon: "ph-map-pin", t: "Serving Greater Phoenix" },
    { icon: "ph-device-mobile", t: "No app required" },
    { icon: "ph-hand-coins", t: "Free to use" },
  ];
  return (
    <header className="h3-hero">
      <div className="h3-hero-bg" aria-hidden="true" />
      <DesertArt />
      <div className="h3-hero-in">
        <div className="h3-eyebrow"><Ico name="ph-sun-horizon" weight="fill" /> Phoenix's home concierge</div>
        <h1 className="h3-hero-h">
          Your whole home,<br />
          handled by <span className="h3-accent">one text.</span>
        </h1>
        <p className="h3-hero-sub">
          Casa Concierge is your local concierge for every home need across the Valley. We remind you
          what the house needs, line up vetted Phoenix pros, and push every project to done.
          <strong> And it's free, forever.</strong>
        </p>
        <div className="h3-hero-cta">
          <button className="btn btn-clay cta" onClick={() => onCta("text")}>Text Your Concierge <Ico name="ph-chat-circle-dots" weight="bold" /></button>
          <button className="btn btn-outline cta" onClick={() => onCta("call")}>Call Your Concierge <Ico name="ph-phone" weight="bold" /></button>
        </div>
        <p className="h3-hero-consent">
          By texting or calling, you agree to receive messages about your request and to our{" "}
          <a href={TERMS_PAGE}>Terms of Service</a> and <a href={PRIVACY_PAGE}>Privacy Policy</a>.
        </p>
        <div className="h3-hero-micro">
          {micro.map((m) => <span key={m.t} className="h3-micro"><Ico name={m.icon} weight="bold" /> {m.t}</span>)}
        </div>
      </div>
    </header>
  );
}

/* ── built for Arizona homes (local moat) ───────────────────────── */
function BuiltForArizona() {
  const items = [
    { icon: "ph-thermometer-hot", h: "115° summers", b: "AC tune-ups before the heat hits and a fast pro when it quits at the worst possible time." },
    { icon: "ph-cloud-lightning", h: "Monsoon season", b: "Roof checks, drainage, and storm cleanup lined up before and after the rain rolls in." },
    { icon: "ph-wind", h: "Dust & haboobs", b: "Filter swaps and pool care timed to the Valley's dust, so the house keeps running clean." },
    { icon: "ph-swimming-pool", h: "Pools & desert yards", b: "Pool techs, drip systems, and low-water landscaping from pros who know desert homes." },
  ];
  return (
    <section className="section h3-az">
      <div className="cc-head">
        <div className="h3-eyebrow"><Ico name="ph-cactus" weight="fill" /> Local, not nationwide</div>
        <h2 className="h3-az-h">Built for the way Arizona homes actually live.</h2>
        <p className="h3-az-sub">We're not a national app pretending to know your house. We're a Valley concierge that plans around our seasons, and works with pros who do too.</p>
      </div>
      <div className="h3-az-grid">
        {items.map((x) => (
          <div key={x.h} className="h3-az-card">
            <div className="h3-az-ico"><Ico name={x.icon} weight="duotone" /></div>
            <div className="h3-az-ch">{x.h}</div>
            <p className="h3-az-cb">{x.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── text → done timeline (replaces the chat mockup) ────────────── */
function FlowTimeline({ onCta }) {
  const steps = [
    { time: "9:02 PM", who: "You", msg: <span>"AC's blowing warm and it's 108° out 😩"</span> },
    { time: "9:07 PM", who: "Your concierge", msg: <span>On it. <strong>James</strong>, a licensed Valley HVAC pro, can be there 8–10 AM. Want me to book him?</span> },
    { time: "9:08 PM", who: "You", msg: <span>"Yes please."</span> },
    { time: "Next morning", who: "Done", msg: <span>Fixed, and you approved the price before he started. Filter's on us next month.</span> },
  ];
  return (
    <section className="section">
      <div className="cc-head cc-head-center">
        <div className="eyebrow">From text to done</div>
        <h2 className="display sec-h2">One thread. We carry it the rest of the way.</h2>
        <p className="cc-sub">No app, no portal, no phone tree. Just a text, and a concierge who takes it from there.</p>
      </div>
      <div className="h3-flow-wrap">
        <div className="h3-flow">
          {steps.map((s, i) => (
            <div key={i} className="h3-step">
              <div className="h3-step-rail">
                <span className="h3-step-time">{s.time}</span>
                <span className="h3-step-dot" />
                <span className="h3-step-line" />
              </div>
              <div className="h3-step-card">
                <div className="h3-step-who">{s.who}</div>
                <p className="h3-step-msg">{s.msg}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cc-demo-cta" style={{ marginTop: 28 }}>
          <button className="btn btn-clay cta" onClick={() => onCta("text")}>Start your own thread <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></button>
        </div>
      </div>
    </section>
  );
}

/* ── services (reused look, warmed by tokens) ───────────────────── */
function Services() {
  const svc = [
    { icon: "ph-wind", n: "AC & HVAC" }, { icon: "ph-house-line", n: "Roofing" },
    { icon: "ph-wrench", n: "Plumbing" }, { icon: "ph-lightning", n: "Electrical" },
    { icon: "ph-swimming-pool", n: "Pool" }, { icon: "ph-plant", n: "Landscaping" },
    { icon: "ph-broom", n: "Cleaning" }, { icon: "ph-bug-beetle", n: "Pest Control" },
    { icon: "ph-paint-roller", n: "Painting" }, { icon: "ph-hammer", n: "Handyman" },
    { icon: "ph-sun", n: "Solar" }, { icon: "ph-grid-nine", n: "Windows" },
    { icon: "ph-cooking-pot", n: "Remodels" }, { icon: "ph-key", n: "Locksmith" },
    { icon: "ph-squares-four", n: "Flooring" }, { icon: "ph-door", n: "Garage Doors" },
  ];
  return (
    <section className="section cc-services">
      <div className="cc-head">
        <div className="eyebrow">Whatever the house needs</div>
        <h2 className="display sec-h2">From a quick fix to a full remodel.</h2>
        <p className="cc-sub">One contact for the whole house, with vetted Valley pros for each job.</p>
      </div>
      <div className="cc-svc-grid">
        {svc.map((s) => (
          <div key={s.n} className="cc-svc">
            <div className="cc-svc-ico"><Ico name={s.icon} weight="duotone" /></div>
            <span>{s.n}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── testimonials (already AZ; reused) ──────────────────────────── */
function Testimonials() {
  const t = [
    { quote: "I texted at 9pm about a leak and woke up to an appointment already booked. I didn't make a single call.", name: "Jennifer M.", city: "Gilbert, AZ" },
    { quote: "They sent me a $14 part and a video instead of a service call. That's when I trusted them.", name: "David & Lisa P.", city: "Mesa, AZ" },
    { quote: "I just text one person now and it gets handled. Easiest part of owning a home in the Valley.", name: "Michael T.", city: "Chandler, AZ" },
  ];
  return (
    <section className="section cc-reviews">
      <div className="cc-head cc-head-center">
        <div className="eyebrow">Phoenix homeowners love it</div>
        <h2 className="display sec-h2">One text away from done.</h2>
      </div>
      <div className="cc-rev-grid">
        {t.map((x) => (
          <figure key={x.name} className="cc-rev">
            <Stars n={5} />
            <blockquote>{x.quote}</blockquote>
            <figcaption><span className="cc-rev-name">{x.name}</span><span className="cc-rev-city">{x.city}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ── final CTA ──────────────────────────────────────────────────── */
function FinalCTA({ onCta }) {
  return (
    <section className="section band-pine cc-cta">
      <div className="cc-cta-in">
        <h2 className="display sec-h2">Your Valley home deserves better <span className="cc-gold">than a search bar.</span></h2>
        <p className="cc-cta-sub">Next time something breaks, needs fixing, or needs doing, just text. We'll take it from there.</p>
        <button className="btn btn-gold cta cc-cta-btn" onClick={() => onCta("text")}>Text Your Concierge <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></button>
        <div className="cc-cta-fine"><Ico name="ph-map-pin" weight="bold" /> Greater Phoenix · Available to help 24/7 · Free to use</div>
      </div>
    </section>
  );
}

/* ── footer (lite) ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="cc-footer">
      <div className="cc-footer-fine">
        <span>{ADDRESS} · {PHONE} · {EMAIL}</span>
        <span>Serving Greater Phoenix. We are a referral service, not a licensed contractor. © 2026 Casa Concierge.</span>
      </div>
    </footer>
  );
}

/* ── mobile sticky bar ──────────────────────────────────────────── */
function StickyBar({ show, onCta }) {
  return (
    <div className={`cc-mobile-bar${show ? " show" : ""}`}>
      <button className="btn btn-gold cta" onClick={() => onCta("text")}>Text Your Concierge <Ico name="ph-chat-circle-dots" weight="bold" /></button>
      <button className="btn btn-ghost cta" onClick={() => onCta("call")}>Call Your Concierge <Ico name="ph-phone" weight="bold" /></button>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────── */
function Home3Page() {
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [gate, setGate] = useState(null);   // null | 'text' | 'call'
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowBar(y > window.innerHeight * 0.7);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const openGate = (mode) => setGate(mode);
  return (
    <MotionCtx.Provider value={true}>
      <div className="cc-page h3-page">
        <Header scrolled={scrolled} onCta={openGate} />
        <Hero onCta={openGate} />
        <BuiltForArizona />
        <FlowTimeline onCta={openGate} />
        <Services />
        <Testimonials />
        <FinalCTA onCta={openGate} />
        <Footer />
        <StickyBar show={showBar} onCta={openGate} />
        {gate && <AddressGate mode={gate} onClose={() => setGate(null)} />}
      </div>
    </MotionCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Home3Page />);
