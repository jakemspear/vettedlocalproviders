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
          <a className="btn btn-gold cta cc-header-cta" href={SMS_HREF}>Chat Now <Ico name="ph-chat-circle-dots" weight="bold" /></a>
          <button className="cc-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <Ico name={open ? "ph-x" : "ph-list"} weight="bold" />
          </button>
        </div>
      </div>
      {open && (
        <div className="cc-mobile-menu">
          {nav.map((n) => <button key={n.to} className="cc-mobile-link" onClick={() => go(n.to)}>{n.label}</button>)}
          <a className="btn btn-gold cta" href={SMS_HREF}>Chat Now <Ico name="ph-chat-circle-dots" weight="bold" /></a>
        </div>
      )}
    </header>
  );
}

/* ── hero ───────────────────────────────────────────────────────── */
function Hero() {
  const motion = useMotion();
  const micro = [
    { icon: "ph-device-mobile", t: "No app required" },
    { icon: "ph-hand-coins", t: "Free to use" },
    { icon: "ph-clock", t: "Reply within minutes" },
  ];
  return (
    <header className="cc-hero">
      <div className="cc-hero-bg" aria-hidden="true" />
      <div className={`cc-hero-in${motion ? " anim" : ""}`}>
        <div className="eyebrow on-dark">Your personal Home Concierge</div>
        <h1 className="display cc-hero-h">
          One call or text.<br />
          A vetted <RotatingWord /><br />
          at your door.
        </h1>
        <p className="cc-hero-sub">
          Stop searching. Stop waiting on callbacks. Text your concierge once and we line up the
          right vetted local pro, send the fix, and push every home project to done.
          <strong> You just send one message.</strong>
        </p>
        <div className="cc-hero-cta">
          <a className="btn btn-gold cta" href={SMS_HREF}>Text Your Concierge <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></a>
          <button className="btn btn-ghost-light" onClick={() => ccScrollTo("how")}>See how it works</button>
        </div>
        <div className="cc-hero-micro">
          {micro.map((m) => <span key={m.t} className="cc-micro"><Ico name={m.icon} weight="bold" /> {m.t}</span>)}
        </div>
      </div>
    </header>
  );
}

/* ── problem ────────────────────────────────────────────────────── */
function Problem() {
  const pains = [
    { icon: "ph-magnifying-glass", h: "Endless searching", b: "Hours lost reading reviews, comparing quotes, and hoping you picked the right one." },
    { icon: "ph-phone-x", h: "Phone tag & callbacks", b: "Leaving voicemails, waiting days, only to start the whole process over again." },
    { icon: "ph-calendar-x", h: "No-shows & surprises", b: "Unreliable pros who don't show up, run late, or pad the bill once they're there." },
    { icon: "ph-hourglass-high", h: "Coordinating everything", b: "Playing middleman between schedules, follow-ups, and the parts that never arrive." },
  ];
  return (
    <section className="section cc-problem">
      <div className="cc-head">
        <div className="eyebrow">The old way</div>
        <h2 className="display sec-h2">Finding reliable home help <span className="cc-mute">shouldn't be this hard.</span></h2>
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
  const caps = [
    { icon: "ph-bell-ringing", h: "Reminds you what the house needs", b: "Seasonal nudges and maintenance reminders to change the filter, flush the heater, and prep for monsoon, so small things never become expensive ones." },
    { icon: "ph-seal-check", h: "Connects you to vetted local pros", b: "One text and we match you with a screened, licensed local provider for the exact job. No bidding wars, no selling your number." },
    { icon: "ph-tag", h: "Seasonal offers from our network", b: "Deals our exclusive network gets first. Off-season rates and offers we keep off the public market, sent only to our homeowners." },
    { icon: "ph-link-simple", h: "Sends product links that solve it", b: "Sometimes you don't need a pro. We send the exact part, tool, or quick how-to so you can knock it out yourself in minutes." },
    { icon: "ph-flag-checkered", h: "Pushes projects to the finish", b: "We follow up, coordinate the schedule, and keep every project moving until it's actually done, not stuck on your to-do list." },
  ];
  return (
    <section className="section band-tint cc-caps" id="does">
      <div className="cc-head">
        <div className="eyebrow">Your concierge, on call</div>
        <h2 className="display sec-h2">One concierge. Five ways it shows up.</h2>
        <p className="cc-sub">Think of it as a friend in the trades who happens to know your house, reachable by a single text.</p>
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
        <a className="cc-cap cc-cap-cta" href={SMS_HREF}>
          <div className="cc-cap-ico gold"><Ico name="ph-chat-circle-dots" weight="fill" /></div>
          <div className="cc-cap-body">
            <div className="cc-cap-h">Try it. Text us anything</div>
            <p className="cc-cap-b">Describe what's going on with your home. We'll take it from there.</p>
            <span className="cc-cap-go">Start the chat <Ico name="ph-arrow-right" weight="bold" /></span>
          </div>
        </a>
      </div>
    </section>
  );
}

/* ── how it works ───────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { icon: "ph-chat-text", h: "Text your concierge", b: "Describe what your home needs in plain language. A leak, a tune-up, a remodel, you name it." },
    { icon: "ph-users-three", h: "We find the right pro", b: "We match you with a vetted, licensed local provider who does exactly that kind of work." },
    { icon: "ph-calendar-check", h: "We handle coordination", b: "Scheduling, confirmations, follow-ups, and reminders, so the back-and-forth isn't yours." },
    { icon: "ph-flag-checkered", h: "Job done, stress gone", b: "You stay in one thread. We keep it moving until the work is finished and you're happy." },
  ];
  return (
    <section className="section cc-how" id="how">
      <div className="cc-head">
        <div className="eyebrow">How it works</div>
        <h2 className="display sec-h2">Four steps. Zero hassle.</h2>
        <p className="cc-sub">From "I need help" to "it's handled," we coordinate everything in between.</p>
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
          <div>
            <div className="cc-phone-name">Home Concierge</div>
            <div className="cc-phone-status"><span className="cc-dot" /> Active now</div>
          </div>
        </div>
        <div className="cc-phone-body">
          {thread.map((m, i) => (
            <div key={i} className={`cc-bubble ${m.from === "us" ? "us" : "them"}`}>{m.t}</div>
          ))}
        </div>
        <div className="cc-phone-input">
          <span>Send a message…</span>
          <span className="cc-send"><Ico name="ph-arrow-up" weight="bold" /></span>
        </div>
      </div>
      <div className="cc-demo-cta">
        <a className="btn btn-gold cta" href={SMS_HREF}>Start your own chat <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></a>
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
    { icon: "ph-seal-check", h: "Vetted local pros", t: "Every provider is licensed, insured, reviewed, and known to stand behind their work." },
    { icon: "ph-lightning", h: "Fast response", t: "Text any time. We reply quickly and act faster, with no waiting on a callback that never comes." },
    { icon: "ph-user-focus", h: "One point of contact", t: "No apps, no accounts, no phone trees. Just one thread with someone who knows your home." },
    { icon: "ph-tag", h: "Exclusive deals", t: "Seasonal offers and off-season rates our network extends to homeowners first." },
    { icon: "ph-shield-check", h: "Your info stays yours", t: "We never auction your number. You hear from us, and only the pros you ask for." },
    { icon: "ph-hand-coins", h: "Free to use", t: "The concierge costs you nothing. You only ever pay the pro for the work you approve." },
  ];
  return (
    <section className="section band-tint cc-benefits">
      <div className="cc-head">
        <div className="eyebrow">Why homeowners switch</div>
        <h2 className="display sec-h2">Built for homeowners <span className="cc-mute">who value their time.</span></h2>
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
  ];
  return (
    <section className="section cc-reviews" id="reviews">
      <div className="cc-head cc-head-center">
        <div className="eyebrow">Homeowners love it</div>
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

/* ── final CTA band ─────────────────────────────────────────────── */
function CTABand() {
  return (
    <section className="section band-pine cc-cta">
      <div className="cc-cta-in">
        <h2 className="display sec-h2">Your home deserves better <span className="cc-gold">than a search bar.</span></h2>
        <p className="cc-cta-sub">Next time something breaks, needs fixing, or needs doing, just text. We'll take it from there.</p>
        <a className="btn btn-gold cta cc-cta-btn" href={SMS_HREF}>Text Your Concierge <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></a>
        <div className="cc-cta-fine"><Ico name="ph-phone" weight="bold" /> {PHONE} · Reply within minutes · Free to use</div>
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
  return (
    <footer className="cc-footer">
      <div className="cc-footer-in">
        <div className="cc-footer-brand">
          <div className="cc-logo">
            <span className="cc-logo-mark"><Ico name="ph-house-line" weight="fill" /></span>
            <span className="cc-logo-txt" style={{ color: "#fff" }}>Casa Concierge</span>
          </div>
          <p className="cc-footer-tag">Your personal Home Concierge. One trusted text for the whole house.</p>
          <a className="btn btn-gold cta cc-footer-cta" href={SMS_HREF}>Chat Now <Ico name="ph-chat-circle-dots" weight="bold" /></a>
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
function ConciergeDock() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const ok = phone.replace(/\D/g, "").length >= 10;
  return (
    <React.Fragment>
      {/* desktop floating widget */}
      <div className="cc-dock">
        {open && (
          <div className="cc-widget" role="dialog" aria-label="Meet your Home Concierge">
            <div className="cc-widget-head">
              <span className="cc-phone-avatar"><Ico name="ph-house-line" weight="fill" /></span>
              <div>
                <div className="cc-widget-name">Meet your Concierge</div>
                <div className="cc-widget-status"><span className="cc-dot" /> Typically replies in minutes</div>
              </div>
              <button className="cc-widget-x" onClick={() => setOpen(false)} aria-label="Close"><Ico name="ph-x" weight="bold" /></button>
            </div>
            <div className="cc-widget-body">
              <p className="cc-widget-msg">👋 Hi! Tell us what your home needs and we'll text you right back. What's your mobile number?</p>
              <a className="btn btn-gold cta cc-widget-go" href={ok ? `${SMS_HREF}` : SMS_HREF}>
                Chat Now <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" />
              </a>
              <input
                className="input cc-widget-input"
                type="tel"
                inputMode="tel"
                placeholder="Your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <a className="cc-widget-alt" href={TEL_HREF}><Ico name="ph-phone" weight="bold" /> Or call {PHONE}</a>
            </div>
          </div>
        )}
        <button className="cc-launcher" onClick={() => setOpen(!open)} aria-label={open ? "Close concierge" : "Chat with your concierge"}>
          <Ico name={open ? "ph-x" : "ph-chat-circle-dots"} weight="fill" />
          {!open && <span className="cc-launcher-txt">Chat Now</span>}
        </button>
      </div>

      {/* mobile sticky bar */}
      <div className="cc-mobile-bar">
        <a className="btn btn-gold cta" href={SMS_HREF}>Chat Now <Ico name="ph-chat-circle-dots" weight="bold" /></a>
      </div>
    </React.Fragment>
  );
}

/* ── page ───────────────────────────────────────────────────────── */
function ConciergePage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <MotionCtx.Provider value={true}>
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
        <ConciergeDock />
      </div>
    </MotionCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ConciergePage />);
