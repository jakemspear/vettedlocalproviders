/* concierge.jsx - Home Concierge pitch page (Makase-style).
   Standalone marketing page: pitches the concierge, does NOT run the funnel.
   Reuses brand tokens (styles.css), primitives (ui.jsx), constants (i18n.jsx). */

/* React hooks are already destructured globally in ui.jsx; reuse them here. */
const SMS_HREF = `sms:${PHONE_TEL}`;
const TEL_HREF = `tel:${PHONE_TEL}`;

function ccScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ── service-area gate (address buffer shown before any text/call) ─ */
const METRO_ZIP3 = new Set(["850", "851", "852", "853", "855"]);
const METRO_CITIES = ["phoenix", "mesa", "tempe", "chandler", "gilbert", "scottsdale", "glendale", "peoria", "surprise", "goodyear", "avondale", "queen creek", "buckeye", "fountain hills", "paradise valley", "apache junction", "maricopa", "sun city", "cave creek", "litchfield", "el mirage", "tolleson", "ahwatukee"];
function ccFindZip(s) { const m = (s || "").match(/\b(\d{5})\b/); return m ? m[1] : null; }
function ccInArea(s) {
  const zip = ccFindZip(s);
  if (zip) return METRO_ZIP3.has(zip.slice(0, 3));
  const t = (s || "").toLowerCase();
  return METRO_CITIES.some((c) => t.includes(c));
}
/* context lets any CTA open the flow without threading props through every section */
const GateCtx = React.createContext(() => {});
function useGate() { return React.useContext(GateCtx); }

/* One-question-at-a-time "Get Started" flow: address -> name -> number, then we
   place the voice-AI onboarding call. The lead is stored on submit (and the backend
   can trigger the Vapi call). Out-of-area visitors route to the waitlist. */
function GetStartedFlow({ mode, onClose }) {
  const [step, setStep] = useState("address");   // address | name | phone | calling | out
  const [d, setD] = useState({ name: "", phone: "", address: "" });
  const [err, setErr] = useState({});
  const set = (k, v) => { setD((p) => ({ ...p, [k]: v })); setErr((e) => ({ ...e, [k]: false })); };
  const phoneOk = d.phone.replace(/\D/g, "").length >= 10;
  const firstName = (d.name || "").trim().split(/\s+/)[0];

  const send = (checkpoint) => {
    if (typeof window.submitLeadCheckpoint === "function") {
      const parts = (d.name || "").trim().split(/\s+/);
      window.submitLeadCheckpoint(checkpoint, {
        name: d.name, first: parts[0] || "", last: parts.slice(1).join(" "),
        phone: d.phone, address: d.address, consent: true,
      });
    }
  };

  const nextFromAddress = () => { if (!d.address.trim()) { setErr({ address: true }); return; } setStep("name"); };
  const nextFromName = () => { if (!d.name.trim()) { setErr({ name: true }); return; } setStep("phone"); };
  const submitPhone = () => {
    if (!phoneOk) { setErr({ phone: true }); return; }
    const inArea = ccInArea(d.address);
    /* concierge_started carries phone + consent so the backend can place the Vapi call */
    send(inArea ? "concierge_started" : "concierge_out_of_area");
    setStep(inArea ? "calling" : "out");
  };

  const STEP_ICON = { address: "ph-map-pin", name: "ph-user", phone: "ph-phone", calling: "ph-phone-call", out: "ph-hourglass-medium" };
  const BACK_TO = { name: "address", phone: "name" };
  const backTo = BACK_TO[step];
  const progress = step === "address" ? 1 : step === "name" ? 2 : step === "phone" ? 3 : 0;
  const Steps = () => (
    <div className="cc-gate-steps">
      {[1, 2, 3].map((n) => <span key={n} className={`cc-gate-dot${progress >= n ? " on" : ""}`} />)}
    </div>
  );

  return (
    <div className="cc-flow" role="dialog" aria-modal="true">
      <div className="cc-flow-bar">
        {backTo
          ? <button className="cc-flow-back" onClick={() => setStep(backTo)}><Ico name="ph-arrow-left" weight="bold" /> Back</button>
          : <div className="cc-logo"><span className="cc-logo-mark"><Ico name="ph-house-line" weight="fill" /></span><span className="cc-logo-txt">Casa Concierge</span></div>}
        <button className="cc-flow-x" onClick={onClose} aria-label="Close"><Ico name="ph-x" weight="bold" /></button>
      </div>
      <div className="cc-flow-scroll">
        <div className="cc-flow-inner">
          <div className="cc-flow-ico"><Ico name={STEP_ICON[step]} weight="duotone" /></div>

        {step === "address" && (
          <React.Fragment>
            <Steps />
            <div className="cc-gate-h">Let's start with your address.</div>
            <p className="cc-gate-sub">So we can confirm we're in your area and your concierge knows your home.</p>
            <input className={`input cc-gate-input${err.address ? " bad" : ""}`} type="text" autoFocus placeholder="Street, city or ZIP" value={d.address} onChange={(e) => set("address", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") nextFromAddress(); }} />
            <button className="btn btn-gold cta cc-gate-go" onClick={nextFromAddress}>Continue <Ico name="ph-arrow-right" weight="bold" /></button>
          </React.Fragment>
        )}

        {step === "name" && (
          <React.Fragment>
            <Steps />
            <div className="cc-gate-h">And what's your full name?</div>
            <p className="cc-gate-sub">So your concierge knows who they're helping.</p>
            <input className={`input cc-gate-input${err.name ? " bad" : ""}`} type="text" autoFocus placeholder="Jordan Rivera" value={d.name} onChange={(e) => set("name", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") nextFromName(); }} />
            <button className="btn btn-gold cta cc-gate-go" onClick={nextFromName}>Continue <Ico name="ph-arrow-right" weight="bold" /></button>
          </React.Fragment>
        )}

        {step === "phone" && (
          <React.Fragment>
            <Steps />
            <div className="cc-gate-h">What number should your concierge call?</div>
            <p className="cc-gate-sub">We'll call you in the next minute or two to get your home set up, then you can text us anytime.</p>
            <input className={`input cc-gate-input${err.phone ? " bad" : ""}`} type="tel" inputMode="tel" autoFocus placeholder="(480) 555-0199" value={d.phone} onChange={(e) => set("phone", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submitPhone(); }} />
            <button className="btn btn-gold cta cc-gate-go" onClick={submitPhone}>Call me now <Ico name="ph-phone" weight="bold" /></button>
            <p className="cc-gate-fine">
              By tapping Call me now you agree to receive an automated call and texts from Casa Concierge about your request, and to our{" "}
              <a href={TERMS_PAGE}>Terms</a> and <a href={PRIVACY_PAGE}>Privacy Policy</a>. Consent isn't a condition of purchase. Msg &amp; data rates may apply · reply STOP to opt out.
            </p>
          </React.Fragment>
        )}

        {step === "calling" && (
          <React.Fragment>
            <div className="cc-gate-h">Calling you now{firstName ? `, ${firstName}` : ""} 📞</div>
            <p className="cc-gate-sub">Your concierge is dialing {d.phone}. Pick up and we'll get your home set up in a few minutes. We'll text you there too.</p>
            <a className="btn btn-ghost cta cc-gate-go" href={TEL_HREF}>Don't want to wait? Tap to call now <Ico name="ph-phone" weight="bold" /></a>
            <button className="cc-gate-alt" onClick={onClose}>Close</button>
          </React.Fragment>
        )}

        {step === "out" && (
          <React.Fragment>
            <div className="cc-gate-h">We're not in your area yet</div>
            <p className="cc-gate-sub">Casa Concierge is live across Greater Phoenix and expanding fast. You're on our radar{firstName ? `, ${firstName}` : ""}. Join the waitlist and you'll be first to know the day we reach you.</p>
            <a className="btn btn-gold cta cc-gate-go" href="join-the-waitlist.html">Join the waitlist <Ico name="ph-arrow-right" weight="bold" /></a>
          </React.Fragment>
        )}
        </div>
      </div>
    </div>
  );
}

/* ── rotating hero word ─────────────────────────────────────────── */
const ROTATE = ["cleaner", "plumber", "roofer", "electrician", "handyman", "HVAC tech", "landscaper", "pest pro", "painter", "pool tech"];

function RotatingWord() {
  const motion = useMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!motion) return;
    const id = setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2100);
    return () => clearInterval(id);
  }, [motion]);
  /* widest word reserves the inline space so the line never reflows */
  const widest = ROTATE.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className="cc-rot" aria-live="polite">
      <span className="cc-rot-ghost" aria-hidden="true">{widest}</span>
      <span key={i} className={`cc-rot-word${motion ? " anim" : ""}`}>{ROTATE[i]}</span>
    </span>
  );
}

/* ── header ─────────────────────────────────────────────────────── */
function Header({ scrolled }) {
  const [open, setOpen] = useState(false);
  const openGate = useGate();
  const nav = [
    { label: "How it works", to: "how" },
    { label: "What it does", to: "does" },
    { label: "Services", to: "services" },
    { label: "Reviews", to: "reviews" },
    { label: "FAQ", to: "faq" },
  ];
  const go = (id) => { setOpen(false); ccScrollTo(id); };
  return (
    <header className={`cc-header${scrolled ? " solid" : ""}`}>
      <div className="cc-header-in">
        <a className="cc-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="cc-logo-mark"><Ico name="ph-house-line" weight="fill" /></span>
          <span className="cc-logo-txt">Casa Concierge</span>
        </a>
        <nav className="cc-nav">
          {nav.map((n) => <button key={n.to} className="cc-nav-link" onClick={() => go(n.to)}>{n.label}</button>)}
        </nav>
        <div className="cc-header-actions">
          <button className="btn btn-gold cta cc-header-cta" onClick={() => openGate("call")}>Call Your Concierge <Ico name="ph-phone" weight="bold" /></button>
          <button className="cc-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <Ico name={open ? "ph-x" : "ph-list"} weight="bold" />
          </button>
        </div>
      </div>
      {open && (
        <div className="cc-mobile-menu">
          {nav.map((n) => <button key={n.to} className="cc-mobile-link" onClick={() => go(n.to)}>{n.label}</button>)}
          <button className="btn btn-gold cta" onClick={() => { setOpen(false); openGate("start"); }}>Get Started Free <Ico name="ph-arrow-right" weight="bold" /></button>
        </div>
      )}
    </header>
  );
}

/* ── hero ───────────────────────────────────────────────────────── */
function Hero() {
  const motion = useMotion();
  const openGate = useGate();
  return (
    <header className="cc-hero cc-hero-photo">
      <div className="cc-hero-photo-img" aria-hidden="true" />
      <div className="cc-hero-scrim" aria-hidden="true" />
      <div className={`cc-hero-in${motion ? " anim" : ""}`}>
        <div className="eyebrow on-dark">Your home concierge · Greater Phoenix</div>
        <h1 className="display cc-hero-h">One call, and your whole home is handled.</h1>
        <p className="cc-hero-sub">Free for Phoenix homeowners. We get to know your house, line up vetted local pros, and push every project to done.</p>
        <div className="cc-hero-cta">
          <button className="btn btn-gold cta" onClick={() => openGate("call")}>Call Your Concierge <Ico name="ph-phone" weight="bold" /></button>
        </div>
        <p className="cc-hero-consent">
          Free to use · Serving Greater Phoenix · <a href={TERMS_PAGE}>Terms</a> · <a href={PRIVACY_PAGE}>Privacy</a>
        </p>
      </div>
    </header>
  );
}

/* ── problem ────────────────────────────────────────────────────── */
function Problem() {
  const pains = [
    { icon: "ph-list-checks", h: "It all falls on you", b: "Every filter, warranty, and seasonal task lives in your head. Forget one and a small fix quietly turns into a big repair." },
    { icon: "ph-coins", h: "The wrong pro is costly", b: "Hire the wrong contractor and you pay twice: once for the rushed job, again to undo it. Real vetting takes hours most people skip." },
    { icon: "ph-warning-octagon", h: "Quality is a gamble", b: "Five-star reviews, then a no-show, a cut corner, or a surprise upcharge. You don't find out until the work is already done." },
    { icon: "ph-clock-countdown", h: "You're the project manager", b: "Quotes, scheduling, follow-ups, and parts that never arrive, all landing on you on top of everything else." },
  ];
  return (
    <section className="section cc-problem">
      <div className="cc-head">
        <div className="eyebrow">Going it alone</div>
        <h2 className="display sec-h2">Owning a home is a part-time job <span className="cc-mute">you never applied for.</span></h2>
      </div>
      <div className="cc-pain-grid">
        {pains.map((p) => (
          <div key={p.h} className="cc-pain">
            <div className="cc-pain-ico"><Ico name={p.icon} weight="duotone" /></div>
            <div className="cc-pain-h">{p.h}</div>
            <p className="cc-pain-b">{p.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── what the concierge does (the 5 capabilities) ───────────────── */
function Capabilities() {
  const openGate = useGate();
  const caps = [
    { icon: "ph-bell-ringing", h: "Reminds you what the house needs", b: "Seasonal nudges and maintenance reminders to change the filter, flush the heater, and prep for monsoon, so small things never become expensive ones." },
    { icon: "ph-seal-check", h: "Connects you to vetted local professionals", b: "One text and we match you with a screened, licensed local provider for the exact job. No bidding wars, no selling your number." },
    { icon: "ph-tag", h: "Seasonal offers from our exclusive network", b: "Deals our exclusive network gets first. Off-season rates and offers we keep off the public market, sent only to our homeowners." },
    { icon: "ph-link-simple", h: "Sends product links that solve problems", b: "Sometimes you don't need a pro. We send the exact part, tool, or quick how-to so you can knock it out yourself in minutes." },
    { icon: "ph-flag-checkered", h: "Pushes home projects across the finish line", b: "We follow up, coordinate the schedule, and keep every project moving until it's actually done, not stuck on your to-do list." },
  ];
  return (
    <section className="section band-tint cc-caps" id="does">
      <div className="cc-head">
        <div className="eyebrow">Your concierge, on call</div>
        <h2 className="display sec-h2">One concierge.<br /><span className="cc-mute">Five ways it can help.</span></h2>
        <p className="cc-sub">Think of it as a friend in the trades who actually knows your house, a text or call away whenever you need.</p>
      </div>
      <div className="cc-caps-grid">
        {caps.map((c, i) => (
          <div key={c.h} className={`cc-cap${i === 0 ? " cc-cap-wide" : ""}`}>
            <div className="cc-cap-ico"><Ico name={c.icon} weight="duotone" /></div>
            <div className="cc-cap-body">
              <div className="cc-cap-h">{c.h}</div>
              <p className="cc-cap-b">{c.b}</p>
            </div>
          </div>
        ))}
        <a className="cc-cap cc-cap-cta" href={SMS_HREF} onClick={(e) => { e.preventDefault(); openGate("text"); }}>
          <div className="cc-cap-ico gold"><Ico name="ph-chat-circle-dots" weight="fill" /></div>
          <div className="cc-cap-body">
            <div className="cc-cap-h">Get started, it's free</div>
            <p className="cc-cap-b">Set up your home in a minute. Then your concierge is one text away.</p>
            <span className="cc-cap-go">Get started <Ico name="ph-arrow-right" weight="bold" /></span>
          </div>
        </a>
      </div>
    </section>
  );
}

/* ── how it works ───────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { icon: "ph-house-line", h: "We learn your home", b: "A quick onboarding covers your home's age, systems, and what's coming up, so every answer fits your house, not a script." },
    { icon: "ph-chats-circle", h: "Text or call, anytime", b: "A quick question, an emergency, or a full remodel. Your concierge answers instantly, the way you want, in one ongoing thread." },
    { icon: "ph-seal-check", h: "We line up the right pro", b: "Matched to a vetted, licensed local provider for the exact job, with scheduling and confirmations handled for you." },
    { icon: "ph-flag-checkered", h: "We push it to done", b: "Follow-ups and reminders until the work is finished and you're happy, then we watch for what your home needs next." },
  ];
  return (
    <section className="section cc-how" id="how">
      <div className="cc-head">
        <div className="eyebrow">How it works</div>
        <h2 className="display sec-h2">Less a service. <span className="cc-mute">More a relationship.</span></h2>
        <p className="cc-sub">Most home help vanishes the moment a job ends. Your concierge stays, learns your home, and stays a text or call away.</p>
      </div>
      <div className="cc-steps">
        {steps.map((s, i) => (
          <div key={s.h} className="cc-step">
            <div className="cc-step-n">{String(i + 1).padStart(2, "0")}</div>
            <div className="cc-step-ico"><Ico name={s.icon} weight="duotone" /></div>
            <div className="cc-step-h">{s.h}</div>
            <p className="cc-step-b">{s.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── chat demo (dark band) ──────────────────────────────────────── */
function ChatDemo() {
  const openGate = useGate();
  const thread = [
    { from: "them", t: "My water heater is leaking all over the garage 😩" },
    { from: "us", t: "On it. I've got James, a licensed, insured plumber near you, open 2–4pm today. Want me to book him?" },
    { from: "them", t: "Yes please!" },
    { from: "us", t: "Booked ✅ While you wait, shut the valve behind the tank. 20-sec video: casa.cc/shutoff 🔧" },
    { from: "us", t: "Heads up, your AC filter is also due this week. Want a reminder before summer?" },
    { from: "them", t: "You're a lifesaver 🙌" },
  ];
  return (
    <section className="section pine cc-demo">
      <div className="cc-head cc-head-center">
        <div className="eyebrow on-dark">See it in action</div>
        <h2 className="display sec-h2">It really is this easy.</h2>
        <p className="cc-sub on-dark">A real conversation with your Home Concierge.</p>
      </div>
      <div className="cc-phone">
        <div className="cc-phone-top">
          <span className="cc-phone-avatar"><Ico name="ph-house-line" weight="fill" /></span>
          <div className="cc-phone-name">Casa Concierge <Ico name="ph-caret-right" weight="bold" className="cc-phone-caret" /></div>
        </div>
        <div className="cc-phone-body">
          {thread.map((m, i) => (
            <div key={i} className={`cc-bubble ${m.from === "us" ? "us" : "them"}`}>{m.t}</div>
          ))}
        </div>
        <div className="cc-phone-input">
          <span className="cc-phone-field">iMessage</span>
          <span className="cc-send"><Ico name="ph-arrow-up" weight="bold" /></span>
        </div>
      </div>
      <div className="cc-demo-cta">
        <button className="btn btn-gold cta" onClick={() => openGate("start")}>Get started free <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></button>
      </div>
    </section>
  );
}

/* ── services grid ──────────────────────────────────────────────── */
function Services() {
  const svc = [
    { icon: "ph-house-line", n: "Roofing" }, { icon: "ph-wind", n: "AC & HVAC" },
    { icon: "ph-wrench", n: "Plumbing" }, { icon: "ph-lightning", n: "Electrical" },
    { icon: "ph-sun", n: "Solar" }, { icon: "ph-broom", n: "Cleaning" },
    { icon: "ph-plant", n: "Landscaping" }, { icon: "ph-bug-beetle", n: "Pest Control" },
    { icon: "ph-paint-roller", n: "Painting" }, { icon: "ph-hammer", n: "Handyman" },
    { icon: "ph-swimming-pool", n: "Pool" }, { icon: "ph-grid-nine", n: "Windows" },
    { icon: "ph-cooking-pot", n: "Remodels" }, { icon: "ph-key", n: "Locksmith" },
    { icon: "ph-squares-four", n: "Flooring" }, { icon: "ph-door", n: "Garage Doors" },
  ];
  return (
    <section className="section cc-services" id="services">
      <div className="cc-head">
        <div className="eyebrow">Whatever the house needs</div>
        <h2 className="display sec-h2">From a quick fix to a full remodel.</h2>
        <p className="cc-sub">One contact for everything, and if it's a job we don't cover, we'll point you the right way.</p>
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

/* ── benefits ───────────────────────────────────────────────────── */
function Benefits() {
  const b = [
    { icon: "ph-house-line", h: "Knows your home", t: "We onboard your home once, so every recommendation fits your house instead of a generic checklist." },
    { icon: "ph-bell-ringing", h: "Stays ahead of problems", t: "Proactive reminders for filters, roofs, warranties, and monsoon prep, so small things never become emergencies." },
    { icon: "ph-lightning", h: "Always on, instant answers", t: "Your concierge replies in seconds by text or call, any hour, day or night. No app, no phone tree, no waiting on a callback." },
    { icon: "ph-seal-check", h: "Vetted local pros only", t: "Every provider is licensed, insured, and proven. We carry the vetting so you're never gambling." },
    { icon: "ph-flag-checkered", h: "We see it through", t: "No hand-off and vanish. We coordinate and follow up until the project is actually finished." },
    { icon: "ph-shield-check", h: "Free, and yours stays yours", t: "The concierge costs nothing, and we never sell or spam your number. You only pay the pro for work you approve." },
  ];
  return (
    <section className="section band-tint cc-benefits">
      <div className="cc-head">
        <div className="eyebrow">The difference</div>
        <h2 className="display sec-h2">Everything your home needs, <span className="cc-mute">under one concierge.</span></h2>
      </div>
      <div className="cc-ben-grid">
        {b.map((x) => (
          <div key={x.h} className="cc-ben">
            <div className="cc-ben-ico"><Ico name={x.icon} weight="duotone" /></div>
            <div className="cc-ben-h">{x.h}</div>
            <p className="cc-ben-t">{x.t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── testimonials ───────────────────────────────────────────────── */
function Testimonials() {
  const t = [
    { quote: "I texted at 9pm about a leak and woke up to an appointment already booked. I didn't make a single call. This is how it should work.", name: "Jennifer M.", city: "Gilbert, AZ" },
    { quote: "They sent me a $14 part and a video instead of selling me a service call. Saved me a few hundred bucks. That's when I trusted them.", name: "David & Lisa P.", city: "Mesa, AZ" },
    { quote: "I used to dread coordinating contractors. Now I just text one person and it gets handled. Genuinely the easiest part of owning a home.", name: "Michael T.", city: "Chandler, AZ" },
    { quote: "They reminded me to swap my AC filter before summer and booked the tune-up for me. Feels like having a friend who actually keeps track of my house.", name: "Priya & Sam R.", city: "Scottsdale, AZ" },
  ];
  /* duplicated track so the marquee loops seamlessly */
  const loop = [...t, ...t];
  return (
    <section className="section cc-reviews" id="reviews">
      <div className="cc-head cc-head-center">
        <div className="eyebrow">Homeowners love it</div>
        <h2 className="display sec-h2">One text away from done.</h2>
      </div>
      <div className="cc-rev-marquee">
        <div className="cc-rev-track">
          {loop.map((x, i) => (
            <figure key={i} className="cc-rev" aria-hidden={i >= t.length ? "true" : undefined}>
              <Stars n={5} />
              <blockquote>{x.quote}</blockquote>
              <figcaption><span className="cc-rev-name">{x.name}</span><span className="cc-rev-city">{x.city}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── final CTA band ─────────────────────────────────────────────── */
function CTABand() {
  const openGate = useGate();
  return (
    <section className="section band-pine cc-cta">
      <div className="cc-cta-in">
        <h2 className="display sec-h2">Your home deserves better <span className="cc-gold">than a search bar.</span></h2>
        <p className="cc-cta-sub">Next time something breaks, needs fixing, or needs doing, just text. We'll take it from there.</p>
        <button className="btn btn-gold cta cc-cta-btn" onClick={() => openGate("call")}>Call Your Concierge <Ico name="ph-phone" weight="bold" className="cta-arrow" /></button>
        <div className="cc-cta-fine"><Ico name="ph-phone" weight="bold" /> {PHONE} · Available to help 24/7 · Free to use</div>
      </div>
    </section>
  );
}

/* ── faq ────────────────────────────────────────────────────────── */
function FAQ() {
  const items = [
    { q: "How much does the concierge cost?", a: "The concierge is completely free for homeowners. There's no subscription and no fee for being matched. You only ever pay the provider directly for work you approve." },
    { q: "How do I reach my concierge?", a: `Just send a text to ${PHONE}. No app to download, no account to create. It works like texting any contact in your phone.` },
    { q: "Are you the contractor?", a: "No. We're a concierge and referral service that connects you with licensed, vetted local providers. We coordinate the work; the independent pro performs it." },
    { q: "How are providers vetted?", a: "Every pro in our network is checked for licensing, insurance, and a real track record, and we keep watching reviews and feedback from each job to maintain quality." },
    { q: "Will my number get sold or spammed?", a: "Never. We don't auction your information. You hear from your concierge, and only from the specific pros you ask us to connect you with." },
    { q: "What if I just need a part, not a pro?", a: "Tell us what's going on. If it's a quick DIY fix, we'll send the exact product link and a how-to instead of booking a service call, whatever actually solves it fastest." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="section cc-faq" id="faq">
      <div className="cc-head cc-head-center">
        <div className="eyebrow">Questions</div>
        <h2 className="display sec-h2">Good questions, straight answers.</h2>
      </div>
      <div className="cc-faq-list">
        {items.map((f, i) => (
          <div key={i} className={`cc-faq-item${open === i ? " open" : ""}`}>
            <button className="cc-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{f.q}</span><Ico name={open === i ? "ph-minus" : "ph-plus"} weight="bold" />
            </button>
            {open === i && <p className="cc-faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── footer ─────────────────────────────────────────────────────── */
function Footer() {
  const openGate = useGate();
  return (
    <footer className="cc-footer">
      <div className="cc-footer-in">
        <div className="cc-footer-brand">
          <div className="cc-logo">
            <span className="cc-logo-mark"><Ico name="ph-house-line" weight="fill" /></span>
            <span className="cc-logo-txt" style={{ color: "#fff" }}>Casa Concierge</span>
          </div>
          <p className="cc-footer-tag">Your personal Home Concierge. One trusted text for the whole house.</p>
          <button className="btn btn-gold cta cc-footer-cta" onClick={() => openGate("start")}>Get Started Free <Ico name="ph-arrow-right" weight="bold" /></button>
        </div>
        <div className="cc-footer-cols">
          <div className="cc-footer-col">
            <div className="cc-footer-h">Concierge</div>
            <a href="#how" onClick={(e) => { e.preventDefault(); ccScrollTo("how"); }}>How it works</a>
            <a href="#does" onClick={(e) => { e.preventDefault(); ccScrollTo("does"); }}>What it does</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); ccScrollTo("services"); }}>Services</a>
            <a href="#reviews" onClick={(e) => { e.preventDefault(); ccScrollTo("reviews"); }}>Reviews</a>
          </div>
          <div className="cc-footer-col">
            <div className="cc-footer-h">Company</div>
            <a href="home2.html">Home</a>
            <a href="For Pros.html">For pros</a>
            <a href={`mailto:${EMAIL}`}>Contact</a>
          </div>
          <div className="cc-footer-col">
            <div className="cc-footer-h">Legal</div>
            <a href={PRIVACY_PAGE}>Privacy Policy</a>
            <a href={TERMS_PAGE}>Terms</a>
            <a href={`${TERMS_PAGE}#sms-messaging`}>TCPA & consent</a>
          </div>
        </div>
      </div>
      <div className="cc-footer-fine">
        <span>{ADDRESS} · {PHONE} · {EMAIL}</span>
        <span>We are a referral service, not a licensed contractor. We never sell or spam your information. © 2026 Casa Concierge.</span>
      </div>
      <div className="cc-footer-disclaimer">
        <span className="cc-footer-legal-note"><Ico name="ph-scales" weight="bold" /> Important legal disclosure</span>
        <p>{LEGAL_DBA}. Casa Concierge is a lead-referral and concierge service that connects homeowners with independent local service providers. We are not a licensed contractor and do not perform home-improvement work ourselves. We are not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Google, or any other platform. All trademarks are the property of their respective owners. We do not sell your personal information. Savings, offers, and results vary and are not guaranteed. Message and data rates may apply; reply STOP to opt out. © 2026 Casa Concierge. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ── floating concierge dock (launcher + widget + mobile bar) ───── */
function ConciergeDock({ showBar }) {
  const openGate = useGate();
  return (
    <React.Fragment>
      {/* desktop floating launcher → opens the address gate */}
      <div className="cc-dock">
        <button className="cc-launcher" onClick={() => openGate("call")} aria-label="Call your concierge">
          <Ico name="ph-phone" weight="fill" />
          <span className="cc-launcher-txt">Call Now</span>
        </button>
      </div>

      {/* mobile sticky bar: appears after the hero scrolls away */}
      <div className={`cc-mobile-bar${showBar ? " show" : ""}`}>
        <button className="btn btn-gold cta" onClick={() => openGate("call")}>Call Your Concierge <Ico name="ph-phone" weight="bold" /></button>
      </div>
    </React.Fragment>
  );
}

/* ── page ───────────────────────────────────────────────────────── */
function ConciergePage() {
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [gate, setGate] = useState(null);   // null | 'text' | 'call'
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      /* reveal the sticky CTA bar once the hero (with its own buttons) is mostly gone */
      setShowBar(y > window.innerHeight * 0.7);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <MotionCtx.Provider value={true}>
      <GateCtx.Provider value={(mode) => setGate(mode || "text")}>
        <div className="cc-page">
          <Header scrolled={scrolled} />
          <Hero />
          <Problem />
          <Capabilities />
          <HowItWorks />
          <ChatDemo />
          <Services />
          <Benefits />
          <Testimonials />
          <CTABand />
          <FAQ />
          <Footer />
          <ConciergeDock showBar={showBar} />
          {gate && <GetStartedFlow mode={gate} onClose={() => setGate(null)} />}
        </div>
      </GateCtx.Provider>
    </MotionCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ConciergePage />);
